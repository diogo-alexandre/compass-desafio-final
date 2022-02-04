FROM node:16.13.2
RUN mkdir /app/
WORKDIR /app/
COPY . /app/
COPY .env /app/
RUN npm install --production
RUN npm install typescript
RUN npm run build
CMD [ "npm", "run", "start" ]
