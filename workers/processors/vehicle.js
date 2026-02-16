// MomentJS
const moment = require("moment");
moment.locale("it");

// Sequelize
const { Op, Sequelize, EmptyResultError, where } = require("sequelize");

// #region BullMQ
// Redis
const redis = require("@databases/redis/redis.js");
// BullMQ
const { Queue } = require("bullmq");
// Queues
const media_queue = new Queue("media", { connection: redis });
// #endregion BullMQ

// #region Models
// Access
const AccessLog = require("@databases/sequelize/models/access/access_log");

// Vehicle
const Vehicle = require("@databases/sequelize/models/vehicle/vehicle");
const VehicleAcceptance = require("@databases/sequelize/models/vehicle/vehicle_acceptance");
const VehicleDrainage = require("@databases/sequelize/models/vehicle/vehicle_drainage");
const VehicleBody = require("@databases/sequelize/models/vehicle/vehicle_body");
const VehicleEngine = require("@databases/sequelize/models/vehicle/vehicle_engine");
const VehicleTransmission = require("@databases/sequelize/models/vehicle/vehicle_transmission");
const VehicleMedia = require("@databases/sequelize/models/vehicle/vehicle_media");
const VehicleScannerCode = require("@databases/sequelize/models/vehicle/vehicle_scanner_code");

const VehicleHeadlight = require("@databases/sequelize/models/vehicle/vehicle_headlight");
const VehicleTaillight = require("@databases/sequelize/models/vehicle/vehicle_taillight");
const VehicleRearViewMirror = require("@databases/sequelize/models/vehicle/vehicle_rear_view_mirror");
const VehicleEntertainment = require("@databases/sequelize/models/vehicle/vehicle_entertainment");
const VehicleDashboard = require("@databases/sequelize/models/vehicle/vehicle_dashboard");
// #endregion Models

