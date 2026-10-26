# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# Install OpenSSL for Prisma engine and wget for healthchecks
RUN apk add --no-cache openssl wget

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies (including devDependencies required for Prisma CLI)
RUN npm install

# Copy Prisma schema and migrations
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy source code and entrypoint
COPY src ./src/
COPY docker-entrypoint.sh ./

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Environment defaults
ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

# Container healthcheck
HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:5000/api/v1/health || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["node", "src/server.js"]
