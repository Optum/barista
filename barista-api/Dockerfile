ARG REPO=""
ARG TAG=latest

FROM ${REPO}barista-base:${TAG}
ARG BARISTA_VERSION=unspecified

# Create app directory
WORKDIR /usr/src/app
ENV HOME=/usr/src/app
RUN npm config ls -l && npm install -g  yarn yarnrc


COPY . .

RUN yarn config get registry && yarn install  && yarn build

RUN  chmod -R g+rw . && chmod -R g+rwx .config
EXPOSE 3000

RUN ln -fs /bin/bash /bin/sh

CMD [ "yarn", "start:container" ]
USER 1011
