#!/usr/bin/env bash
DIRNAME='/usr/bin/dirname'
READLINK='/bin/readlink'
CURRENT_DIR=$($DIRNAME $($READLINK -e "$0"))

pushd $CURRENT_DIR

npm i
. ../.env
REACT_APP_API_URL=$BACKEND_DOMAIN npm run build
