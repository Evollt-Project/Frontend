FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx eslint . --cache --max-warnings=0

RUN npm run build

CMD ["node", ".output/server/index.mjs"]
