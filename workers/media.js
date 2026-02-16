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
const { media_from_url, media_resize } = require("@workers/processors/media");

const media_worker = new Worker(
  "media",
  async (job) => {
    let result = null;

    // Processors
    switch (job.name) {
      case "media_from_url":
        result = await media_from_url(job);
        break;
      case "media_resize":
        result = await media_resize(job);
        break;

      default:
        console.log(`[media] Unknown job name: ${job.name}`);
        break;
    }

    if (result !== null) {
      return result;
    } else {
      return;
    }
  },
  { connection: redis, concurrency: 2 }
);
