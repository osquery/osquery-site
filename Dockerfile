FROM node:18-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY . /app

ENV NODE_PATH src/

RUN yarn install
RUN yarn build

FROM nginx
COPY --from=builder /app/build/ /usr/share/nginx/html
