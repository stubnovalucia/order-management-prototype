# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start frontend app
CMD ["npm", "run", "dev"]