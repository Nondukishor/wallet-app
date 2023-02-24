FROM node:18-alpine

WORKDIR /home/app/

COPY package*.json ./

# RUN npm install -g npm@latest

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 4000

RUN npm run createtable

CMD ["npm","run", "dev"]
