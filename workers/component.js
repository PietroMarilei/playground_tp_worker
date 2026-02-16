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
  import_component,
  update_component_fulltext
} = require("@workers/processors/component");

const component_worker = new Worker(
  "component",
  async (job) => {
    let result = null;

    // Processors
    switch (job.name) {
      case "import_component":
        result = await import_component(job);
        break;

      case "update_component_fulltext":
        result = await update_component_fulltext(job);
        break;

      default:
        console.log(`[component] Unknown job name: ${job.name}`);
        break;
    }

    if (result !== null) {
      return result;
    } else {
      return;
    }
  },
  { connection: redis, concurrency: 1000 }
);
