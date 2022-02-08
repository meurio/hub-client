# FROM node:14-alpine AS builder

# ENV PORT 5000
# ARG NODE_ENV

# # USER node
# WORKDIR /usr/src/app
# COPY package*.json yarn.lock tsconfig*.json pnpm*.yaml ./
# RUN pnpm i
# COPY packages packages
# RUN pnpm m run build
# EXPOSE 5000 5001 5002 5003 5004
# CMD ["pnpm", "m", "run", "start"]

FROM node:14-alpine AS builder
ENV PORT 3003
ARG NODE_ENV

# USER node
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . /usr/src/app
RUN yarn build
EXPOSE 5000 5001 5002 5003 5004
CMD ["yarn", "start"]
