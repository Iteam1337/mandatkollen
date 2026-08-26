FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY pnpm*-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@11.22.0 --activate
RUN pnpm audit
RUN pnpm i --frozen-lockfile

COPY src ./src
COPY server ./server
COPY index.html ./
COPY images ./images

ENV CI=true
RUN pnpm run build
RUN pnpm i  --prod --frozen-lockfile
ENV CI=false

ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

CMD pnpm start
