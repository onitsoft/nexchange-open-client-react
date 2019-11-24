FROM node:10

RUN npm install -g yarn

COPY . /deploy/app/
WORKDIR /deploy/app/

RUN yarn install && yarn build
VOLUME [ "/deploy/app/build" ]