module.exports = {
  import_vehicle: async function (job) {
    console.log('creating vehicle:', job.data.vehicle?.code)
    const vehicle = job.data.vehicle;
    const dismantler_id = job.data.dismantler_id;
    const access_id = job.data.access_id;

    // Jobs
    const jobs = {
      media_queue: [],
    };

    // Save to database
    const createdVehicle = await Vehicle.create({
      code: vehicle.code,

      plate:
        vehicle.plate !== undefined &&
          vehicle.plate !== null &&
          vehicle.plate !== "" &&
          vehicle.plate !== "null"
          ? vehicle.plate
          : null,
      vin:
        vehicle.vin !== undefined &&
          vehicle.vin !== null &&
          vehicle.vin !== "" &&
          vehicle.vin !== "null"
          ? vehicle.vin
          : null,

      produced_from:
        vehicle.produced_from !== undefined &&
          vehicle.produced_from !== null &&
          vehicle.produced_from !== "" &&
          vehicle.produced_from !== "null"
          ? vehicle.produced_from
          : null,
      produced_to:
        vehicle.produced_to !== undefined &&
          vehicle.produced_to !== null &&
          vehicle.produced_to !== "" &&
          vehicle.produced_to !== "null"
          ? vehicle.produced_to
          : null,
      registered_at:
        vehicle.registered_at !== undefined &&
          vehicle.registered_at !== null &&
          vehicle.registered_at !== "" &&
          vehicle.registered_at !== "null"
          ? vehicle.registered_at
          : null,

      km:
        vehicle.km !== undefined &&
          vehicle.km !== null &&
          vehicle.km !== 0 &&
          vehicle.km !== "null"
          ? vehicle.km
          : null,

      keys:
        vehicle.keys !== undefined &&
          vehicle.keys !== null &&
          vehicle.keys !== "" &&
          vehicle.keys !== "null"
          ? vehicle.keys
          : null,

      counter_price:
        vehicle.counter_price !== undefined &&
          vehicle.counter_price !== null &&
          vehicle.counter_price !== "" &&
          vehicle.counter_price !== "null"
          ? vehicle.counter_price
          : null,

      status:
        vehicle.status !== undefined &&
          vehicle.status !== null &&
          vehicle.status !== "" &&
          vehicle.status !== "null"
          ? vehicle.status
          : "available",

      notes:
        vehicle.notes !== undefined &&
          vehicle.notes !== null &&
          vehicle.notes !== "" &&
          vehicle.notes !== "null"
          ? vehicle.notes
          : null,

      dismantler_id: dismantler_id,
      version_id: vehicle.version_id,

      deposit_floor_id:
        vehicle.deposit_floor_id !== undefined &&
          vehicle.deposit_floor_id !== null &&
          vehicle.deposit_floor_id !== "" &&
          vehicle.deposit_floor_id !== "null"
          ? vehicle.deposit_floor_id
          : null,
    });

    // Created at
    if (vehicle.created_at !== undefined) {
      if (
        vehicle.created_at !== null &&
        vehicle.created_at !== "" &&
        vehicle.created_at !== "null"
      ) {
        createdVehicle.changed("created_at", true);
        createdVehicle.set(
          "created_at",
          moment(vehicle.created_at).format("YYYY-MM-DD HH:mm:ss"),
          { raw: true }
        );
        await createdVehicle.save({
          fields: ["created_at"],
        });
      }
    }

    // Vehicle Acceptance
    if (vehicle.vehicle_acceptance !== undefined) {
      const createdVehicleAcceptance = await VehicleAcceptance.create({
        accepted_at:
          vehicle.vehicle_acceptance.accepted_at !== undefined &&
            vehicle.vehicle_acceptance.accepted_at !== null &&
            vehicle.vehicle_acceptance.accepted_at !== "" &&
            vehicle.vehicle_acceptance.accepted_at !== "null"
            ? vehicle.vehicle_acceptance.accepted_at
            : null,

        purchase_price:
          vehicle.vehicle_acceptance.purchase_price !== undefined &&
            vehicle.vehicle_acceptance.purchase_price !== null &&
            vehicle.vehicle_acceptance.purchase_price !== "" &&
            vehicle.vehicle_acceptance.purchase_price !== "null"
            ? vehicle.vehicle_acceptance.purchase_price
            : null,
        purchased_from:
          vehicle.vehicle_acceptance.purchased_from !== undefined &&
            vehicle.vehicle_acceptance.purchased_from !== null &&
            vehicle.vehicle_acceptance.purchased_from !== "" &&
            vehicle.vehicle_acceptance.purchased_from !== "null"
            ? vehicle.vehicle_acceptance.purchased_from
            : null,

        notes:
          vehicle.vehicle_acceptance.notes !== undefined &&
            vehicle.vehicle_acceptance.notes !== null &&
            vehicle.vehicle_acceptance.notes !== "" &&
            vehicle.vehicle_acceptance.notes !== "null"
            ? vehicle.vehicle_acceptance.notes
            : null,

        vehicle_id: createdVehicle.vehicle_id,
      });
    }

    // Vehicle Drainage
    if (vehicle.vehicle_drainage !== undefined) {
      const createdVehicleDrainage = await VehicleDrainage.create({
        drained_at:
          vehicle.vehicle_drainage.drained_at !== undefined &&
            vehicle.vehicle_drainage.drained_at !== null &&
            vehicle.vehicle_drainage.drained_at !== "" &&
            vehicle.vehicle_drainage.drained_at !== "null"
            ? vehicle.vehicle_drainage.drained_at
            : null,
        notes:
          vehicle.vehicle_drainage.notes !== undefined &&
            vehicle.vehicle_drainage.notes !== null &&
            vehicle.vehicle_drainage.notes !== "" &&
            vehicle.vehicle_drainage.notes !== "null"
            ? vehicle.vehicle_drainage.notes
            : null,

        vehicle_id: createdVehicle.vehicle_id,
      });
    }

    // Vehicle Body
    if (vehicle.vehicle_body !== undefined) {
      const createdVehicleBody = await VehicleBody.create({
        color:
          vehicle.vehicle_body.color !== undefined &&
            vehicle.vehicle_body.color !== null &&
            vehicle.vehicle_body.color !== "" &&
            vehicle.vehicle_body.color !== "null"
            ? vehicle.vehicle_body.color
            : null,

        color_code:
          vehicle.vehicle_body.color_code !== undefined &&
            vehicle.vehicle_body.color_code !== null &&
            vehicle.vehicle_body.color_code !== "" &&
            vehicle.vehicle_body.color_code !== "null"
            ? vehicle.vehicle_body.color_code
            : null,

        finish:
          vehicle.vehicle_body.finish !== undefined &&
            vehicle.vehicle_body.finish !== null &&
            vehicle.vehicle_body.finish !== "" &&
            vehicle.vehicle_body.finish !== "null"
            ? vehicle.vehicle_body.finish
            : null,

        notes:
          vehicle.vehicle_body.notes !== undefined &&
            vehicle.vehicle_body.notes !== null &&
            vehicle.vehicle_body.notes !== "" &&
            vehicle.vehicle_body.notes !== "null"
            ? vehicle.vehicle_body.notes
            : null,

        vehicle_id: createdVehicle.vehicle_id,
      });
    }

    // Vehicle Engine
    if (vehicle.vehicle_engine !== undefined) {
      const createdVehicleEngine = await VehicleEngine.create({
        is_available: vehicle.vehicle_engine.is_available,

        code:
          vehicle.vehicle_engine.code !== undefined &&
            vehicle.vehicle_engine.code !== null &&
            vehicle.vehicle_engine.code !== "" &&
            vehicle.vehicle_engine.code !== "null"
            ? vehicle.vehicle_engine.code
            : null,

        propulsion:
          vehicle.vehicle_engine.propulsion !== undefined &&
            vehicle.vehicle_engine.propulsion !== null &&
            vehicle.vehicle_engine.propulsion !== "" &&
            vehicle.vehicle_engine.propulsion !== "null"
            ? vehicle.vehicle_engine.propulsion
            : null,

        kw:
          vehicle.vehicle_engine.kw !== undefined &&
            vehicle.vehicle_engine.kw !== null &&
            vehicle.vehicle_engine.kw !== 0 &&
            vehicle.vehicle_engine.kw !== "null"
            ? vehicle.vehicle_engine.kw
            : null,
        hp:
          vehicle.vehicle_engine.hp !== undefined &&
            vehicle.vehicle_engine.hp !== null &&
            vehicle.vehicle_engine.hp !== 0 &&
            vehicle.vehicle_engine.hp !== "null"
            ? vehicle.vehicle_engine.hp
            : null,

        displacement:
          vehicle.vehicle_engine.displacement !== undefined &&
            vehicle.vehicle_engine.displacement !== null &&
            vehicle.vehicle_engine.displacement !== 0 &&
            vehicle.vehicle_engine.displacement !== "null"
            ? vehicle.vehicle_engine.displacement
            : null,
        cylinders:
          vehicle.vehicle_engine.cylinders !== undefined &&
            vehicle.vehicle_engine.cylinders !== null &&
            vehicle.vehicle_engine.cylinders !== 0 &&
            vehicle.vehicle_engine.cylinders !== "null"
            ? vehicle.vehicle_engine.cylinders
            : null,
        valves:
          vehicle.vehicle_engine.valves !== undefined &&
            vehicle.vehicle_engine.valves !== null &&
            vehicle.vehicle_engine.valves !== 0 &&
            vehicle.vehicle_engine.valves !== "null"
            ? vehicle.vehicle_engine.valves
            : null,

        is_tested: vehicle.vehicle_engine.is_tested,
        condition:
          vehicle.vehicle_engine.condition !== undefined &&
            vehicle.vehicle_engine.condition !== null &&
            vehicle.vehicle_engine.condition !== "" &&
            vehicle.vehicle_engine.condition !== "null"
            ? vehicle.vehicle_engine.condition
            : null,

        notes:
          vehicle.vehicle_engine.notes !== undefined &&
            vehicle.vehicle_engine.notes !== null &&
            vehicle.vehicle_engine.notes !== "" &&
            vehicle.vehicle_engine.notes !== "null"
            ? vehicle.vehicle_engine.notes
            : null,

        vehicle_id: createdVehicle.vehicle_id,
      });
    }

    // Vehicle Transmission
    if (vehicle.vehicle_transmission !== undefined) {
      const createdVehicleTransmission = await VehicleTransmission.create({
        is_available: vehicle.vehicle_transmission.is_available,

        code:
          vehicle.vehicle_transmission.code !== undefined &&
            vehicle.vehicle_transmission.code !== null &&
            vehicle.vehicle_transmission.code !== "" &&
            vehicle.vehicle_transmission.code !== "null"
            ? vehicle.vehicle_transmission.code
            : null,

        type:
          vehicle.vehicle_transmission.type !== undefined &&
            vehicle.vehicle_transmission.type !== null &&
            vehicle.vehicle_transmission.type !== "" &&
            vehicle.vehicle_transmission.type !== "null"
            ? vehicle.vehicle_transmission.type
            : null,
        gears:
          vehicle.vehicle_transmission.gears !== undefined &&
            vehicle.vehicle_transmission.gears !== null &&
            vehicle.vehicle_transmission.gears !== "" &&
            vehicle.vehicle_transmission.gears !== "null" &&
            vehicle.vehicle_transmission.gears !== 0
            ? vehicle.vehicle_transmission.gears
            : null,
        has_reverse:
          vehicle.vehicle_transmission.has_reverse !== undefined &&
            vehicle.vehicle_transmission.has_reverse !== null &&
            vehicle.vehicle_transmission.has_reverse !== "" &&
            vehicle.vehicle_transmission.has_reverse !== "null"
            ? vehicle.vehicle_transmission.has_reverse
            : null,
        drive:
          vehicle.vehicle_transmission.drive !== undefined &&
            vehicle.vehicle_transmission.drive !== null &&
            vehicle.vehicle_transmission.drive !== "" &&
            vehicle.vehicle_transmission.drive !== "null"
            ? vehicle.vehicle_transmission.drive
            : null,

        is_tested: vehicle.vehicle_transmission.is_tested,
        condition:
          vehicle.vehicle_transmission.condition !== undefined &&
            vehicle.vehicle_transmission.condition !== null &&
            vehicle.vehicle_transmission.condition !== "" &&
            vehicle.vehicle_transmission.condition !== "null"
            ? vehicle.vehicle_transmission.condition
            : null,

        notes:
          vehicle.vehicle_transmission.notes !== undefined &&
            vehicle.vehicle_transmission.notes !== null &&
            vehicle.vehicle_transmission.notes !== "" &&
            vehicle.vehicle_transmission.notes !== "null"
            ? vehicle.vehicle_transmission.notes
            : null,

        vehicle_id: createdVehicle.vehicle_id,
      });
    }

    // Scanner Codes
    if (
      vehicle.vehicle_scanner_codes !== undefined &&
      vehicle.vehicle_scanner_codes !== null &&
      vehicle.vehicle_scanner_codes.length > 0
    ) {
      for (let i = 0; i < vehicle.vehicle_scanner_codes.length; i++) {
        const vehicle_scanner_code = vehicle.vehicle_scanner_codes[i];

        if (
          vehicle_scanner_code.scanner_code !== null &&
          vehicle_scanner_code.scanner_code !== "null"
        ) {
          // Save
          await VehicleScannerCode.create({
            scanner_code: vehicle_scanner_code.scanner_code.toString().trim(),
            source:
              vehicle_scanner_code.source !== null
                ? vehicle_scanner_code.source.toString().trim()
                : "unknown",

            vehicle_id: createdVehicle.vehicle_id,
          });
        }
      }
    }

    // Vehicle Media
    if (
      vehicle.vehicle_media !== undefined &&
      vehicle.vehicle_media !== null &&
      vehicle.vehicle_media !== "" &&
      vehicle.vehicle_media !== "null" &&
      vehicle.vehicle_media.length > 0
    ) {
      for (let i = 0; i < vehicle.vehicle_media.length; i++) {
        const vehicle_media = vehicle.vehicle_media[i];

        if (vehicle_media.media_type === "image") {
          if (
            vehicle_media.media !== undefined &&
            vehicle_media.media !== null &&
            vehicle_media.media !== "" &&
            vehicle_media.media !== "null"
          ) {
            if (vehicle_media.media.source === "external") {
              if (
                vehicle_media.media.url !== undefined &&
                vehicle_media.media.url !== null &&
                vehicle_media.media.url !== "" &&
                vehicle_media.media.url !== "null"
              ) {
                jobs.media_queue.push({
                  name: "media_from_url",
                  data: {
                    media_type: vehicle_media.media_type,
                    url: vehicle_media.media.url,

                    entity: "vehicle",
                    entity_id: createdVehicle.vehicle_id,

                    position:
                      vehicle_media.position !== null
                        ? vehicle_media.position
                        : i,

                    dismantler_id: dismantler_id,
                  },
                  opts: {
                    removeOnComplete: {
                      count: 1000,
                    },
                    removeOnFail: {
                      count: 5000,
                    },
                  },
                });
              }
            }
          }
        }
      }
    }

    // Access log
    await AccessLog.create({
      action: "create",
      entity: "vehicle",
      entity_id: createdVehicle.vehicle_id,
      data: null,

      access_id: access_id,
    });

    // Add jobs to queues
    if (jobs.media_queue.length > 0) {
      await media_queue.addBulk(jobs.media_queue);
    }
  },
};
