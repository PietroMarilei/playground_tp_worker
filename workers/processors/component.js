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

// Component
const Component = require("@databases/sequelize/models/component/component");
const ComponentScannerCode = require("@databases/sequelize/models/component/component_scanner_code");
const ComponentMetafieldValue = require("@databases/sequelize/models/component/component_metafield_value");
const ComponentSEO = require("@databases/sequelize/models/component/component_seo");

const ComponentFulltext = require("@databases/sequelize/models/component/component_fulltext");

// Vehicle
const Vehicle = require("@databases/sequelize/models/vehicle/vehicle");
const VehicleEngine = require("@databases/sequelize/models/vehicle/vehicle_engine");

// Entry, Type, Brand, Model, Version
const Entry = require("@databases/sequelize/models/entry");

const EntryMetafield = require("@databases/sequelize/models/entry_metafield");

const Type = require("@databases/sequelize/models/type");
const Brand = require("@databases/sequelize/models/brand");
const Model = require("@databases/sequelize/models/model");
const Version = require("@databases/sequelize/models/version");

// ANIA
const AniaEntry = require("@databases/sequelize/models/ania/ania_entry");

const AniaType = require("@databases/sequelize/models/ania/ania_type");
const AniaBrand = require("@databases/sequelize/models/ania/ania_brand");
const AniaModel = require("@databases/sequelize/models/ania/ania_model");
const AniaVersion = require("@databases/sequelize/models/ania/ania_version");

// Dismantler
const DismantlerEntry = require("@databases/sequelize/models/dismantler/dismantler_entry");

const DismantlerType = require("@databases/sequelize/models/dismantler/dismantler_type");
const DismantlerBrand = require("@databases/sequelize/models/dismantler/dismantler_brand");
const DismantlerModel = require("@databases/sequelize/models/dismantler/dismantler_model");
const DismantlerVersion = require("@databases/sequelize/models/dismantler/dismantler_version");

// Dismantler ANIA
const DismantlerAniaEntry = require("@databases/sequelize/models/dismantler/dismantler_ania_entry");

// Manufacturer
const Manufacturer = require("@databases/sequelize/models/manufacturer");
const SystemManufacturer = require("@databases/sequelize/models/system/system_manufacturer");
const DismantlerManufacturer = require("@databases/sequelize/models/dismantler/dismantler_manufacturer");
const e = require("express");
// #endregion Models

// Enums
const { side_enums } = require("@databases/sequelize/enums");

