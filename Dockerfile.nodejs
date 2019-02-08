FROM node:10-stretch

RUN apt-get update
RUN apt-get install -y make libstdc++
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install dependecies first (and keep them cached)
COPY app/package.json /usr/src/app/
RUN yarn install

# Bundle app source (doesn't require of installing the node_modules again)
COPY app/ /usr/src/app

EXPOSE 5000

CMD ["yarn", "start"]