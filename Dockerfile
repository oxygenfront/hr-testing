ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine as base

ENV YARN_VERSION=4.1.1

# enable yarn new version
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

WORKDIR /app

COPY . .

# need to create node_modules folder
RUN yarn config set nodeLinker node-modules

FROM base as deps

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3004

CMD yarn start:prod

