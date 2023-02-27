FROM node:18-alpine

WORKDIR /home/app/

COPY package*.json ./

# RUN npm install -g npm@latest


RUN npm i --silent

COPY . .

ENV NODE_ENV=development

EXPOSE 4000

RUN npm run dynamo:createtable

CMD ["npm","run", "dev"]
