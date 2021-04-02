FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ADD . .

EXPOSE 3000

CMD ["npm", "start"]