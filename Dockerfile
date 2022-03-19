FROM node:17.3-alpine AS apline_container

# Build server
FROM apline_container AS build_server

ARG CHANGELOG_PRESET="angular"

WORKDIR /usr/src/app
COPY --chown=node:node package*.json tsconfig*.json ./
COPY --chown=node:node ./src ./src

RUN echo "Building with preset: ${CHANGELOG_PRESET}"
RUN npm ci
RUN npm run build

# Build Final Image
FROM apline_container

WORKDIR /usr/src/app
COPY --chown=node:node package*.json tsconfig*.json ./
COPY --chown=node:node ./src ./src
COPY --from=build_server --chown=node:node /usr/src/app/dist ./dist

ENV NODE_ENV="production"
RUN npm ci --production && \
    npm cache clean --force

USER node
ENTRYPOINT ["node", "./dist/index.js"]
