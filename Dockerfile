FROM node:22-alpine AS build
WORKDIR /app

ENV NPM_CONFIG_REGISTRY=https://mirrors.cloud.tencent.com/npm/
ENV NODE_OPTIONS=--max-old-space-size=512

COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
      sed -i 's#https://registry.npmjs.org#https://mirrors.cloud.tencent.com/npm#g' package-lock.json; \
    fi \
 && npm install --no-audit --no-fund --fetch-retries=5 --maxsockets=3

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=512
ENV PORT=3000

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./

EXPOSE 3000
CMD ["npm", "start"]