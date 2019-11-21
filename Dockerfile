FROM node:10

RUN npm install -g forever yarn

COPY . /deploy/app/
WORKDIR /deploy/app/

RUN yarn install && yarn build