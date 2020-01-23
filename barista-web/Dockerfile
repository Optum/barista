ARG REPO=""
ARG TAG=compose

FROM ${REPO}barista-base:${TAG}

ARG BARISTA_VERSION=unspecified
# This argument is passed and used by yarn to set up the environment...
# It is the setting which tells the browser where to contact the API server.
ARG BARISTA_API_BASE_PATH=/api/v1

RUN apt-get -y install nginx
RUN cd /usr/src/app
COPY . .
ENV BARISTA_API_BASE_PATH=$BARISTA_API_BASE_PATH
RUN echo  BARISTA_API_BASE_PATH=$BARISTA_API_BASE_PATH
RUN   yarn install   && yarn run build:prod

RUN chmod g+rw . *

RUN   cp -r dist/barista-web/* /usr/share/nginx/html/ \
  &&  cp docker/nginx-conf/nginx.conf /etc/nginx/ \
  &&  rm -f /etc/nginx/conf.d/* \
  &&  rm -f /etc/nginx/sites-enabled/default \
  &&  chgrp -R root /usr/share/nginx/html/* /var/log/nginx \
  &&  chmod -R g+rw /usr/share/nginx/html /var/log/nginx /var/lib/nginx /run

RUN ln -fs /bin/bash /bin/sh

USER 1011

STOPSIGNAL SIGTERM
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
