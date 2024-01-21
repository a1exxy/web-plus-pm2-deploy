//   клонирование репозитория на удалённый сервер,
//   установку зависимостей,
//   сборку(для фронтенда ),
//   перезапуск.

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.deploy') });
const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO,  DEPLOY_REF = 'origin/master',
} = process.env;
console.log(DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO,  DEPLOY_REF)


module.exports = {
//Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ../.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current`,
      // 'pre-deploy': '. .env && cd frontend && echo "PWD=$PWD" && npm i && REACT_APP_API_URL=$BACKEND_DOMAIN npm run build',
      'pre-deploy': 'frontend/build.sh',
      'post-deploy': 'echo "Deploy is ended."'
    },
  },
};