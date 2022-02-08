FROM node:16-alpine

WORKDIR /usr/src/app

# We only copy the dependencies we need
COPY src/ src/
COPY public/ public/
COPY global.d.ts global.d.ts
COPY next.config.js next.config.js
COPY next-env.d.ts next-env.d.ts
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY tsconfig.json tsconfig.json
COPY netlify.toml netlify.toml
COPY .babelrc .babelrc

# The global package.json only contains build dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm run build