import winston from 'winston';

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
      // For serverless, we'll only use console transport
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