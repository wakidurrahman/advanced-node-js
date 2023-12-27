const { version, license } = require('../../package.json');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tasks API',
    version,
    description: 'Tasks API end point definitions',
    license: {
      name: license,
    },
    contact: {
      name: 'Task API',
    },
  },
};

module.exports = swaggerDefinition;
