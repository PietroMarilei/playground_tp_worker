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
  create_component,
  update_component,
  delete_component,

  create_tyre,
  update_tyre,
  delete_tyre,

  create_wheel,
  update_wheel,
  delete_wheel,
} = require("@workers/processors/ricambipro");

const ricambipro_worker = new Worker(
  "ricambipro",
  async (job) => {
    let result = null;

    // Processors
    switch (job.name) {
      case "create_component":
        result = await create_component(job);
        break;
      case "update_component":
        result = await update_component(job);
        break;
      case "delete_component":
        result = await delete_component(job);
        break;

      case "create_tyre":
        result = await create_tyre(job);
        break;
      case "update_tyre":
        result = await update_tyre(job);
        break;
      case "delete_tyre":
        result = await delete_tyre(job);
        break;

      case "create_wheel":
        result = await create_wheel(job);
        break;
      case "update_wheel":
        result = await update_wheel(job);
        break;
      case "delete_wheel":
        result = await delete_wheel(job);
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
  { connection: redis }
);
