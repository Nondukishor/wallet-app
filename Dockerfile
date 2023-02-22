FROM node:18-alpine

WORKDIR /home/app/

RUN apk add --no-cache --update python3 python3-dev git jq

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 4000


CMD ["npm","run", "dev"]
