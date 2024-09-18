FROM cgr.dev/chainguard/node:latest-dev AS builder

RUN apk add git

COPY --chown=node:node package*.json ./

RUN npm install

COPY ./ ./

RUN mkdir ./data/

RUN npm run build

FROM cgr.dev/chainguard/node:latest

ENV PORT=8080

WORKDIR /er-showdown/

COPY --from=builder /er-showdown/ ./

EXPOSE $PORT

CMD ["start_prod.js"]
