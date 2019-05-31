from node:latest

copy ./ /vulnerable/

workdir /vulnerable/

RUN npm install

cmd 