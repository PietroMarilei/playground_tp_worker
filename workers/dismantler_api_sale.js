require("dotenv").config();
require("module-alias/register");

// Sequelize
const sequelize = require("@databases/sequelize/sequelize.js");
const associations = require("@databases/sequelize/associations.js")();

// BullMQ
const { Worker } = require("bullmq");

// Redis
const redis = require("@databases/redis/redis.js");

// Processors
const {
  delete_component,

  delete_tyre,

  delete_wheel
} = require("@workers/processors/dismantler_api_sale");

const dismantler_api_sale_worker = new Worker(
  "dismantler_api_sale",
  async (job) => {
    let result = null;

    // Processors
    switch (job.name) {
      case "delete_component":
        result = await delete_component(job);
        break;

      case "delete_tyre":
        result = await delete_tyre(job);
        break;

      case "delete_wheel":
        result = await delete_wheel(job);
        break;

      default:
        console.log(`[dismantler_api] Unknown job name: ${job.name}`);
        break;
    }

    if (result !== null) {
      return result;
    } else {
      return;
    }
  },
  { connection: redis, concurrency: 1 }
);
