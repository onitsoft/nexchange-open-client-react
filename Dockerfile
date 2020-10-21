FROM node:10

WORKDIR /deploy/app/
COPY . .

RUN yarn install 
RUN yarn test:ci -u --ci --all
RUN yarn build
VOLUME [ "/deploy/app/build" ]
