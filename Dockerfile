FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /er-showdown/

USER root

RUN apk add git

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node ./ ./

RUN mkdir ./data/

RUN npm run build

RUN rm -rf ./data/pokemon-showdown/
RUN find ./ -type f -name "*.map" -delete

FROM cgr.dev/chainguard/node:latest

ENV PORT=8080

WORKDIR /er-showdown/

COPY --from=builder /er-showdown/ ./

RUN rm -rf node_modules/

RUN npm install --omit=dev

EXPOSE $PORT

CMD ["start_prod.js"]
