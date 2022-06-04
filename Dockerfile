FROM node:16 as base
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .

FROM base as production
ENV NODE_PATH=./dist
RUN npm run build

# FROM node:16
# WORKDIR /usr/src/app
# COPY package*.json ./
# # RUN npm install
# RUN npm ci --only=production
# EXPOSE 8020
# CMD [ "node", "dist/index.js" ]
