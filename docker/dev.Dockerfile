FROM node:22

WORKDIR /app

COPY . .

RUN npm install -g nuxt
RUN npm install
RUN ls -la

EXPOSE 3000

CMD ["npm", "run", "dev"]
