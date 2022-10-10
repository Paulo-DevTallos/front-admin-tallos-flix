FROM node:lts

WORKDIR /usr/vue-light-bootstrap-dashboard-master/app

COPY . .

RUN yarn add -D sass

RUN yarn install

EXPOSE 3006