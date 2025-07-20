import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatible __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're in a serverless environment
const isServerless = process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL || process.env.NETLIFY;

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'portfolio-api' },
  transports: [
    // Only add file transports if not in serverless environment
    ...(isServerless ? [] : [
      // Write all logs with level 'error' and below to error.log
      new winston.transports.File({ 
        filename: path.join(__dirname, '../logs/error.log'), 
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      // Write all logs with level 'info' and below to combined.log
      new winston.transports.File({ 
        filename: path.join(__dirname, '../logs/combined.log'),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ]),
  ],
});

// Always add console transport for serverless environments
if (isServerless || process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger; 