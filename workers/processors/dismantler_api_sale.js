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

// Enums
const { side_enums } = require("@databases/sequelize/enums");

// #region Utilities
// Parsers
const { union_parse, media_parse } = require("@utilities/helpers/parsers");
// #endregion Utilities

module.exports = {
  // #region Component
  delete_component: async function (job) {
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

    // Update component metafield value
    await update_component_metafield_value(
      component.component_id,
      "dismantler_api_sale_is_published",
      "false"
    );
  },
  // #endregion Component

  // #region Tyre
  delete_tyre: async function (job) {
    const tyre = await Tyre.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        tyre_id: job.data.tyre_id
      }
    });

    // Check
    if (!tyre) {
      throw new Error("No tyre found. Cannot perform the requested operation.");
    }

    // Update tyre metafield value
    await update_tyre_metafield_value(
      tyre.tyre_id,
      "dismantler_api_sale_is_published",
      "false"
    );
  },
  // #endregion Tyre

  // #region Wheel
  delete_wheel: async function (job) {
    const wheel = await Wheel.findOne({
      where: {
        dismantler_id: job.data.dismantler_id,
        wheel_id: job.data.wheel_id
      }
    });

    // Check
    if (!wheel) {
      throw new Error(
        "No wheel found. Cannot perform the requested operation."
      );
    }

    // Update wheel metafield value
    await update_wheel_metafield_value(
      wheel.wheel_id,
      "dismantler_api_sale_is_published",
      "false"
    );
  }
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
