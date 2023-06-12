FROM node:14-alpine AS build

ARG user="node"
ARG appdir="/home/node/app"

RUN mkdir -p ${appdir} && chown -R ${user} ${appdir}
WORKDIR ${appdir}
USER ${user}

COPY --chown=${user} package.json package-lock.json ./
RUN npm install --only=production

COPY --chown=${user} . .

RUN npm run build

# Stage 2: Serve the built app using a lightweight HTTP server

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]