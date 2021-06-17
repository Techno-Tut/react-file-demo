FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --dev
COPY . .

RUN npm install typescript -g
RUN tsc

EXPOSE 8000

CMD [ "npm","start" ]