FROM node:20-alpine

# Set to a non-root built-in user `node`
USER node

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

# Create app directory
WORKDIR /app

# Copy dependency definitions
COPY ./package.json /app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY ./ /app

EXPOSE ${PORT}


CMD ["npm", "run", "start"]