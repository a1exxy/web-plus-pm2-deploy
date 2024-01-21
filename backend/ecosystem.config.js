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
  apps: [{
    name: 'api-service',
    script: './backend/dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      host: DEPLOY_HOST,
      // SSH key path, default to $HOME/.ssh
      // key: "/path/to/some.pem",
      // ssh_options: "StrictHostKeyChecking=no",
      user: DEPLOY_USER,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: `${DEPLOY_PATH}`,
      // 'post-setup': 'cd backend && npm i && npm run build',
      'pre-deploy-local': `scp ../.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current`,
      // 'pre-deploy': '. .env && cd backend && echo "PWD=$PWD" && npm i && PORT=$BACKEND_LOCAL_PORT npm run build',
      'pre-deploy': 'backend/build.sh',
      'post-deploy': 'pm2 startOrRestart backend/ecosystem.config.js --env production'
    },
  },
};