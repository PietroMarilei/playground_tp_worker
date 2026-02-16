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
const { import_vehicle } = require("@workers/processors/vehicle");

const vehicle_worker = new Worker(
  "vehicle",
  async (job) => {
    let result = null;

    // Processors
    switch (job.name) {
      case "import_vehicle":
        result = await import_vehicle(job);
        break;

      default:
        console.log(`[vehicle] Unknown job name: ${job.name}`);
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
