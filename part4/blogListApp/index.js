// index.js only contains the server creation and initialization of the app
const http = require('http');
const app = require('./app.js');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
