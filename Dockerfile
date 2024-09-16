# Stage 1: Build the React application
FROM node:18-alpine

# Install Python and build dependencies (if needed for some native modules)
RUN apk add --update --no-cache python3 python3-dev py3-setuptools make g++ && ln -sf python3 /usr/bin/python

# Set the working directory in the container
WORKDIR /usr/src/app/ignfrontend
RUN mkdir -p public src

# Copy only the package files first and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the configuration files and source code
COPY tsconfig.json .env ./
COPY public ./public
COPY src ./src

# Expose the port the app runs on
EXPOSE 3000

# Start the React development server
CMD ["yarn", "start"]
