FROM node:21-slim

WORKDIR /usr/src/app

COPY . .

EXPOSE 8080
CMD ["npm", "start"]