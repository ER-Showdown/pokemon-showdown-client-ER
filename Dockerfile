FROM node:alpine

RUN apk add git

ENV PORT=8080

WORKDIR /er-showdown/

COPY package.json ./

RUN npm install

COPY ./ ./

RUN mkdir ./data/

RUN npm run build

EXPOSE $PORT

CMD ["node", "start_prod.js"]
