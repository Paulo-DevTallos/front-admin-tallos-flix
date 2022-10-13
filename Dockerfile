FROM node:16-alpine

WORKDIR /usr/vue-light-bootstrap-dashboard-master/app

COPY . .

RUN yarn install

EXPOSE 3006