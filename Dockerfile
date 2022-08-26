# Use official node alpine image
FROM node:16-alpine

# Defile main app directory
WORKDIR /usr/src/app

# Copy package.json and lock into the current directory
COPY package*.json .
COPY prisma ./prisma

# Install dependecies
RUN npm install

# Copy local files into image
COPY . .

# Build project
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run service
CMD [ "npm", "start" ]