FROM node:16 as base
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
COPY slash-up.config.js ./
COPY src/ ./src
RUN npm i

FROM base as production
ENV NODE_PATH=./dist
ENV NODE_ENV=production
RUN npm run build
RUN npm prune --production
