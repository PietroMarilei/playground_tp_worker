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
    export_orders,
    export_order_items,
    export_reservation_items,
    export_components,
    export_vehicles,
    export_clients,
    export_warehouses,
    export_deposits,
    export_accesses,
    export_accesses_logs,
} = require("@workers/processors/export");


const exportworker = new Worker(
    "export",
    async (job) => {
        let result = null;

        // Processors
        switch (job.name) {
            case "export_orders":
                result = await export_orders(job);
                break;
            case "export_order_items":
                result = await export_order_items(job);
                break;
            case 'export_reservation_items':
                result = await export_reservation_items(job);
                break;
            case 'export_components':
                result = await export_components(job);
                break;
            case 'export_vehicles':
                result = await export_vehicles(job);
                break;
            case 'export_clients':
                result = await export_clients(job);
                break;
            case 'export_warehouses':
                result = await export_warehouses(job);
                break;
            case 'export_deposits':
                result = await export_deposits(job);
                break;
            case 'export_accesses':
                result = await export_accesses(job);
                break;
            case 'export_accesses_logs':
                result = await export_accesses_logs(job);
                break;

            default:
                console.log(`[export] Unknown job name: ${job.name}`);
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