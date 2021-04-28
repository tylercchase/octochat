FROM node:14-alpine

WORKDIR /usr/src/app/chat-ui

ADD package*.json ./

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]