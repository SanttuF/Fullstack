FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL_HTTP=http://localhost:8080/api/
ENV REACT_APP_BACKEND_URL_WS=ws://localhost:8080/subscriptions/

RUN npm ci

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html



