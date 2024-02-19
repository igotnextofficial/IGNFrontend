# Stage 1: Build the React application
FROM node:18-alpine

# Install Python and build dependencies
RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
# Set the working directory in the container
WORKDIR /usr/src/app/ignfrontend

# Copy package.json and package-lock.json (or yarn.lock) files

COPY package.json tsconfig.json .env /usr/src/app/ignfrontend/
COPY public /usr/src/app/ignfrontend/public
COPY src /usr/src/app/ignfrontend/src

# Install project dependencies
RUN npm install

EXPOSE 3000

# Start Nginx and serve the application
CMD ["npm","run","start"]
