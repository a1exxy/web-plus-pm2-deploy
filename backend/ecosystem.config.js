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
    // node_args : '-r dotenv/config',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      // user: 'user',
      // host: [],
      // SSH key path, default to $HOME/.ssh
      // key: "/path/to/some.pem",
      // ssh_options: "StrictHostKeyChecking=no",
      // ref: 'origin/master',
      // path: '/home/user/app',
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      // 'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/backend`,
      // 'pre-deploy-local': `scp ../.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      // 'pre-deploy': 'echo $PWD $HOSTNAME $DEPLOY_REPO > /tmp/test.txt',
      // 'pre-deploy': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-setup': 'cd backend && npm i && npm run build',
      // 'pre-deploy':
      // 'post-deploy': 'npm i && npm run build',
      'pre-deploy-local': `scp ../.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current`,
      'post-deploy': 'pm2 startOrRestart backend/ecosystem.config.js --env production'
    },
  },
};