FROM mhart/alpine-node:8
RUN apk add --no-cache make gcc g++ python git
COPY package.json /app/
WORKDIR /app
ARG NPM_TOKEN
RUN yarn
COPY . /app/
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
RUN yarn build
CMD node server
