FROM node:18-alpine
RUN npm i -g pnpm
WORKDIR /app

ADD package.json .
ADD pnpm-lock.yaml .
ADD src src
ADD index.js .

RUN pnpm install
CMD [ "pnpm", "start" ]
