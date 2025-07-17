# Use Node.js 20 LTS for development
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose the development port
EXPOSE 8080

# Set environment variables for development
ENV NODE_ENV=development
ENV PORT=8080

# Start the development server
CMD ["npm", "run", "dev"] 