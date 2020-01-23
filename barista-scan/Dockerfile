ARG BASETAG=compose
ARG REPO=""

FROM ${REPO}barista-scanbase:${BASETAG}
ADD tools/docker-entrypoint.ksh /docker-entrypoint.ksh
ARG BARISTA_VERSION=unspecified

USER root

RUN  touch /usr/src/app/.python-version

COPY . .


RUN  yarn install && yarn build

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
    && chmod g+rw       . \
                        ./* \
    && chmod -R g+rwx   .pyenv \
                        /usr/src/app/.python-version \
                        /usr/src/app/.cache

RUN ln -fs /bin/bash /bin/sh

USER 1011
