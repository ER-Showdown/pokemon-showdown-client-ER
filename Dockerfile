FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /er-showdown/

USER root

COPY package*.json ./

RUN apk add --no-cache git \
    && npm install

COPY ./ ./

RUN mkdir ./data/ \
    && npm run build \
    && rm -rf ./data/pokemon-showdown/ \
    && rm -rf node_modules/ \
    && find ./ -type f -name "*.map" -delete \
    && apk del git \
    && apk cache clean

FROM cgr.dev/chainguard/node:latest

ENV PORT=8080

WORKDIR /er-showdown/

COPY --from=builder --chown=node:node /er-showdown/ ./

RUN npm install --omit=dev \
    && npm cache clean --force

EXPOSE $PORT

CMD ["start_prod.js"]
