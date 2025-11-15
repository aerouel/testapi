# 1️⃣ Install dependencies & build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Build Next.js app
RUN npm run build


# 2️⃣ Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Enable Next.js standalone mode
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# App will run on port 3000 by default
EXPOSE 3000

# Start Next.js server
CMD ["node", "server.js"]
