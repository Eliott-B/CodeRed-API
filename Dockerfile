FROM node:14

WORKDIR /opt/codered/api

COPY package*.json .
RUN npm install

CMD ["npm", "start"]
