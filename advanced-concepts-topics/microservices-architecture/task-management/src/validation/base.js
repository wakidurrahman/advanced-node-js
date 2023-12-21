const dotenv = require('dotenv');
const Joi = require('joi');

const environmentVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB URL'),
    LOG_LEVEL: Joi.string()
      .valid('error', 'warn', 'info', 'debug')
      .default('info'),
  })
  .unknown();

function createBaseConfig(configPath) {
  dotenv.config({ path: configPath });
  // Validate base configuration variable with JOI Schema
  const { value: envVars, error } = environmentVariablesSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
    
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongo: {
      url: envVars.MONGODB_URL,
    },
    logLevel: envVars.LOG_LEVEL,
  };
}

module.exports = {
  createBaseConfig,
};
