// Axios
const axios = require("axios");

// Moment
const moment = require("moment");

// Sequelize
const { Op } = require("sequelize");

// #region Models
// Component
const Component = require("@databases/sequelize/models/component/component");
const ComponentMedia = require("@databases/sequelize/models/component/component_media");
const ComponentMetafieldValue = require("@databases/sequelize/models/component/component_metafield_value");
const ComponentScannerCode = require("@databases/sequelize/models/component/component_scanner_code");

// END Component

// Vehicle
const Vehicle = require("@databases/sequelize/models/vehicle/vehicle");
const VehicleAcceptance = require("@databases/sequelize/models/vehicle/vehicle_acceptance");
const VehicleDrainage = require("@databases/sequelize/models/vehicle/vehicle_drainage");
const VehicleBody = require("@databases/sequelize/models/vehicle/vehicle_body");
const VehicleEngine = require("@databases/sequelize/models/vehicle/vehicle_engine");
const VehicleTransmission = require("@databases/sequelize/models/vehicle/vehicle_transmission");
const VehicleMedia = require("@databases/sequelize/models/vehicle/vehicle_media");

const VehicleHeadlight = require("@databases/sequelize/models/vehicle/vehicle_headlight");
const VehicleTaillight = require("@databases/sequelize/models/vehicle/vehicle_taillight");
const VehicleRearViewMirror = require("@databases/sequelize/models/vehicle/vehicle_rear_view_mirror");
const VehicleEntertainment = require("@databases/sequelize/models/vehicle/vehicle_entertainment");
const VehicleDashboard = require("@databases/sequelize/models/vehicle/vehicle_dashboard");
const VehicleScannerCode = require("@databases/sequelize/models/vehicle/vehicle_scanner_code");
// END Vehicle

// Tyre
const Tyre = require("@databases/sequelize/models/tyre/tyre");
const TyreMedia = require("@databases/sequelize/models/tyre/tyre_media");
const TyreMetafieldValue = require("@databases/sequelize/models/tyre/tyre_metafield_value");

// Wheel
const Wheel = require("@databases/sequelize/models/wheel/wheel");
const WheelMedia = require("@databases/sequelize/models/wheel/wheel_media");
const WheelMetafieldValue = require("@databases/sequelize/models/wheel/wheel_metafield_value");

// END ANIA

// Entry, Type, Brand, Model, Version
const Entry = require("@databases/sequelize/models/entry");
// Group
const Group = require("@databases/sequelize/models/group");
const TypeEntryGroup = require("@databases/sequelize/models/type_entry_group");
const AniaGroup = require("@databases/sequelize/models/ania/ania_group");
const DismantlerGroup = require("@databases/sequelize/models/dismantler/dismantler_group");

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
// END Entry, Type, Brand, Model, Version

// Manufacturer
const Manufacturer = require("@databases/sequelize/models/manufacturer");
const SystemManufacturer = require("@databases/sequelize/models/system/system_manufacturer");
const DismantlerManufacturer = require("@databases/sequelize/models/dismantler/dismantler_manufacturer");

// Metafield
const Metafield = require("@databases/sequelize/models/metafield/metafield");
const DismantlerMetafield = require("@databases/sequelize/models/dismantler/dismantler_metafield");
const ServiceMetafield = require("@databases/sequelize/models/service/service_metafield");
// #endregion Models

// Enums
const { side_enums } = require("@databases/sequelize/enums");

// #region Utilities
// Parsers
const { union_parse, media_parse } = require("@utilities/helpers/parsers");
// #endregion Utilities

