#!/bin/bash
# This command file will set up pyenv and then run whatever CMD is passed from Dockerfile

export PATH="$HOME/.pyenv/bin:$PATH" \
    && eval "$(pyenv init -)"   \
    && eval "$(pyenv virtualenv-init -)"


# set up the pre-defined python versions
# In order to save build time, the python versions are built and stored in an attached shared volume for each instance.
# These are loaded at run time and linked as virtual environment for Python.

rm -fr .pyenv/versions/*
a=$PWD   #save the current directory
cd /opt/pythons
for i in $(ls); do ln -s /opt/pythons/$i /usr/src/app/.pyenv/versions/$i ; done
cd $a

echo "3.7.5" > .python-version
export PATH="$HOME/.pyenv/bin:$PATH" \
    && eval "$(pyenv init -)"   \
    && eval "$(pyenv virtualenv-init -)"

pyenv virtualenv -f 3.7.5 python3
pyenv virtualenv -f 2.7.17 python2
echo "The following python versions are available"

pyenv versions

bash  <<EOF
$@
EOF
