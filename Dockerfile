# Multi-stage build for optimal image size

# Stage 1: Build the React app
FROM node:18-alpine AS client-build

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy client source
COPY client/ ./

# Build the React app
RUN npm run build

# Stage 2: Setup the Node.js server
FROM node:18-alpine AS server-build

WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy server source
COPY server/ ./

# Stage 3: Production image
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy server files from server-build stage
COPY --from=server-build --chown=nodejs:nodejs /app/server ./server

# Copy built React app from client-build stage
COPY --from=client-build --chown=nodejs:nodejs /app/client/build ./client/build

# Set working directory to server
WORKDIR /app/server

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]
