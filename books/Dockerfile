FROM node

WORKDIR /app/books

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4545
CMD ["npm", "start"]
