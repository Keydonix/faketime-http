# FROM node:12.16.2-alpine3.11
FROM node@sha256:5646d1e5bc470500414feb3540186c02845db0e0e1788621c271fbf3a0c1830d as builder
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install
COPY ./tsconfig.json /app/tsconfig.json
COPY ./index.ts /app/index.ts
RUN npx tsc

FROM node@sha256:5646d1e5bc470500414feb3540186c02845db0e0e1788621c271fbf3a0c1830d
WORKDIR /app
COPY --from=builder /app/index.js /app/index.js
ENV FAKETIME_TIMESTAMP_FILE=/faketime/faketime
VOLUME /faketime
ENTRYPOINT [ "node", "index.js" ]
