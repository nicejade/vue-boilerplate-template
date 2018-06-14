FROM node

MAINTAINER nicejade

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD npm start