require("dotenv").config();
require("module-alias/register");

// Express
const express = require("express");

// Redis
const redis = require("@databases/redis/redis.js");

// BullMQ
const { Queue } = require("bullmq");

// BullBoard
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

// BullBoard Server Adapter (Express)
const serverAdapter = new ExpressAdapter();
const readOnlyMode = process.env.NODE_ENV === "development" ? false : true;

// Queues
// Internal
const component = new Queue("component", { connection: redis });
const oem = new Queue("oem", { connection: redis });

const vehicle = new Queue("vehicle", { connection: redis });

const media = new Queue("media", { connection: redis });

const dismantler_api_sale = new Queue("dismantler_api_sale", {
  connection: redis
});

// External
const multibreves = new Queue("multibreves", { connection: redis });
const ricambipro = new Queue("ricambipro", { connection: redis });

// System
const system = new Queue("system", { connection: redis });
// END Queues

// BullBoard
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullMQAdapter(component, {
      readOnlyMode: readOnlyMode
    }),
    new BullMQAdapter(oem, {
      readOnlyMode: readOnlyMode
    }),

    new BullMQAdapter(vehicle, {
      readOnlyMode: readOnlyMode
    }),

    new BullMQAdapter(media, {
      readOnlyMode: readOnlyMode
    }),

    new BullMQAdapter(dismantler_api_sale, {
      readOnlyMode: readOnlyMode
    }),

    new BullMQAdapter(multibreves, {
      readOnlyMode: readOnlyMode
    }),
    new BullMQAdapter(ricambipro, {
      readOnlyMode: readOnlyMode
    }),

    new BullMQAdapter(system, {
      readOnlyMode: readOnlyMode
    })
  ],
  serverAdapter: serverAdapter
});

const app = express();

// BullBoard UI
app.use("/", serverAdapter.getRouter());

// other configurations of your server

app.listen(process.env.PORT || 3000, async () => {
  console.log(`BullBoard UI is available on port: ${process.env.PORT}`);
  console.log(`Storage driver: ${process.env.STORAGE_DRIVER}`);
  console.log('DB_DATABASE:', process.env.DB_DATABASE)
  console.log(`DB: ${process.env.DB_HOST}`);
  console.log(`DB port: ${process.env.DB_PORT}`);
  console.log(`Redis: ${process.env.REDIS_HOST}`);
  console.log(`Redis port: ${process.env.REDIS_PORT}`);
});
