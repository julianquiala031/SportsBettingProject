# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json (if present) from the backend folder
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install --prefix ./backend

# Copy the rest of the backend application files
COPY backend /app/backend

# Build the TypeScript code inside the backend folder
# Use locally installed TypeScript instead of globally installed

RUN npm install typescript
RUN npx tsc --project ./tsconfig.json


# Expose the port your app will run on
EXPOSE 3000



