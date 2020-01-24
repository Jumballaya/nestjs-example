FROM node:10-stretch

RUN useradd -ms /bin/bash nest_app
WORKDIR /home/nest_app

ENV PATH /home/nest_app/node_modules/.bin:$PATH

COPY package.json package.json
RUN npm install --silent

COPY . .

CMD ["npm", "start"]