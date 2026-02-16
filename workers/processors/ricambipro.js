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

// #region Utilities
// Parsers
const { union_parse, media_parse } = require("@utilities/helpers/parsers");
// #endregion Utilities

module.exports = {
  // #region Component
  create_component: async function (job) {
    // Init
    const body = [];

    const component = await Component.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        component_id: job.data.component_id,
        status: {
          [Op.notIn]: ["sold", "unprocessed", "discontinued", "lost"]
        },
        is_disassembled: true
      },
      include: [
        //
        // Component Media
        { model: ComponentMedia },

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
                key: ["ricambipro_publish", "ricambipro_price"]
              }
            }
          ]
        }
      ]
    });

    // Check
    if (!component) {
      throw new Error(
        "No component found. Cannot perform the requested operation."
      );
    }

    // Check ricambipro_publish
    const ricambipro_publish = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "ricambipro_publish"
    );

    if (!ricambipro_publish || ricambipro_publish.value !== "true") {
      throw new Error(
        "Component not for sale on RicambiPro. Cannot perform the requested operation."
      );
    }

    // Check ricambipro_price
    const ricambipro_price = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "ricambipro_price"
    );

    if (
      !ricambipro_price ||
      ricambipro_price.value === null ||
      ricambipro_price.value === "" ||
      parseFloat(ricambipro_price.value) === 0
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
    // END Feed

    body.push({
      quantity: 1,
      price: parseFloat(ricambipro_price.value),

      prototypeId: null,
      bundleId: null,

      images: images,

      year: 2001,
      cc: 1900,
      engineType: "Benzina",

      internalCode: component.component_id,

      manufacturerCode: null,
      alternativeCode: null,
      vehicleManufacturerCode: null,
      notes: null,
      marketplacesNotes: null,

      position: null,
      facebook: null,
      twitter: null,

      plate: null,
      chassis: null,
      engineCode: null,
      km: null,
      kw: null,

      online: true,

      meta: []
    });

    try {
      // Axios
      const response = await axios({
        url: `${process.env.RICAMBIPRO_URL}/warehouses/quickLoad.php`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "WWW-Authorization": job.data.token
        },
        data: JSON.stringify(body)
      });

      // Check response
      if (response.data.success !== true) {
        throw new Error(
          "Error creating component on RicambiPro. Cannot perform the requested operation."
        );
      }

      // Update component metafield value
      await update_component_metafield_value(
        component.component_id,
        "ricambipro_is_published",
        "true"
      );
    } catch (error) {
      return error;
    }
  },
  update_component: async function (job) {
    // Init
    const body = [];

    const component = await Component.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        component_id: job.data.component_id
      },
      include: [
        //
        // Component Media
        { model: ComponentMedia },

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
                key: ["ricambipro_publish", "ricambipro_price"]
              }
            }
          ]
        }
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
      ["sold", "unprocessed", "discontinued", "lost"].includes(component.status)
    ) {
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check is_disassembled
    if (!component.is_disassembled) {
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check archived_at
    if (component.archived_at !== null) {
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check ricambipro_publish
    const ricambipro_publish = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "ricambipro_publish"
    );

    if (!ricambipro_publish || ricambipro_publish.value !== "true") {
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }

    // Check ricambipro_price
    const ricambipro_price = component.component_metafield_values.find(
      (component_metafield_value) =>
        component_metafield_value.metafield.key === "ricambipro_price"
    );

    if (
      !ricambipro_price ||
      ricambipro_price.value === null ||
      ricambipro_price.value === "" ||
      parseFloat(ricambipro_price.value) === 0
    ) {
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
      await module.exports.delete_component(job);
      return {
        code: "DELETED"
      };
    }
    // END Feed

    body.push({
      price: parseFloat(ricambipro_price.value),

      prototypeId: null,
      bundleId: null,

      images: images,

      year: 2001,
      cc: 1900,
      engineType: "Benzina",

      internalCode: component.component_id,

      manufacturerCode: null,
      alternativeCode: null,
      vehicleManufacturerCode: null,
      notes: null,
      marketplacesNotes: null,

      position: null,
      facebook: null,
      twitter: null,

      plate: null,
      chassis: null,
      engineCode: null,
      km: null,
      kw: null,

      online: true,

      meta: []
    });

    try {
      // Axios
      const response = await axios({
        // TODO Check if our ID or their ID
        url: `${process.env.RICAMBIPRO_URL}/warehouses/edit.php?id=${component.component_id}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "WWW-Authorization": job.data.token
        },
        data: JSON.stringify(body)
      });

      // Check response
      if (response.data.ko) {
        throw new Error(
          "Error updating component on RicambiPro. Cannot perform the requested operation."
        );
      }

      // Update component metafield value
      await update_component_metafield_value(
        component.component_id,
        "ricambipro_is_published",
        "true"
      );
    } catch (error) {
      return error;
    }
  },
  delete_component: async function (job) {
    // Init
    const body = [];

    const component = await Component.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        component_id: job.data.component_id
      }
    });

    // Check
    if (!component) {
      throw new Error(
        "No component found. Cannot perform the requested operation."
      );
    }

    body.push({
      token: job.data.token,
      sku: component.component_id
    });

    try {
      // Axios
      const response = await axios({
        // TODO delete
        url: `${process.env.RICAMBIPRO_URL}/warehouses/movement.php?quantity=-1&productId=${component.component_id}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "WWW-Authorization": job.data.token
        },
        data: JSON.stringify(body)
      });

      // Check response
      if (response.data.success !== true) {
        throw new Error(
          "Error deleting component on RicambiPro. Cannot perform the requested operation."
        );
      }

      // Update component metafield value
      await update_component_metafield_value(
        component.component_id,
        "ricambipro_is_published",
        "false"
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  // #endregion Component

  // #region Tyre
  create_tyre: async function (job) {},
  update_tyre: async function (job) {},
  delete_tyre: async function (job) {},
  // #endregion Tyre

  // #region Wheel
  create_wheel: async function (job) {},
  update_wheel: async function (job) {},
  delete_wheel: async function (job) {}
  // #endregion Wheel
};

async function update_component_metafield_value(component_id, key, value) {
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
    await component_metafield_value.update({
      value: value
    });
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
