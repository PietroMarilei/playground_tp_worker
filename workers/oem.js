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
  update_oem_code_compatible_versions,
  populate_oem_code_compatible_versions,
} = require("@workers/processors/oem");

const oem_worker = new Worker(
  "oem",
  async (job) => {
    let result = null;

    // Processors
    switch (job.name) {
      case "populate_oem_code_compatible_versions":
        result = await populate_oem_code_compatible_versions(job);
        break;
      case "update_oem_code_compatible_versions":
        result = await update_oem_code_compatible_versions(job);
        break;

      default:
        console.log(`[oem] Unknown job name: ${job.name}`);
        break;
    }

    if (result !== null) {
      return result;
    } else {
      return;
    }
  },
  { connection: redis, concurrency: 5 }
);
