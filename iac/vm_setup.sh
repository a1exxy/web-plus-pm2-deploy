#!/usr/bin/env bash
# Запуск плейбука первичной настройки виртуальной машины
DIRNAME='/usr/bin/dirname'
READLINK='/bin/readlink'

CURRENT_DIR=$($DIRNAME $($READLINK -e "$0"))

pushd $CURRENT_DIR 2>&1 > /dev/null
pushd ..
set -a
. ./.env
. ./.env.deploy

if [ $# -eq 1 ]; then
  ansible-playbook  -i "iac/inventory.yaml" --tags $1 iac/playbook.yaml
else
  ansible-playbook  -i "iac/inventory.yaml" iac/playbook.yaml
fi