module.exports = {
  import_component: async function (job) {
    console.log('creating component:', job.data.component?.oem_code)

    const component = job.data.component;
    const dismantler_id = job.data.dismantler_id;
    const access_id = job.data.access_id;

    // Jobs
    const jobs = {
      media_queue: []
    };

    // Save to database
    const createdComponent = await Component.create({
      // Create random and unique string for label
      label: `TP-C-${dismantler_id}-`,

      specification:
        component.specification !== undefined &&
          component.specification !== null &&
          component.specification !== "" &&
          component.specification !== "null"
          ? component.specification
          : null,

      is_disassembled:
        component.is_disassembled !== undefined &&
          component.is_disassembled !== null &&
          component.is_disassembled !== "" &&
          component.is_disassembled !== "null"
          ? component.is_disassembled
          : false,

      oem_code:
        component.oem_code !== undefined &&
          component.oem_code !== null &&
          component.oem_code !== "" &&
          component.oem_code !== "null"
          ? component.oem_code
          : null,
      constructor_code:
        component.constructor_code !== undefined &&
          component.constructor_code !== null &&
          component.constructor_code !== "" &&
          component.constructor_code !== "null"
          ? component.constructor_code
          : null,

      manufacturer_code:
        component.manufacturer_code !== undefined &&
          component.manufacturer_code !== null &&
          component.manufacturer_code !== "" &&
          component.manufacturer_code !== "null"
          ? component.manufacturer_code
          : null,
      manufacturer_id:
        component.manufacturer_id !== undefined &&
          component.manufacturer_id !== null &&
          component.manufacturer_id !== "" &&
          component.manufacturer_id !== "null"
          ? component.manufacturer_id
          : null,

      other_codes:
        component.other_codes !== undefined &&
          component.other_codes !== null &&
          component.other_codes !== "" &&
          component.other_codes !== "null"
          ? component.other_codes
          : null,

      list_price:
        component.list_price !== undefined &&
          component.list_price !== null &&
          component.list_price !== "" &&
          component.list_price !== "null"
          ? component.list_price
          : null,
      counter_price:
        component.counter_price !== undefined &&
          component.counter_price !== null &&
          component.counter_price !== "" &&
          component.counter_price !== "null"
          ? component.counter_price
          : null,

      side:
        component.side !== undefined &&
          component.side !== null &&
          component.side !== "" &&
          component.side !== "null"
          ? component.side
          : null,
      weight:
        component.weight !== undefined &&
          component.weight !== null &&
          component.weight !== "" &&
          component.weight !== "null"
          ? component.weight
          : null,
      condition:
        component.condition !== undefined &&
          component.condition !== null &&
          component.condition !== "" &&
          component.condition !== "null"
          ? component.condition
          : null,
      status:
        component.status !== undefined &&
          component.status !== null &&
          component.status !== "" &&
          component.status !== "null"
          ? component.status
          : "available",

      notes:
        component.notes !== undefined &&
          component.notes !== null &&
          component.notes !== "" &&
          component.notes !== "null"
          ? component.notes
          : null,

      entry_id: component.entry_id,
      version_id: component.version_id,

      vehicle_id:
        component.vehicle_id !== undefined &&
          component.vehicle_id !== null &&
          component.vehicle_id !== "" &&
          component.vehicle_id !== "null"
          ? component.vehicle_id
          : null,

      warehouse_bin_id:
        component.warehouse_bin_id !== undefined &&
          component.warehouse_bin_id !== null &&
          component.warehouse_bin_id !== "" &&
          component.warehouse_bin_id !== "null"
          ? component.warehouse_bin_id
          : null,

      dismantler_id: dismantler_id,

      archived_at:
        component.archived_at !== undefined &&
          component.archived_at !== null &&
          component.archived_at !== "" &&
          component.archived_at !== "null"
          ? component.archived_at
          : null
    });

    // Update immediately label
    createdComponent.label =
      createdComponent.label + createdComponent.component_id;
    await createdComponent.save();

    // Created at
    if (component.created_at !== undefined) {
      if (
        component.created_at !== null &&
        component.created_at !== "" &&
        component.created_at !== "null"
      ) {
        createdComponent.changed("created_at", true);
        createdComponent.set(
          "created_at",
          moment(component.created_at).format("YYYY-MM-DD HH:mm:ss"),
          { raw: true }
        );
        await createdComponent.save({
          fields: ["created_at"]
        });
      }
    }

    // Scanner Codes
    if (
      component.component_scanner_codes !== undefined &&
      component.component_scanner_codes !== null &&
      component.component_scanner_codes.length > 0
    ) {
      for (let i = 0; i < component.component_scanner_codes.length; i++) {
        const component_scanner_code = component.component_scanner_codes[i];

        if (
          component_scanner_code.scanner_code !== null &&
          component_scanner_code.scanner_code !== "null"
        ) {
          // Save
          await ComponentScannerCode.create({
            scanner_code: component_scanner_code.scanner_code.toString().trim(),
            source:
              component_scanner_code.source !== null
                ? component_scanner_code.source.toString().trim()
                : "unknown",

            component_id: createdComponent.component_id
          });
        }
      }
    }

    // Metafields
    if (
      component.component_metafield_values !== undefined &&
      component.component_metafield_values !== null &&
      component.component_metafield_values.length > 0
    ) {
      for (let j = 0; j < component.component_metafield_values.length; j++) {
        const component_metafield_value =
          component.component_metafield_values[j];

        // TODO check if metafields is for wheel (use metafield_id)

        if (
          component_metafield_value.value !== null &&
          component_metafield_value.value !== "null"
        ) {
          // Save
          await ComponentMetafieldValue.create({
            metafield_id: component_metafield_value.metafield_id,
            value: component_metafield_value.value,

            component_id: createdComponent.component_id
          });
        }
      }
    }

    // SEO
    if (
      component.component_seo !== undefined &&
      component.component_seo !== null &&
      component.component_seo !== "" &&
      component.component_seo !== "null"
    ) {
      // Save SEO
      await ComponentSEO.create({
        title:
          component.component_seo.title !== undefined &&
            component.component_seo.title !== null &&
            component.component_seo.title !== "" &&
            component.component_seo.title !== "null"
            ? component.component_seo.title
            : null,
        description:
          component.component_seo.description !== undefined &&
            component.component_seo.description !== null &&
            component.component_seo.description !== "" &&
            component.component_seo.description !== "null"
            ? component.component_seo.description
            : null,
        keywords:
          component.component_seo.keywords !== undefined &&
            component.component_seo.keywords !== null &&
            component.component_seo.keywords !== "" &&
            component.component_seo.keywords !== "null"
            ? component.component_seo.keywords
            : null,

        component_id: createdComponent.component_id
      });
    }

    // Media
    if (
      component.component_media !== undefined &&
      component.component_media !== null &&
      component.component_media !== "" &&
      component.component_media !== "null" &&
      component.component_media.length > 0
    ) {
      for (let i = 0; i < component.component_media.length; i++) {
        const component_media = component.component_media[i];

        if (component_media.media_type === "image") {
          if (
            component_media.media !== undefined &&
            component_media.media !== null &&
            component_media.media !== "" &&
            component_media.media !== "null"
          ) {
            if (component_media.media.source === "external") {
              if (
                component_media.media.url !== undefined &&
                component_media.media.url !== null &&
                component_media.media.url !== "" &&
                component_media.media.url !== "null"
              ) {
                jobs.media_queue.push({
                  name: "media_from_url",
                  data: {
                    media_type: component_media.media_type,
                    url: component_media.media.url,

                    entity: "component",
                    entity_id: createdComponent.component_id,

                    position:
                      component_media.position !== null
                        ? component_media.position
                        : i,

                    dismantler_id: dismantler_id
                  },
                  opts: {
                    removeOnComplete: {
                      count: 1000
                    },
                    removeOnFail: {
                      count: 5000
                    }
                  }
                });
              }
            }
          }
        }
      }
    }

    // // Dispatch
    // // TODO think about dispatching all components at once
    // // create an array of component_ids only for those components that have specific metafields
    // if (
    //   createdComponent.status !== null &&
    //   !["sold", "unprocessed", "reserved", "discontinued", "lost"].includes(
    //     createdComponent.status
    //   )
    // ) {
    //   await dispatch(
    //     dismantler_id,
    //     "create",
    //     "component",
    //     createdComponent.component_id
    //   );
    // }

    // Access log
    await AccessLog.create({
      action: "create",
      entity: "component",
      entity_id: createdComponent.component_id,
      data: null,

      access_id: access_id
    });

    // Add jobs to queues
    if (jobs.media_queue.length > 0) {
      await media_queue.addBulk(jobs.media_queue);
    }
  },

  update_component_fulltext: async function (job) {
    const dismantler_id = job.data.dismantler_id
      ? job.data.dismantler_id
      : null;
    const component_id = job.data.component_id;
    const columns = job.data.columns;

    // Existing Fulltext
    const existingComponentFulltext = await ComponentFulltext.findOne({
      where: {
        component_id: component_id
      }
    });

    // #region Include
    const include = [
      // Component Scanner Code
      {
        model: ComponentScannerCode
      }
    ];

    // Check columns
    // Version
    if (columns.includes("version_fulltext") || !existingComponentFulltext) {
      include.push(
        // Version
        {
          model: Version,
          attributes: ["version_id", "version_type"],
          include: [
            {
              model: AniaVersion,
              attributes: ["ania_version"],
              required: false
            },
            {
              model: DismantlerVersion,
              attributes: ["dismantler_version"],
              required: false
            },
            {
              model: Model,
              attributes: ["model_id", "model_type"],
              include: [
                {
                  model: AniaModel,
                  attributes: ["ania_model"],
                  required: false
                },
                {
                  model: DismantlerModel,
                  attributes: ["dismantler_model"],

                  required: false
                },
                {
                  model: Brand,
                  attributes: ["brand_id", "brand_type", "type_id"],
                  include: [
                    {
                      model: AniaBrand,
                      attributes: ["ania_brand"],
                      required: false
                    },
                    {
                      model: DismantlerBrand,
                      attributes: ["dismantler_brand"],
                      required: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      );
    }

    // Entry
    if (columns.includes("entry_fulltext") || !existingComponentFulltext) {
      include.push(
        // Entry
        {
          model: Entry,
          attributes: ["entry_id", "entry_type"],
          include: [
            {
              model: AniaEntry,
              attributes: ["ania_entry"],
              required: false
            },
            {
              model: DismantlerEntry,
              attributes: ["dismantler_entry"],

              required: false
            }
          ]
        }
      );
    }

    // Vehicle
    if (columns.includes("vehicle_fulltext") || !existingComponentFulltext) {
      include.push(
        // Vehicle
        {
          model: Vehicle,
          attributes: ["vehicle_id", "code", "plate", "vin"],
          required: false,
          include: [
            { model: VehicleEngine, attributes: ["code"], required: false }
          ]
        }
      );
    }

    // Manufacturer
    if (
      columns.includes("manufacturer_fulltext") ||
      !existingComponentFulltext
    ) {
      include.push(
        // Manufacturer
        {
          model: Manufacturer,
          attributes: ["manufacturer_id", "manufacturer_type"],
          required: false,
          include: [
            {
              model: SystemManufacturer,
              attributes: ["system_manufacturer"],
              required: false
            },
            {
              model: DismantlerManufacturer,
              attributes: ["dismantler_manufacturer"],
              required: false
            }
          ]
        }
      );
    }
    // #endregion Include

    // Existing component
    const existingComponent = await Component.findOne({
      where: {
        component_id: component_id
      },
      include: [...include]
    });

    if (!existingComponent) {
      return;
    }

    // #region Fulltext
    const fulltext = {
      component_fulltext: {
        component_id: "",
        label: "",

        oem_code: "",
        constructor_code: "",
        manufacturer_code: "",
        other_codes: "",
        side: "",
        notes: "",

        scanner_codes: []
      },
      version_fulltext: {
        brand: "",
        model: "",
        version: ""
      },
      entry_fulltext: {
        ania_entry: "",
        dismantler_ania_entry: "",

        dismantler_entry: ""
      },
      vehicle_fulltext: {
        code: "",
        plate: "",
        vin: "",

        vehicle_engine_code: ""
      },
      manufacturer_fulltext: {
        manufacturer: ""
      }
    };

    // #region Component Fulltext
    // Component
    fulltext.component_fulltext.component_id = existingComponent.component_id;
    fulltext.component_fulltext.label = existingComponent.label;

    // OEM Code
    if (
      existingComponent.oem_code &&
      existingComponent.oem_code !== "" &&
      existingComponent.oem_code !== null &&
      existingComponent.oem_code !== "null"
    ) {
      fulltext.component_fulltext.oem_code = existingComponent.oem_code;
    }

    // Constructor Code
    if (
      existingComponent.constructor_code &&
      existingComponent.constructor_code !== "" &&
      existingComponent.constructor_code !== null &&
      existingComponent.constructor_code !== "null"
    ) {
      fulltext.component_fulltext.constructor_code =
        existingComponent.constructor_code;
    }

    // Manufacturer Code
    if (
      existingComponent.manufacturer_code &&
      existingComponent.manufacturer_code !== "" &&
      existingComponent.manufacturer_code !== null &&
      existingComponent.manufacturer_code !== "null"
    ) {
      fulltext.component_fulltext.manufacturer_code =
        existingComponent.manufacturer_code;
    }

    // Other Codes
    if (
      existingComponent.other_codes &&
      existingComponent.other_codes !== "" &&
      existingComponent.other_codes !== null &&
      existingComponent.other_codes !== "null"
    ) {
      fulltext.component_fulltext.other_codes = existingComponent.other_codes;
    }

    // Side
    if (
      existingComponent.side &&
      existingComponent.side !== null &&
      existingComponent.side !== "" &&
      existingComponent.side !== "null"
    ) {
      fulltext.component_fulltext.side =
        side_enums[existingComponent.side][0].toLowerCase();
    }

    // Notes
    if (
      existingComponent.notes &&
      existingComponent.notes !== "" &&
      existingComponent.notes !== null &&
      existingComponent.notes !== "null"
    ) {
      fulltext.component_fulltext.notes = existingComponent.notes;
    }

    // Scanner Codes
    if (
      existingComponent.component_scanner_codes &&
      existingComponent.component_scanner_codes !== null &&
      existingComponent.component_scanner_codes.length > 0
    ) {
      fulltext.component_fulltext.scanner_codes =
        existingComponent.component_scanner_codes.map((c) => c.scanner_code);
    }
    // #endregion Component Fulltext

    // #region Version Fulltext
    if (existingComponent.version && existingComponent.version !== null) {
      if (existingComponent.version.version_type === "ania_version") {
        fulltext.version_fulltext.version =
          existingComponent.version.ania_version.ania_version;
      }
      if (existingComponent.version.version_type === "dismantler_version") {
        fulltext.version_fulltext.version =
          existingComponent.version.dismantler_version.dismantler_version;
      }

      // Model
      if (existingComponent.version.model) {
        if (existingComponent.version.model.model_type === "ania_model") {
          fulltext.version_fulltext.model =
            existingComponent.version.model.ania_model.ania_model;
        }
        if (existingComponent.version.model.model_type === "dismantler_model") {
          fulltext.version_fulltext.model =
            existingComponent.version.model.dismantler_model.dismantler_model;
        }

        // Brand
        if (existingComponent.version.model.brand) {
          if (
            existingComponent.version.model.brand.brand_type === "ania_brand"
          ) {
            fulltext.version_fulltext.brand =
              existingComponent.version.model.brand.ania_brand.ania_brand;
          }
          if (
            existingComponent.version.model.brand.brand_type ===
            "dismantler_brand"
          ) {
            fulltext.version_fulltext.brand =
              existingComponent.version.model.brand.dismantler_brand.dismantler_brand;
          }
        }
      }
    }
    // #endregion Version Fulltext

    // #region Entry Fulltext
    if (existingComponent.entry && existingComponent.entry !== null) {
      if (existingComponent.entry.entry_type === "ania_entry") {
        fulltext.entry_fulltext.ania_entry =
          existingComponent.entry.ania_entry.ania_entry;

        const existingDismantlerAniaEntry = await DismantlerAniaEntry.findOne({
          where: {
            entry_id: existingComponent.entry.entry_id,
            dismantler_id: dismantler_id
          }
        });

        if (existingDismantlerAniaEntry) {
          if (
            existingDismantlerAniaEntry.entry &&
            existingDismantlerAniaEntry.entry !== null &&
            existingDismantlerAniaEntry.entry !== "null" &&
            existingDismantlerAniaEntry.entry !== ""
          ) {
            fulltext.entry_fulltext.dismantler_ania_entry =
              existingDismantlerAniaEntry.entry;
          }
        }
      }

      if (existingComponent.entry.entry_type === "dismantler_entry") {
        fulltext.entry_fulltext.dismantler_entry =
          existingComponent.entry.dismantler_entry.dismantler_entry;
      }
    }
    // #endregion Entry Fulltext

    // #region Vehicle Fulltext
    if (existingComponent.vehicle && existingComponent.vehicle !== null) {
      // Code
      if (
        existingComponent.vehicle.code &&
        existingComponent.vehicle.code !== "" &&
        existingComponent.vehicle.code !== null &&
        existingComponent.vehicle.code !== "null"
      ) {
        fulltext.vehicle_fulltext.code = existingComponent.vehicle.code;
      }

      // Plate
      if (
        existingComponent.vehicle.plate &&
        existingComponent.vehicle.plate !== "" &&
        existingComponent.vehicle.plate !== null &&
        existingComponent.vehicle.plate !== "null"
      ) {
        fulltext.vehicle_fulltext.plate = existingComponent.vehicle.plate;
      }

      // VIN
      if (
        existingComponent.vehicle.vin &&
        existingComponent.vehicle.vin !== "" &&
        existingComponent.vehicle.vin !== null &&
        existingComponent.vehicle.vin !== "null"
      ) {
        fulltext.vehicle_fulltext.vin = existingComponent.vehicle.vin;
      }

      // Vehicle Engine Code
      if (
        existingComponent.vehicle.vehicle_engine &&
        existingComponent.vehicle.vehicle_engine.code &&
        existingComponent.vehicle.vehicle_engine.code !== "" &&
        existingComponent.vehicle.vehicle_engine.code !== null &&
        existingComponent.vehicle.vehicle_engine.code !== "null"
      ) {
        fulltext.vehicle_fulltext.vehicle_engine_code =
          existingComponent.vehicle.vehicle_engine.code;
      }
    }
    // #endregion Vehicle Fulltext

    // #region Manufacturer Fulltext
    if (
      existingComponent.manufacturer &&
      existingComponent.manufacturer !== null
    ) {
      if (
        existingComponent.manufacturer.manufacturer_type ===
        "system_manufacturer"
      ) {
        fulltext.manufacturer_fulltext.manufacturer =
          existingComponent.manufacturer.system_manufacturer.system_manufacturer;
      }

      if (
        existingComponent.manufacturer.manufacturer_type ===
        "dismantler_manufacturer"
      ) {
        fulltext.manufacturer_fulltext.manufacturer =
          existingComponent.manufacturer.dismantler_manufacturer.dismantler_manufacturer;
      }
    }
    // #endregion Manufacturer Fulltext

    // Fulltexts
    let component_fulltext = "";
    let version_fulltext = "";
    let entry_fulltext = "";
    let vehicle_fulltext = "";
    let manufacturer_fulltext = "";

    // Component Fulltext
    for (const key in fulltext.component_fulltext) {
      if (fulltext.component_fulltext[key]) {
        if (Array.isArray(fulltext.component_fulltext[key])) {
          component_fulltext +=
            fulltext.component_fulltext[key].join(" ") + " ";
        } else {
          component_fulltext += fulltext.component_fulltext[key] + " ";
        }
      }
    }
    component_fulltext = component_fulltext.trim();

    // Version Fulltext
    for (const key in fulltext.version_fulltext) {
      if (fulltext.version_fulltext[key]) {
        version_fulltext += fulltext.version_fulltext[key] + " ";
      }
    }
    version_fulltext = version_fulltext.trim();

    // Entry Fulltext
    for (const key in fulltext.entry_fulltext) {
      if (fulltext.entry_fulltext[key]) {
        entry_fulltext += fulltext.entry_fulltext[key] + " ";
      }
    }
    entry_fulltext = entry_fulltext.trim();

    // Vehicle Fulltext
    for (const key in fulltext.vehicle_fulltext) {
      if (fulltext.vehicle_fulltext[key]) {
        vehicle_fulltext += fulltext.vehicle_fulltext[key] + " ";
      }
    }
    vehicle_fulltext = vehicle_fulltext.trim();

    // Manufacturer Fulltext
    for (const key in fulltext.manufacturer_fulltext) {
      if (fulltext.manufacturer_fulltext[key]) {
        manufacturer_fulltext += fulltext.manufacturer_fulltext[key] + " ";
      }
    }
    manufacturer_fulltext = manufacturer_fulltext.trim();
    // #endregion Fulltext

    if (existingComponentFulltext) {
      // Update
      if (
        (columns.includes("component_fulltext") &&
          existingComponentFulltext.component_fulltext !==
            component_fulltext.toLowerCase()) ||
        (columns.includes("version_fulltext") &&
          existingComponentFulltext.version_fulltext !==
            version_fulltext.toLowerCase()) ||
        (columns.includes("entry_fulltext") &&
          existingComponentFulltext.entry_fulltext !==
            entry_fulltext.toLowerCase()) ||
        (columns.includes("vehicle_fulltext") &&
          existingComponentFulltext.vehicle_fulltext !==
            vehicle_fulltext.toLowerCase()) ||
        (columns.includes("manufacturer_fulltext") &&
          existingComponentFulltext.manufacturer_fulltext !==
            manufacturer_fulltext.toLowerCase())
      ) {
        if (
          columns.includes("component_fulltext") &&
          existingComponentFulltext.component_fulltext !==
            component_fulltext.toLowerCase()
        ) {
          // Component Fulltext
          existingComponentFulltext.component_fulltext =
            component_fulltext.toLowerCase();
        }

        // Version Fulltext
        if (
          columns.includes("version_fulltext") &&
          existingComponentFulltext.version_fulltext !==
            version_fulltext.toLowerCase()
        ) {
          existingComponentFulltext.version_fulltext =
            version_fulltext.toLowerCase();
        }

        // Entry Fulltext
        if (
          columns.includes("entry_fulltext") &&
          existingComponentFulltext.entry_fulltext !==
            entry_fulltext.toLowerCase()
        ) {
          existingComponentFulltext.entry_fulltext =
            entry_fulltext.toLowerCase();
        }

        // Vehicle Fulltext
        if (
          columns.includes("vehicle_fulltext") &&
          existingComponentFulltext.vehicle_fulltext !==
            vehicle_fulltext.toLowerCase()
        ) {
          existingComponentFulltext.vehicle_fulltext =
            vehicle_fulltext.toLowerCase();
        }

        // Manufacturer Fulltext
        if (
          columns.includes("manufacturer_fulltext") &&
          existingComponentFulltext.manufacturer_fulltext !==
            manufacturer_fulltext.toLowerCase()
        ) {
          existingComponentFulltext.manufacturer_fulltext =
            manufacturer_fulltext.toLowerCase();
        }

        await existingComponentFulltext.save();
      }
    } else {
      // Create
      await ComponentFulltext.create({
        component_id: component_id,
        component_fulltext: component_fulltext.toLowerCase(),
        version_fulltext: version_fulltext.toLowerCase(),
        entry_fulltext: entry_fulltext.toLowerCase(),
        vehicle_fulltext: vehicle_fulltext.toLowerCase(),
        manufacturer_fulltext: manufacturer_fulltext.toLowerCase()
      });
    }
  }
};
