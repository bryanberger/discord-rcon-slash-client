FROM node:16 as base
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src
RUN npm i

FROM base as production
ENV NODE_PATH=./dist
RUN npm run build
