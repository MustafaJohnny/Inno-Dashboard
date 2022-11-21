FROM node:13.12.0-alpine

# set working directory
WORKDIR /dashboard

ENV PATH /dashboard/node_modules/.bin:$PATH


COPY package.json ./


#RUN #npm install --silent --only=production

COPY package-lock.json ./
RUN npm install --silent
RUN #npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]