module.exports = {
  // #region Component
  create_component: async function (job) {
    console.log('JOB: create_component for Ecommerce', job.data)
    //Init
    const body = [];

    const component = await Component.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        component_id: job.data.component_id,
        status: {
          [Op.notIn]: [
            "sold",
            "unprocessed",
            "reserved",
            "discontinued",
            "lost"
          ]
        },
        is_disassembled: true
      },
      include: [
        // Component Media
        { model: ComponentMedia, separate: true, order: [["position", "ASC"]] },

        // Entry
        {
          model: Entry,
          include: [
            {
              model: AniaEntry,
              required: false,
              include: [
                {
                  model: DismantlerAniaEntry,
                  where: { dismantler_id: job.data.dismantler_id },
                  required: false
                }
              ]
            },
            {
              model: DismantlerEntry,
              where: { dismantler_id: job.data.dismantler_id },
              required: false
            }
          ]
        },

        // Version
        {
          model: Version,
          include: [
            { model: AniaVersion, required: false },
            {
              model: DismantlerVersion,
              where: { dismantler_id: job.data.dismantler_id },
              required: false
            },
            {
              model: Model,
              include: [
                { model: AniaModel, required: false },
                {
                  model: DismantlerModel,
                  where: { dismantler_id: job.data.dismantler_id },
                  required: false
                },
                {
                  model: Brand,
                  include: [
                    { model: AniaBrand, required: false },
                    {
                      model: DismantlerBrand,
                      where: { dismantler_id: job.data.dismantler_id },
                      required: false
                    },
                    {
                      model: Type,
                      include: [
                        { model: AniaType, required: false },
                        {
                          model: DismantlerType,
                          where: {
                            dismantler_id: job.data.dismantler_id
                          },
                          required: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },

        // Metafield
        {
          model: ComponentMetafieldValue,
          include: [
            {
              model: Metafield,
              required: true,
              where: {
                key: ["twiceparts_ecommerce_publish", "twiceparts_ecommerce_price"]
              }
            }
          ]
        },

        // Vehicle
        {
          model: Vehicle,
          required: false,
          include: [
            { model: VehicleTransmission, required: false },
            { model: VehicleEngine, required: false },
            { model: VehicleMedia, required: false },
            { model: VehicleScannerCode, required: false }
          ]
        },

      ]
    });

    // Check
    if (!component) {
      throw new Error(
        "No component found. Cannot perform the requested operation."
      );
    }

    // Check twiceparts_ecommerce_publish
    const twiceparts_ecommerce_publish = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "twiceparts_ecommerce_publish"
    );

    if (!twiceparts_ecommerce_publish || twiceparts_ecommerce_publish.value !== "true") {
      throw new Error(
        "Component not for sale on ecommerce. Cannot perform the requested operation."
      );
    }

    // Check twiceparts_ecommerce_price
    const twiceparts_ecommerce_price = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "twiceparts_ecommerce_price"
    );

    if (
      !twiceparts_ecommerce_price ||
      twiceparts_ecommerce_price.value === null ||
      twiceparts_ecommerce_price.value === "" ||
      parseFloat(twiceparts_ecommerce_price.value) === 0
    ) {
      throw new Error(
        "Component price not set. Cannot perform the requested operation."
      );
    }

    // Entry
    if (component.entry) {
      // Entry
      component.entry.entry = union_parse(component.entry, "entry");
    }

    // Version
    if (component.version) {
      if (
        !component.version.ania_version &&
        !component.version.dismantler_version
      ) {
        return;
      }

      component.version.version = union_parse(component.version, "version");

      // Model
      if (component.version.model) {
        if (
          !component.version.model.ania_model &&
          !component.version.model.dismantler_model
        ) {
          return;
        }

        component.version.model.model = union_parse(
          component.version.model,
          "model"
        );

        // Brand
        if (component.version.model.brand) {
          if (
            !component.version.model.brand.ania_brand &&
            !component.version.model.brand.dismantler_brand
          ) {
            return;
          }

          component.version.model.brand.brand = union_parse(
            component.version.model.brand,
            "brand"
          );

          // Type
          if (component.version.model.brand.type) {
            if (
              !component.version.model.brand.type.ania_type &&
              !component.version.model.brand.type.dismantler_type
            ) {
              return;
            }

            component.version.model.brand.type.type = union_parse(
              component.version.model.brand.type,
              "type"
            );
          }
        }
      }
    }

    // Component Media
    if (component.component_media && component.component_media.length > 0) {
      // Media parse
      component.component_media = media_parse(component.component_media);
    }

    // Feed
    // Entry
    let entry = null;
    let group = null;
    let group_id = null

    if (component.entry !== null && component.entry.entry !== undefined) {
      if (component.entry.entry_type === "ania_entry") {
        // ANIA Entry
        entry = component.entry.entry.ania_entry;

        if (component.entry.entry.dismantler_ania_entries?.length > 0) {
          if (component.entry.entry.dismantler_ania_entries[0].entry !== null) {
            entry = component.entry.entry.dismantler_ania_entries[0].entry;
          }
        }
      } else {
        // Dismantler Entry
        entry = component.entry.entry.dismantler_entry;
      }

      // Side
      if (component.side && component.side !== null) {
        entry += ` ${side_enums[component.side][0].toLowerCase()}`;
      }

      // Group
      if (
        component.entry.type_entry_groups &&
        component.entry.type_entry_groups.length > 0 &&
        component.version?.model?.brand?.type
      ) {
        const type_entry_group = component.entry.type_entry_groups.find(
          (typeEntryGroup) => typeEntryGroup.type_id === component.version.model.brand.type.type_id
        );

        if (type_entry_group && type_entry_group.group) {
          group = union_parse(type_entry_group.group, "group");

          group_id = type_entry_group.group.group_id;

          group = group.ania_group ? group.ania_group : group.dismantler_group;

        }
      }
    }

    // Component Media
    let images = [];
    const componentImages = component.component_media.filter((media) => {
      return media.media_type === "image";
    });

    if (componentImages.length > 0) {
      images = componentImages.map((image) => {
        return `https://twice-parts.fra1.digitaloceanspaces.com/components/img/${image.media.filename}`;
      });
    } else {
      throw new Error(
        "Component has no images. Cannot perform the requested operation."
      );
    }

    if (!component.condition || component.condition === '') {
      console.log('missing condition, deleting component')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    let condition = null;
    switch (component.condition) {
      case "excellent":
      case "very_good":
        condition = "very_good";
        break;
      case "good":
        condition = 'good'
        break;
      case "decent":
        condition = "decent";
        break;
      case "sufficient":
        condition = "sufficient";
        break;
      case "barely_sufficient":
        condition = "barely_sufficient";
        break;
      //altri
      case "insufficient":
      case "faulty":
      case "to_check":
        console.log('delete for bad condition');
        await module.exports.delete_component(job);
        return {
          code: "DELETED"
        };
      default:
        condition = null;
        break;
    }

    // Vehicle Media
    let vehicle_images = [];
    const vehicleImages = component.vehicle.vehicle_media.filter((media) => {
      return media.media_type === "image";
    });

    if (vehicleImages.length > 0) {
      vehicle_images = vehicleImages.map((image) => {
        const media = typeof image.media === 'string' ? JSON.parse(image.media) : image.media;
        return `https://twice-parts.fra1.digitaloceanspaces.com/vehicles/img/${media.filename}`;
      });
    }
    // END Feed
    console.log('preparing body')

    body.push({
      action: "upsert",
      id_product: component.label,
      id_seller: job.data.id_seller,
      api_token_hash: job.data.api_token_hash,
      //FIXME: sblocca in automatico
      status: 0,

      //FIXME: é se non c'é codice OEM ? 
      part_number: component.oem_code !== null ? component.oem_code : null,

      constructor_code: component.constructor_code !== null ? component.constructor_code : null,

      manufacturer_code: component.manufacturer_code !== null ? component.manufacturer_code : null,

      // Group
      id_category: group_id !== null ? group_id : null,
      category: group !== null ? group : null,

      quantity: 1,

      id_brand:
        component.version.model.brand.brand_type === "ania_brand"
          ? component.version.model.brand.brand.ania_id
          : component.version.model.brand.brand.brand_id,

      brand:
        component.version.model.brand.brand_type === "ania_brand"
          ? component.version.model.brand.brand.ania_brand
          : component.version.model.brand.brand.dismantler_brand,

      id_model:
        component.version.model.model_type === "ania_model"
          ? component.version.model.model.ania_id
          : component.version.model.model.model_id,

      model:
        component.version.model.model_type === "ania_model"
          ? component.version.model.model.ania_model
          : component.version.model.model.dismantler_model,

      id_version:
        component.version.version_type === "ania_version"
          ? component.version.version.ania_id
          : component.version.version.version_id,

      version:
        component.version.version_type === "ania_version"
          ? component.version.version.ania_version
          : component.version.version.dismantler_version,

      // FIXME: chiama cosí la entry, anche se sarebbe piú un titolo
      description: entry !== null ? entry : null,
      price: parseFloat(twiceparts_ecommerce_price.value).toFixed(2),
      quality: condition,
      gallery: componentImages.join(","),

      // FIXME: chiederlo come array
      tag_code:
        component.component_scanner_codes?.length > 0
          ? [
            // FIXME: mando anche label 
            component.label,
            ...component.component_scanner_codes.map(code => code.scanner_code)].join(",")
          : component.label,


      weight: component.weight !== null ? parseFloat(component.weight) : 0,

      color: component.color !== null ? component.color : null,
      notes: component.notes !== null ? component.notes : null,
      other_codes: component.other_codes !== null ? component.other_codes : null,

      //FIXME: ad oggetto ?? 
      vehicle_info: JSON.stringify({
        //Vehicle
        vehicle_id:
          component.vehicle !== null ? component.vehicle.vehicle_id : null,

        vehicle_code: component.vehicle !== null ? component.vehicle.code : null,

        vehicle_vin:
          component.vehicle !== null
            ? component.vehicle.vin !== null
              ? component.vehicle.vin
              : null
            : null,
        vehicle_engine_km:
          component.vehicle !== null
            ? component.vehicle.km !== null
              ? component.vehicle.km
              : null
            : null,
        vehicle_engine_displacement:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.displacement !== null
              ? component.vehicle.vehicle_engine.displacement
              : null
            : null,
        vehicle_engine_code:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.code !== null
              ? component.vehicle.vehicle_engine.code
              : null
            : null,
        vehicle_engine_propulsion:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.propulsion !== null
              ? component.vehicle.vehicle_engine.propulsion
              : null
            : null,

        //PATCH
        vehicle_images: vehicle_images && vehicle_images?.length > 0 ? vehicle_images.join(',') : null,


        //VehicleTransmission
        vehicle_transmission_type: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.type !== null
            ? component.vehicle.vehicle_transmission.type
            : null
          : null,
        vehicle_transmission_gears: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.gears !== null
            ? component.vehicle.vehicle_transmission.gears
            : null
          : null,
        vehicle_transmission_has_reverse: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.has_reverse !== null
            ? component.vehicle.vehicle_transmission.has_reverse
            : null
          : null,
        vehicle_transmission_drive: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.drive !== null
            ? component.vehicle.vehicle_transmission.drive
            : null
          : null,

      })
    });

    try {
      //Axios
      const response = await axios({
        url: `${process.env.ECOMMERCE_TWICE_URL}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ECOMMERCE_TWICE_APIKEY,
          "x-bank-key": process.env.ECOMMERCE_TWICE_BANKKEY
        },
        data: JSON.stringify(body)
      });

      // Update component metafield value
      await update_component_metafield_value(
        component.component_id,
        "twiceparts_ecommerce_is_published",
        "true"
      );

      console.log('TwiceParts Ecommerce create success:', response.data);

    } catch (error) {
      const error_log = JSON.stringify(error.response?.data?.message || error.response?.data?.success === false || error.response?.data?.results?.[0])
      console.error(`TwiceParts Ecommerce Error: ${error_log}`);
      throw new Error(`TwiceParts Ecommerce Error: ${error_log}`);
    }
  },
  update_component: async function (job) {
    console.log('JOB: update component Ecommerce', job.data);
    // Init
    const body = [];

    const component = await Component.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        component_id: job.data.component_id
      },
      include: [
        // Component Media
        { model: ComponentMedia, separate: true, order: [["position", "ASC"]] },

        // Entry
        {
          model: Entry,
          include: [
            {
              model: AniaEntry,
              required: false,
              include: [
                {
                  model: DismantlerAniaEntry,
                  where: { dismantler_id: job.data.dismantler_id },
                  required: false
                }
              ]
            },
            {
              model: DismantlerEntry,
              where: { dismantler_id: job.data.dismantler_id },
              required: false
            },
            // Group
            {
              model: TypeEntryGroup,
              required: false,
              include: [
                //non serve il type
                {
                  model: Group,
                  include: [
                    { model: AniaGroup, required: false },
                    { model: DismantlerGroup, required: false, where: { dismantler_id: job.data.dismantler_id } }
                  ]
                }
              ]
            },
          ]
        },

        // Version
        {
          model: Version,
          include: [
            { model: AniaVersion, required: false },
            {
              model: DismantlerVersion,
              where: { dismantler_id: job.data.dismantler_id },
              required: false
            },
            {
              model: Model,
              include: [
                { model: AniaModel, required: false },
                {
                  model: DismantlerModel,
                  where: { dismantler_id: job.data.dismantler_id },
                  required: false
                },
                {
                  model: Brand,
                  include: [
                    { model: AniaBrand, required: false },
                    {
                      model: DismantlerBrand,
                      where: { dismantler_id: job.data.dismantler_id },
                      required: false
                    },
                    {
                      model: Type,
                      include: [
                        { model: AniaType, required: false },
                        {
                          model: DismantlerType,
                          where: {
                            dismantler_id: job.data.dismantler_id
                          },
                          required: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },

        // Metafield
        {
          model: ComponentMetafieldValue,
          include: [
            {
              model: Metafield,
              required: true,
              where: {
                key: ["twiceparts_ecommerce_publish", "twiceparts_ecommerce_price"]
              }
            }
          ]
        },

        // Vehicle
        {
          model: Vehicle,
          required: false,
          include: [
            { model: VehicleTransmission, required: false },
            { model: VehicleEngine, required: false },
            { model: VehicleMedia, required: false },
            { model: VehicleScannerCode, required: false },
            // {
            //   model: Version,
            //   required: false,
            //   include: [
            //     {
            //       model: Model,
            //       required: false,
            //       include: [
            //         {
            //           model: Brand,
            //           required: false,
            //           include: [
            //             {
            //               model: Type,
            //               required: false
            //             }
            //           ]
            //         }
            //       ]
            //     }
            //   ]
            // }
          ]
        },

        // Scanner Codes
        { model: ComponentScannerCode, separate: true },

      ]
    });

    // Check
    if (!component) {
      throw new Error(
        "No component found. Cannot perform the requested operation."
      );
    }

    // Check status
    if (
      ["sold", "unprocessed", "reserved", "discontinued", "lost"].includes(
        component.status
      )
    ) {
      console.log('delete 1: bad status')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check is_disassembled
    if (!component.is_disassembled) {
      console.log('delete 2: disassembled')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check archived_at
    if (component.archived_at !== null) {
      console.log('delete 3: archived')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }
    // Check twiceparts_ecommerce_publish
    const twiceparts_ecommerce_publish = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "twiceparts_ecommerce_publish"
    );

    if (!twiceparts_ecommerce_publish || twiceparts_ecommerce_publish.value !== "true") {
      console.log('delete 4: no publish')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check twiceparts_ecommerce_price
    const twiceparts_ecommerce_price = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "twiceparts_ecommerce_price"
    );

    if (
      !twiceparts_ecommerce_price ||
      twiceparts_ecommerce_price.value === null ||
      twiceparts_ecommerce_price.value === "" ||
      parseFloat(twiceparts_ecommerce_price.value) === 0
    ) {
      console.log('delete 5: no price')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }


    // Entry
    if (component.entry) {
      // Entry
      component.entry.entry = union_parse(component.entry, "entry");
    }

    // Version
    if (component.version) {
      if (
        !component.version.ania_version &&
        !component.version.dismantler_version
      ) {
        return;
      }

      component.version.version = union_parse(component.version, "version");

      // Model
      if (component.version.model) {
        if (
          !component.version.model.ania_model &&
          !component.version.model.dismantler_model
        ) {
          return;
        }

        component.version.model.model = union_parse(
          component.version.model,
          "model"
        );

        // Brand
        if (component.version.model.brand) {
          if (
            !component.version.model.brand.ania_brand &&
            !component.version.model.brand.dismantler_brand
          ) {
            return;
          }

          component.version.model.brand.brand = union_parse(
            component.version.model.brand,
            "brand"
          );

          // Type
          if (component.version.model.brand.type) {
            if (
              !component.version.model.brand.type.ania_type &&
              !component.version.model.brand.type.dismantler_type
            ) {
              return;
            }

            component.version.model.brand.type.type = union_parse(
              component.version.model.brand.type,
              "type"
            );
          }
        }
      }
    }

    // Component Media
    if (component.component_media && component.component_media.length > 0) {
      // Media parse
      component.component_media = media_parse(component.component_media);
    }

    // Feed
    // Entry
    let entry = null;
    let group = null;
    let group_id = null

    if (component.entry !== null && component.entry.entry !== undefined) {
      if (component.entry.entry_type === "ania_entry") {
        // ANIA Entry
        entry = component.entry.entry.ania_entry;

        if (component.entry.entry.dismantler_ania_entries?.length > 0) {
          if (component.entry.entry.dismantler_ania_entries[0].entry !== null) {
            entry = component.entry.entry.dismantler_ania_entries[0].entry;
          }
        }
      } else {
        // Dismantler Entry
        entry = component.entry.entry.dismantler_entry;
      }

      // Side
      if (component.side && component.side !== null) {
        entry += ` ${side_enums[component.side][0].toLowerCase()}`;
      }

      // Group
      if (
        component.entry.type_entry_groups &&
        component.entry.type_entry_groups.length > 0 &&
        component.version?.model?.brand?.type
      ) {
        const type_entry_group = component.entry.type_entry_groups.find(
          (typeEntryGroup) => typeEntryGroup.type_id === component.version.model.brand.type.type_id
        );

        if (type_entry_group && type_entry_group.group) {
          group = union_parse(type_entry_group.group, "group");

          group_id = type_entry_group.group.group_id;

          group = group.ania_group ? group.ania_group : group.dismantler_group;

        }
      }
    }

    // Component Media
    let component_images = [];
    const componentImages = component.component_media.filter((media) => {
      return media.media_type === "image";
    });

    if (componentImages.length > 0) {
      component_images = componentImages.map((image) => {
        return `https://twice-parts.fra1.digitaloceanspaces.com/components/img/${image.media.filename}`;
      });
    } else {
      console.log('delete no imgs')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    if (!component.condition || component.condition === '') {
      console.log('missing condition, deleting component')
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    let condition = null;
    switch (component.condition) {
      case "excellent":
      case "very_good":
        condition = "very_good";
        break;
      case "good":
        condition = 'good'
        break;
      case "decent":
        condition = "decent";
        break;
      case "sufficient":
        condition = "sufficient";
        break;
      case "barely_sufficient":
        condition = "barely_sufficient";
        break;
      //altri
      case "insufficient":
      case "faulty":
      case "to_check":
        console.log('delete for bad condition');
        await module.exports.delete_component(job);
        return {
          code: "DELETED"
        };
      default:
        condition = null;
        break;
    }

    // END Feed

    // Vehicle Media
    let vehicle_images = [];
    const vehicleImages = component.vehicle.vehicle_media.filter((media) => {
      return media.media_type === "image";
    });

    if (vehicleImages.length > 0) {
      vehicle_images = vehicleImages.map((image) => {
        const media = typeof image.media === 'string' ? JSON.parse(image.media) : image.media;
        return `https://twice-parts.fra1.digitaloceanspaces.com/vehicles/img/${media.filename}`;
      });
    }

    console.log('preparing body')

    body.push({
      action: "upsert",
      id_product: component.label,
      id_seller: job.data.id_seller,
      api_token_hash: job.data.api_token_hash,
      //FIXME: sblocca in automatico
      status: 0,

      //FIXME: é se non c'é codice OEM ? 
      part_number: component.oem_code !== null ? component.oem_code : null,

      constructor_code: component.constructor_code !== null ? component.constructor_code : null,

      manufacturer_code: component.manufacturer_code !== null ? component.manufacturer_code : null,

      // Group
      id_category: group_id !== null ? group_id : null,
      category: group !== null ? group : null,

      quantity: 1,

      id_brand:
        component.version.model.brand.brand_type === "ania_brand"
          ? component.version.model.brand.brand.ania_id
          : component.version.model.brand.brand.brand_id,

      brand:
        component.version.model.brand.brand_type === "ania_brand"
          ? component.version.model.brand.brand.ania_brand
          : component.version.model.brand.brand.dismantler_brand,

      id_model:
        component.version.model.model_type === "ania_model"
          ? component.version.model.model.ania_id
          : component.version.model.model.model_id,

      model:
        component.version.model.model_type === "ania_model"
          ? component.version.model.model.ania_model
          : component.version.model.model.dismantler_model,

      id_version:
        component.version.version_type === "ania_version"
          ? component.version.version.ania_id
          : component.version.version.version_id,

      version:
        component.version.version_type === "ania_version"
          ? component.version.version.ania_version
          : component.version.version.dismantler_version,

      // FIXME: chiama cosí la entry, anche se sarebbe piú un titolo
      description: entry !== null ? entry : null,
      price: parseFloat(twiceparts_ecommerce_price.value).toFixed(2),
      quality: condition,
      gallery: componentImages.join(","),

      // FIXME: chiederlo come array
      tag_code:
        component.component_scanner_codes?.length > 0
          ? [
            // FIXME: mando anche label 
            component.label,
            ...component.component_scanner_codes.map(code => code.scanner_code)].join(",")
          : component.label,


      weight: component.weight !== null ? parseFloat(component.weight) : 0,

      color: component.color !== null ? component.color : null,
      notes: component.notes !== null ? component.notes : null,
      other_codes: component.other_codes !== null ? component.other_codes : null,

      //FIXME: ad oggetto ?? 
      vehicle_info: JSON.stringify({
        //Vehicle
        vehicle_id:
          component.vehicle !== null ? component.vehicle.vehicle_id : null,

        vehicle_code: component.vehicle !== null ? component.vehicle.code : null,

        vehicle_vin:
          component.vehicle !== null
            ? component.vehicle.vin !== null
              ? component.vehicle.vin
              : null
            : null,
        vehicle_engine_km:
          component.vehicle !== null
            ? component.vehicle.km !== null
              ? component.vehicle.km
              : null
            : null,
        vehicle_engine_displacement:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.displacement !== null
              ? component.vehicle.vehicle_engine.displacement
              : null
            : null,
        vehicle_engine_code:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.code !== null
              ? component.vehicle.vehicle_engine.code
              : null
            : null,
        vehicle_engine_propulsion:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.propulsion !== null
              ? component.vehicle.vehicle_engine.propulsion
              : null
            : null,

        //PATCH
        vehicle_plate:
          component.vehicle !== null && component.vehicle.plate !== null
            ? component.vehicle.plate
            : null,
        vehicle_kw:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.kw !== null ? component.vehicle.vehicle_engine.kw : null
            : null,
        vehicle_hp:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.hp !== null ? component.vehicle.vehicle_engine.hp : null
            : null,
        vehicle_cylinders:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.cylinders !== null ? component.vehicle.vehicle_engine.cylinders : null
            : null,
        vehicle_valves:
          component.vehicle !== null && component.vehicle.vehicle_engine !== null
            ? component.vehicle.vehicle_engine.valves !== null ? component.vehicle.vehicle_engine.valves : null
            : null,
        //headlight / VehicleTaillight /VehicleEntertainment /VehicleRearViewMirror /drainage ?

        // VehicleImages
        vehicle_images: vehicle_images && vehicle_images?.length > 0 ? vehicle_images.join(',') : null,


        //VehicleTransmission
        vehicle_transmission_type: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.type !== null
            ? component.vehicle.vehicle_transmission.type
            : null
          : null,
        vehicle_transmission_gears: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.gears !== null
            ? component.vehicle.vehicle_transmission.gears
            : null
          : null,
        vehicle_transmission_has_reverse: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.has_reverse !== null
            ? component.vehicle.vehicle_transmission.has_reverse
            : null
          : null,
        vehicle_transmission_drive: component.vehicle !== null && component.vehicle.vehicle_transmission !== null
          ? component.vehicle.vehicle_transmission.drive !== null
            ? component.vehicle.vehicle_transmission.drive
            : null
          : null,

      })
    });

    try {
      //Axios
      const response = await axios({
        url: `${process.env.ECOMMERCE_TWICE_URL}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ECOMMERCE_TWICE_APIKEY,
          "x-bank-key": process.env.ECOMMERCE_TWICE_BANKKEY
        },
        data: JSON.stringify(body)
      });

      // Update component metafield value
      await update_component_metafield_value(
        component.component_id,
        "twiceparts_ecommerce_is_published",
        "true"
      );

      console.log('TwiceParts Ecommerce update success:', response.data);

    } catch (error) {
      const error_log = JSON.stringify(error.response?.data?.message || error.response?.data?.success === false || error.response?.data?.results?.[0])
      console.error(`TwiceParts Ecommerce Error: ${error_log}`);
      throw new Error(`TwiceParts Ecommerce Error: ${error_log}`);
    }

  },
  delete_component: async function (job) {
    console.log('JOB: delete component Ecommerce', job.data)
    //Init
    const body = [];

    const component = await Component.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        component_id: job.data.component_id
      }
    });

    // Check
    if (!component) {
      console.log(
        "No component found. Cannot perform the requested operation."
      );
      throw new Error(
        "No component found. Cannot perform the requested operation."
      );
    }

    body.push({
      action: "blocked",
      id_product: component.label,
      id_seller: job.data.id_seller,
      api_token_hash: job.data.api_token_hash,
    });

    try {
      // Axios
      const response = await axios({
        url: `${process.env.ECOMMERCE_TWICE_URL}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ECOMMERCE_TWICE_APIKEY,
          "x-bank-key": process.env.ECOMMERCE_TWICE_BANKKEY
        },
        data: JSON.stringify(body)
      });

      // // Check response
      // if (response.data.ko) {
      //   if (response.data.ko.length > 0) {
      //     if (
      //       response.data.ko[0].sku &&
      //       response.data.ko[0].sku === component.label
      //     ) {
      //       if (
      //         response.data.ko[0].error !== "SKU already deleted" &&
      //         response.data.ko[0].error !== "SKU not valid"
      //       ) {
      //         throw new Error(
      //           `Error deleting component on TwiceParts Ecommerce. Cannot perform the requested operation. Response: ${JSON.stringify(response.data)}`
      //         );
      //       }
      //     } else {
      //       // No matching SKU
      //       throw new Error(
      //         `Error deleting component on TwiceParts Ecommerce. No matching SKU. Response: ${JSON.stringify(response.data)}`
      //       );
      //     }
      //   } else {
      //     // No errors in response
      //     throw new Error(
      //       `Error deleting component on TwiceParts Ecommerce. No error data in response. Response: ${JSON.stringify(response.data)}`
      //     );
      //   }
      // }

      // Update component metafield value
      await update_component_metafield_value(
        component.component_id,
        "twiceparts_ecommerce_is_published",
        "false"
      );
    } catch (error) {
      const error_log = JSON.stringify(error.response?.data?.message || error.response?.data?.success === false || error.response?.data?.results?.[0])
      console.error(`TwiceParts Ecommerce Error: ${error_log}`);
      throw new Error(`TwiceParts Ecommerce Error: ${error_log}`);
    }
  },
  // #endregion Component

  // #region Tyre
  create_tyre: async function (job) { },
  update_tyre: async function (job) { },
  delete_tyre: async function (job) { },
  // #endregion Tyre

  // #region Wheel
  create_wheel: async function (job) { },
  update_wheel: async function (job) { },
  delete_wheel: async function (job) { }
  // #endregion Wheel
};

async function update_component_metafield_value(component_id, key, value) {
  console.log("Updating component metafield value: ", {
    component_id,
    key,
    value
  });
  // Update metafield
  const component_metafield_value = await ComponentMetafieldValue.findOne({
    where: {
      component_id: component_id,
      "$metafield.entity$": "component",
      "$metafield.key$": key
    },
    include: [
      {
        model: Metafield,
        required: true
      }
    ]
  });

  if (component_metafield_value) {
    await ComponentMetafieldValue.update(
      {
        value: value
      },
      {
        where: {
          component_id: component_id,
          metafield_id: component_metafield_value.metafield_id
        }
      }
    );
    console.log("Component metafield value updated");
  } else {
    const metafield = await Metafield.findOne({
      where: {
        entity: "component",
        key: key
      }
    });

    if (!metafield) {
      throw new Error(
        "Metafield not found. Cannot perform the requested operation."
      );
    }

    await ComponentMetafieldValue.create({
      component_id: component_id,
      value: value,
      metafield_id: metafield.metafield_id
    });
    console.log("Component metafield value created");
  }
}

async function update_tyre_metafield_value(tyre_id, key, value) {
  // Update metafield
  const tyre_metafield_value = await TyreMetafieldValue.findOne({
    where: {
      tyre_id: tyre_id,
      "$metafield.entity$": "tyre",
      "$metafield.key$": key
    },
    include: [
      {
        model: Metafield,
        required: true
      }
    ]
  });

  if (tyre_metafield_value) {
    await tyre_metafield_value.update({
      value: value
    });
  } else {
    const metafield = await Metafield.findOne({
      where: {
        entity: "tyre",
        key: key
      }
    });

    if (!metafield) {
      throw new Error("Metafield not found");
    }

    await TyreMetafieldValue.create({
      tyre_id: tyre_id,
      value: value,
      metafield_id: metafield.metafield_id
    });
  }
}

async function update_wheel_metafield_value(wheel_id, key, value) {
  // Update metafield
  const wheel_metafield_value = await WheelMetafieldValue.findOne({
    where: {
      wheel_id: wheel_id,
      "$metafield.entity$": "wheel",
      "$metafield.key$": key
    },
    include: [
      {
        model: Metafield,
        required: true
      }
    ]
  });

  if (wheel_metafield_value) {
    await wheel_metafield_value.update({
      value: value
    });
  } else {
    const metafield = await Metafield.findOne({
      where: {
        entity: "wheel",
        key: key
      }
    });

    if (!metafield) {
      throw new Error("Metafield not found");
    }

    await WheelMetafieldValue.create({
      wheel_id: wheel_id,
      value: value,
      metafield_id: metafield.metafield_id
    });
  }
}
