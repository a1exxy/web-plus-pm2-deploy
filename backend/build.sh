#!/usr/bin/env bash
DIRNAME='/usr/bin/dirname'
READLINK='/bin/readlink'
CURRENT_DIR=$($DIRNAME $($READLINK -e "$0"))

pushd $CURRENT_DIR

set -a
. ../.env
npm i
PORT=$BACKEND_LOCAL_PORT npm run build
