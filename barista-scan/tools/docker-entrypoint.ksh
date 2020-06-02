#!/bin/bash
# This command file will set up pyenv and then run whatever CMD is passed from Dockerfile

export PATH="$HOME/.pyenv/bin:$PATH" \
    && eval "$(pyenv init -)"   \
    && eval "$(pyenv virtualenv-init -)"


# set up the pre-defined python versions
# In order to save build time, the python versions are built and stored in an attached shared volume for each instance.
# These are loaded at run time and linked as virtual environment for Python.

#rm -fr .pyenv/versions/*
for i in .pyenv/versions/* ; do test -L $i && rm -f $i && echo removed link $i; done

a=$PWD   #save the current directory
cd /opt/pythons
# Find available versions and link them to the default location.
for i in $(ls); do ln -s /opt/pythons/$i /usr/src/app/.pyenv/versions/$i ; done
cd $a

echo "3.7.5" > .python-version
export PATH="$HOME/.pyenv/bin:$PATH" \
    && eval "$(pyenv init -)"   \
    && eval "$(pyenv virtualenv-init -)"

# if still no pythons, download a default v2 and a default v3
test -x /usr/src/app/.pyenv/versions/2.7.17/bin/python2.7 || pyenv install 2.7.17
test -x /usr/src/app/.pyenv/versions/3.7.5/bin/python3.7 || pyenv install 3.7.5


pyenv virtualenv -f 3.7.5 python3
pyenv virtualenv -f 2.7.17 python2
echo "The following python versions are available"

pyenv versions

bash  <<EOF
$@
EOF
