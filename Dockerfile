FROM node:18-alpine

WORKDIR /home/app/

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install -g typescript

ENV NODE_ENV=production

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm","run", "start"]
