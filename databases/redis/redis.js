// Redis
const IORedis = require("ioredis");

// Configuration
let config = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,

  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,

  maxRetriesPerRequest: null,
};

if (
  process.env.REDIS_HOST !== "localhost" &&
  process.env.REDIS_HOST !== "127.0.0.1"
) {
  config = {
    ...config,
    tls: {},
  };
}

// Initialize connection
const redis = new IORedis(config);

module.exports = redis;
