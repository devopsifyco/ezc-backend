FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

EXPOSE 8080
CMD npm start