FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 8080
CMD ["npm", "start"]