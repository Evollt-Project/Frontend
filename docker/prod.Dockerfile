FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . /app

CMD ["npm", "run", "build"]
