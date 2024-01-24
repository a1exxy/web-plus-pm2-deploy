#!/usr/bin/env bash
DIRNAME='/usr/bin/dirname'
READLINK='/bin/readlink'
CURRENT_DIR=$($DIRNAME $($READLINK -e "$0"))

pushd $CURRENT_DIR
echo $PWD
which npm
npm i
. ../.env
export PORT=$BACKEND_LOCAL_PORT
export BACKEND_DOMAIN
npm run build
