FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

EXPOSE 8080
CMD npm start