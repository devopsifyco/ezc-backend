FROM node:21-alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 8080
CMD ["npm", "start"]