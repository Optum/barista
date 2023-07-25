ARG BASETAG=compose
ARG REPO=""
ARG DOCKER=""

FROM ${DOCKER}golang:1.17 as go

FROM ${REPO}barista-scanbase:${BASETAG}
ADD tools/docker-entrypoint.ksh /docker-entrypoint.ksh
ARG BARISTA_VERSION=unspecified

USER root

RUN  touch /usr/src/app/.python-version

COPY . .


RUN  yarn install && yarn build
RUN yarn global add @angular/cli@9.1.15
RUN yarn config set "strict-ssl" false;

RUN mkdir -p -v -m 770  /usr/src/app/tools/scancode-toolkit/lib \
    /.cache/scancode-tk  \
    /.m2/repo1 /usr/src/app/.m2 \
    /usr/src/app/.cache \
    && chgrp root       /usr/src/app/tools/scancode-toolkit/lib \
    /.m2/repo1 /usr/src/app/.m2 \
    && chmod  g+w       /usr/src/app/tools \
    /usr/src/app/tools/* \
    /usr/src/app/tools/scancode-toolkit/*   \
    /.m2/repo1 /usr/src/app/.m2\
    && chmod g+rw       .   ./* .*  .npm/* \
    && chmod -R g+rwx   .pyenv \
    /usr/src/app/.python-version \
    /usr/src/app/.cache \
    && chown -R 1011 .npm 

RUN mkdir /usr/src/app/tools/scancode-toolkit/src/licensedcode/data/cache \
    && chmod -R g+rw /usr/src/app/tools/scancode-toolkit/src/licensedcode/data/cache

RUN ln -fs /bin/bash /bin/sh

COPY --from=go /usr/local/go /usr/local/go
ENV PATH="/usr/local/go/bin:$PATH"
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN go version

RUN GO111MODULE=on GOBIN=/usr/local/bin/ go get github.com/google/go-licenses
RUN chmod -R g+rwx /usr/src/app/go/

USER 1011
