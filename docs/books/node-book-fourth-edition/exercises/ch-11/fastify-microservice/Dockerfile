FROM node:20

# Set to a non-root built-in user `node`
USER node

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

WORKDIR "/app"

RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get clean \
    && echo 'Finished installing dependencies'
COPY package*.json ./

RUN npm install --production

COPY . /app

EXPOSE ${PORT}


CMD ["npm", "run", "start"]