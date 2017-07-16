FROM mhart/alpine-node
RUN apk add --no-cache make gcc g++ python git
COPY package.json /app/
WORKDIR /app
ARG NPM_TOKEN
RUN npm install
COPY . /app/
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
RUN npm install -g serve
CMD serve -s build
