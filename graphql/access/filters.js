// Moment
const moment = require("moment");
moment.locale("it");

// Sequelize
const { Op, Sequelize, EmptyResultError } = require("sequelize");

// Models
// Dismantler
const Dismantler = require("@databases/sequelize/models/dismantler/dismantler");
const DismantlerRecipient = require("@databases/sequelize/models/dismantler/dismantler_recipient");
// END Dismantler

// Access
const Access = require("@databases/sequelize/models/access/access");
const AccessPermission = require("@databases/sequelize/models/access/access_permission");
const AccessLog = require("@databases/sequelize/models/access/access_log");
// END Access

// Order
const Order = require("@databases/sequelize/models/order/order");
const OrderBuyer = require("@databases/sequelize/models/order/order_buyer");
const OrderShipping = require("@databases/sequelize/models/order/order_shipping");
const OrderBilling = require("@databases/sequelize/models/order/order_billing");

const OrderItem = require("@databases/sequelize/models/order/order_item");

// Reservation
const Reservation = require("@databases/sequelize/models/reservation/reservation");
const ReservationReservee = require("@databases/sequelize/models/reservation/reservation_reservee");
const ReservationShipping = require("@databases/sequelize/models/reservation/reservation_shipping");
const ReservationBilling = require("@databases/sequelize/models/reservation/reservation_billing");

const ReservationItem = require("@databases/sequelize/models/reservation/reservation_item");

// Component
const Component = require("@databases/sequelize/models/component/component");
const ComponentMedia = require("@databases/sequelize/models/component/component_media");
const ComponentTag = require("@databases/sequelize/models/component/component_tag");

const ComponentOrderItem = require("@databases/sequelize/models/component/component_order_item");
const ComponentReservationItem = require("@databases/sequelize/models/component/component_reservation_item");

const ComponentScannerCode = require("@databases/sequelize/models/component/component_scanner_code");

const ComponentFulltext = require("@databases/sequelize/models/component/component_fulltext");

// Vehicle
const Vehicle = require("@databases/sequelize/models/vehicle/vehicle");
const VehicleAcceptance = require("@databases/sequelize/models/vehicle/vehicle_acceptance");
const VehicleBody = require("@databases/sequelize/models/vehicle/vehicle_body");
const VehicleDrainage = require("@databases/sequelize/models/vehicle/vehicle_drainage");
const VehicleEngine = require("@databases/sequelize/models/vehicle/vehicle_engine");
const VehicleTransmission = require("@databases/sequelize/models/vehicle/vehicle_transmission");
const VehicleMedia = require("@databases/sequelize/models/vehicle/vehicle_media");

const VehicleOrderItem = require("@databases/sequelize/models/vehicle/vehicle_order_item");
const VehicleReservationItem = require("@databases/sequelize/models/vehicle/vehicle_reservation_item");

// Tyre
const Tyre = require("@databases/sequelize/models/tyre/tyre");
const TyreMedia = require("@databases/sequelize/models/tyre/tyre_media");

const TyreOrderItem = require("@databases/sequelize/models/tyre/tyre_order_item");
const TyreReservationItem = require("@databases/sequelize/models/tyre/tyre_reservation_item");

// Wheel
const Wheel = require("@databases/sequelize/models/wheel/wheel");
const WheelMedia = require("@databases/sequelize/models/wheel/wheel_media");

const WheelOrderItem = require("@databases/sequelize/models/wheel/wheel_order_item");
const WheelReservationItem = require("@databases/sequelize/models/wheel/wheel_reservation_item");

// Client
const Client = require("@databases/sequelize/models/client/client");
const ClientBilling = require("@databases/sequelize/models/client/client_billing");
const ClientAddress = require("@databases/sequelize/models/client/client_address");
// END Client

// Warehouse
const Warehouse = require("@databases/sequelize/models/warehouse/warehouse");
const WarehouseAddress = require("@databases/sequelize/models/warehouse/warehouse_address");
const WarehouseFloor = require("@databases/sequelize/models/warehouse/warehouse_floor");
const WarehouseLane = require("@databases/sequelize/models/warehouse/warehouse_lane");
const WarehouseRack = require("@databases/sequelize/models/warehouse/warehouse_rack");
const WarehouseShelf = require("@databases/sequelize/models/warehouse/warehouse_shelf");
const WarehouseBin = require("@databases/sequelize/models/warehouse/warehouse_bin");
// END Warehouse

// Deposit
const Deposit = require("@databases/sequelize/models/deposit/deposit");
const DepositAddress = require("@databases/sequelize/models/deposit/deposit_address");
const DepositLot = require("@databases/sequelize/models/deposit/deposit_lot");
const DepositLane = require("@databases/sequelize/models/deposit/deposit_lane");
const DepositPlacement = require("@databases/sequelize/models/deposit/deposit_placement");
const DepositFloor = require("@databases/sequelize/models/deposit/deposit_floor");
// END Deposit

// Group, Entry, Type, Brand, Model, Version
const Group = require("@databases/sequelize/models/group");
const Deck = require("@databases/sequelize/models/deck/deck");
const Entry = require("@databases/sequelize/models/entry");

const Type = require("@databases/sequelize/models/type");
const Brand = require("@databases/sequelize/models/brand");
const Model = require("@databases/sequelize/models/model");
const Version = require("@databases/sequelize/models/version");

const TypeEntryGroup = require("@databases/sequelize/models/type_entry_group");
const DeckEntry = require("@databases/sequelize/models/deck/deck_entry");

// ANIA
const AniaGroup = require("@databases/sequelize/models/ania/ania_group");
const AniaEntry = require("@databases/sequelize/models/ania/ania_entry");

const AniaType = require("@databases/sequelize/models/ania/ania_type");
const AniaBrand = require("@databases/sequelize/models/ania/ania_brand");
const AniaModel = require("@databases/sequelize/models/ania/ania_model");
const AniaVersion = require("@databases/sequelize/models/ania/ania_version");

// Dismantler
const DismantlerGroup = require("@databases/sequelize/models/dismantler/dismantler_group");
const DismantlerEntry = require("@databases/sequelize/models/dismantler/dismantler_entry");

const DismantlerType = require("@databases/sequelize/models/dismantler/dismantler_type");
const DismantlerBrand = require("@databases/sequelize/models/dismantler/dismantler_brand");
const DismantlerModel = require("@databases/sequelize/models/dismantler/dismantler_model");
const DismantlerVersion = require("@databases/sequelize/models/dismantler/dismantler_version");

// Dismantler ANIA
const DismantlerAniaEntry = require("@databases/sequelize/models/dismantler/dismantler_ania_entry");

const DismantlerAniaEntryAniaBrand = require("@databases/sequelize/models/dismantler/dismantler_ania_entry_ania_brand");
const DismantlerAniaEntryAniaModel = require("@databases/sequelize/models/dismantler/dismantler_ania_entry_ania_model");
const DismantlerAniaEntryAniaVersion = require("@databases/sequelize/models/dismantler/dismantler_ania_entry_ania_version");
// END Group, Entry, Type, Brand, Model, Version

// Manufacturer
const Manufacturer = require("@databases/sequelize/models/manufacturer");
const SystemManufacturer = require("@databases/sequelize/models/system/system_manufacturer");
const DismantlerManufacturer = require("@databases/sequelize/models/dismantler/dismantler_manufacturer");
// END Manufacturer

// OEM Code
const OEMCode = require("@databases/sequelize/models/oem_code/oem_code");
const OEMCodeVersion = require("@databases/sequelize/models/oem_code/oem_code_version");
// END Models

// Service
const Service = require("@databases/sequelize/models/service/service");

// Parsers
const { settings_parse } = require("@utilities/helpers/parsers");

// Filters
module.exports = {
  // Accesses
  accesses_filter: async function (
    { text, operation, order_by, per_page, page, is_active, all, archived_at },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [],
      order: [["access_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof is_active !== "undefined" &&
      is_active !== "null" &&
      is_active !== null &&
      is_active !== ""
    ) {
      filter.where.push({
        is_active: is_active,
      });
    }

    if (
      typeof all !== "undefined" &&
      all !== "null" &&
      all !== null &&
      all !== "" &&
      all === false
    ) {
      filter.where.push({
        access_id: {
          [Op.ne]: context.access.access_id,
        },
      });
    }

    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Access
            { access_id: { [Op[op]]: text[i] } },
            { name: { [Op[op]]: text[i] } },
            { surname: { [Op[op]]: text[i] } },
            { email: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const accessesIDs = await Access.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return accessesIDs;
  },

  // Accesses Logs
  accesses_logs_filter: async function (
    { text, operation, order_by, per_page, page, access_id, action, entity },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [],
      include: [
        {
          model: Access,
          required: true,
          where: { dismantler_id: context.dismantler.dismantler_id },
        },
      ],
      order: [["access_log_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof access_id !== "undefined" &&
      access_id !== "null" &&
      access_id !== null &&
      access_id !== ""
    ) {
      filter.where.push({
        access_id: access_id,
      });
    }

    if (
      typeof action !== "undefined" &&
      action !== "null" &&
      action !== null &&
      action !== ""
    ) {
      filter.where.push({
        action: action,
      });
    }

    if (
      typeof entity !== "undefined" &&
      entity !== "null" &&
      entity !== null &&
      entity !== ""
    ) {
      filter.where.push({
        entity: entity,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Access
            { "$access.access_id$": { [Op[op]]: text[i] } },
            { "$access.name$": { [Op[op]]: text[i] } },
            { "$access.surname$": { [Op[op]]: text[i] } },
            { "$access.email$": { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const accessesLogsIDs = await AccessLog.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return accessesLogsIDs;
  },

  // Orders
  orders_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,
      from,
      to,
      access_id,
      client_id,
      archived_at,
    },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Order Buyer
        { model: OrderBuyer },

        // Order Shipping
        { model: OrderShipping },

        // Order Billing
        { model: OrderBilling },
      ],
      order: [["order_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // access_id
    if (
      typeof access_id !== "undefined" &&
      access_id !== "null" &&
      access_id !== null &&
      access_id !== ""
    ) {
      filter.where.push({
        access_id: access_id,
      });
    }

    // client_id
    if (
      typeof client_id !== "undefined" &&
      client_id !== "null" &&
      client_id !== null &&
      client_id !== ""
    ) {
      filter.where.push({
        client_id: client_id,
      });
    }

    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        const params = [
          // Order
          { order_id: { [Op[op]]: text[i] } },
          { channel: { [Op[op]]: text[i] } },

          // Order Buyer
          { "$order_buyer.name$": { [Op[op]]: text[i] } },
          { "$order_buyer.surname$": { [Op[op]]: text[i] } },
          { "$order_buyer.ssn$": { [Op[op]]: text[i] } },
          { "$order_buyer.phone$": { [Op[op]]: text[i] } },
          { "$order_buyer.email$": { [Op[op]]: text[i] } },

          // Order Shipping
          { "$order_shipping.to$": { [Op[op]]: text[i] } },
          { "$order_shipping.address1$": { [Op[op]]: text[i] } },
          { "$order_shipping.address2$": { [Op[op]]: text[i] } },
          { "$order_shipping.city$": { [Op[op]]: text[i] } },
          { "$order_shipping.zip$": { [Op[op]]: text[i] } },
          { "$order_shipping.province$": { [Op[op]]: text[i] } },
          { "$order_shipping.country$": { [Op[op]]: text[i] } },
          { "$order_shipping.phone$": { [Op[op]]: text[i] } },
          { "$order_shipping.email$": { [Op[op]]: text[i] } },

          // Order Billing
          { "$order_billing.to$": { [Op[op]]: text[i] } },
          { "$order_billing.address1$": { [Op[op]]: text[i] } },
          { "$order_billing.address2$": { [Op[op]]: text[i] } },
          { "$order_billing.city$": { [Op[op]]: text[i] } },
          { "$order_billing.zip$": { [Op[op]]: text[i] } },
          { "$order_billing.province$": { [Op[op]]: text[i] } },
          { "$order_billing.country$": { [Op[op]]: text[i] } },
          { "$order_billing.phone$": { [Op[op]]: text[i] } },
          { "$order_billing.email$": { [Op[op]]: text[i] } },
          { "$order_billing.ssn$": { [Op[op]]: text[i] } },
          { "$order_billing.vat$": { [Op[op]]: text[i] } },
          { "$order_billing.sdi$": { [Op[op]]: text[i] } },
          { "$order_billing.pec$": { [Op[op]]: text[i] } },
        ];

        // Order Items
        const order_items = await OrderItem.findAll({
          attributes: ["order_id"],
          where: {
            [Op.or]: [
              // #region Component Order Item
              // Component
              {
                "$component_order_item.component.component_id$": {
                  [Op[op]]: text[i],
                },
              },
              {
                "$component_order_item.component.label$": { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.oem_code$": {
                  [Op[op]]: text[i],
                },
              },
              {
                "$component_order_item.component.constructor_code$": {
                  [Op[op]]: text[i],
                },
              },
              {
                "$component_order_item.component.manufacturer_code$": {
                  [Op[op]]: text[i],
                },
              },

              // Entry
              {
                "$component_order_item.component.entry.ania_entry.ania_entry$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.entry.ania_entry.original_ania_entry$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.entry.dismantler_entry.dismantler_entry$":
                  { [Op[op]]: text[i] },
              },

              //NOTE: Dismantler_ania_entry é bottom up

              // Version
              {
                "$component_order_item.component.version.ania_version.ania_version$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.version.dismantler_version.dismantler_version$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.version.model.ania_model.ania_model$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.version.model.dismantler_model.dismantler_model$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.version.model.brand.ania_brand.ania_brand$":
                  { [Op[op]]: text[i] },
              },
              {
                "$component_order_item.component.version.model.brand.dismantler_brand.dismantler_brand$":
                  { [Op[op]]: text[i] },
              },
              // #endregion Component Order Item

              // #region Vehicle Order Item
              { "$vehicle_order_item.vehicle.code$": { [Op[op]]: text[i] } },
              { "$vehicle_order_item.vehicle.plate$": { [Op[op]]: text[i] } },
              { "$vehicle_order_item.vehicle.vin$": { [Op[op]]: text[i] } },
              {
                "$vehicle_order_item.vehicle.vehicle_engine.code$": {
                  [Op[op]]: text[i],
                },
              },

              // Version
              {
                "$vehicle_order_item.vehicle.version.ania_version.ania_version$":
                  { [Op[op]]: text[i] },
              },
              {
                "$vehicle_order_item.vehicle.version.dismantler_version.dismantler_version$":
                  { [Op[op]]: text[i] },
              },
              {
                "$vehicle_order_item.vehicle.version.model.ania_model.ania_model$":
                  { [Op[op]]: text[i] },
              },
              {
                "$vehicle_order_item.vehicle.version.model.dismantler_model.dismantler_model$":
                  { [Op[op]]: text[i] },
              },
              {
                "$vehicle_order_item.vehicle.version.model.brand.ania_brand.ania_brand$":
                  { [Op[op]]: text[i] },
              },
              {
                "$vehicle_order_item.vehicle.version.model.brand.dismantler_brand.dismantler_brand$":
                  { [Op[op]]: text[i] },
              },
              // #endregion Vehicle Order Item

              // #region Tyre Order Item
              { "$tyre_order_item.tyre.label$": { [Op[op]]: text[i] } },
              { "$tyre_order_item.tyre.lot$": { [Op[op]]: text[i] } },
              { "$tyre_order_item.tyre.specification$": { [Op[op]]: text[i] } },
              { "$tyre_order_item.tyre.notes$": { [Op[op]]: text[i] } },
              // #endregion Tyre Order Item

              // #region Wheel Order Item
              { "$wheel_order_item.wheel.label$": { [Op[op]]: text[i] } },
              { "$wheel_order_item.wheel.lot$": { [Op[op]]: text[i] } },
              { "$wheel_order_item.wheel.notes$": { [Op[op]]: text[i] } },

              // Version
              {
                "$wheel_order_item.wheel.version.ania_version.ania_version$": {
                  [Op[op]]: text[i],
                },
              },
              {
                "$wheel_order_item.wheel.version.dismantler_version.dismantler_version$":
                  { [Op[op]]: text[i] },
              },
              {
                "$wheel_order_item.wheel.version.model.ania_model.ania_model$":
                  { [Op[op]]: text[i] },
              },
              {
                "$wheel_order_item.wheel.version.model.dismantler_model.dismantler_model$":
                  { [Op[op]]: text[i] },
              },
              {
                "$wheel_order_item.wheel.version.model.brand.ania_brand.ania_brand$":
                  { [Op[op]]: text[i] },
              },
              {
                "$wheel_order_item.wheel.version.model.brand.dismantler_brand.dismantler_brand$":
                  { [Op[op]]: text[i] },
              },
              // #endregion Wheel Order Item
            ],
          },
          include: [
            // Component Order Item
            {
              model: ComponentOrderItem,
              required: false,
              attributes: [],
              include: [
                {
                  model: Component,
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                  attributes: [],
                  include: [
                    // Entry
                    {
                      model: Entry,
                      required: false,
                      attributes: [],
                      include: [
                        {
                          model: AniaEntry,
                          required: false,
                          attributes: [],
                        },
                        {
                          model: DismantlerEntry,
                          where: {
                            dismantler_id: context.dismantler.dismantler_id,
                          },
                          required: false,
                          attributes: [],
                        },
                      ],
                    },

                    // Version
                    {
                      model: Version,
                      required: false,
                      attributes: [],
                      include: [
                        {
                          model: AniaVersion,
                          required: false,
                          attributes: [],
                        },
                        {
                          model: DismantlerVersion,
                          where: {
                            dismantler_id: context.dismantler.dismantler_id,
                          },
                          required: false,
                          attributes: [],
                        },
                        {
                          model: Model,
                          required: false,
                          attributes: [],
                          include: [
                            {
                              model: AniaModel,
                              required: false,
                              attributes: [],
                            },
                            {
                              model: DismantlerModel,
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                              attributes: [],
                            },
                            {
                              model: Brand,
                              required: false,
                              include: [
                                {
                                  model: AniaBrand,
                                  required: false,
                                  attributes: [],
                                },
                                {
                                  model: DismantlerBrand,
                                  where: {
                                    dismantler_id:
                                      context.dismantler.dismantler_id,
                                  },
                                  required: false,
                                  attributes: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Vehicle Order Item
            {
              model: VehicleOrderItem,
              required: false,
              attributes: [],
              include: [
                {
                  model: Vehicle,
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                  attributes: [],
                  include: [
                    // Vehicle Engine
                    {
                      model: VehicleEngine,
                      required: false,
                      attributes: [],
                    },

                    // Vehicle Version
                    {
                      model: Version,
                      required: false,
                      attributes: [],
                      include: [
                        {
                          model: AniaVersion,
                          required: false,
                          attributes: [],
                        },
                        {
                          model: DismantlerVersion,
                          where: {
                            dismantler_id: context.dismantler.dismantler_id,
                          },
                          required: false,
                          attributes: [],
                        },
                        {
                          model: Model,
                          required: false,
                          attributes: [],
                          include: [
                            {
                              model: AniaModel,
                              required: false,
                              attributes: [],
                            },
                            {
                              model: DismantlerModel,
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                              attributes: [],
                            },
                            {
                              model: Brand,
                              required: false,
                              attributes: [],
                              include: [
                                {
                                  model: AniaBrand,
                                  required: false,
                                  attributes: [],
                                },
                                {
                                  model: DismantlerBrand,
                                  where: {
                                    dismantler_id:
                                      context.dismantler.dismantler_id,
                                  },
                                  required: false,
                                  attributes: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Tyre Order Item
            {
              model: TyreOrderItem,
              required: false,
              attributes: [],
              include: [
                {
                  model: Tyre,
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                  attributes: [],
                },
              ],
            },

            // Wheel Order Item
            {
              model: WheelOrderItem,
              required: false,
              attributes: [],
              include: [
                {
                  model: Wheel,
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                  attributes: [],
                  include: [
                    // Wheel Version
                    {
                      model: Version,
                      required: false,
                      attributes: [],
                      include: [
                        {
                          model: AniaVersion,
                          required: false,
                          attributes: [],
                        },
                        {
                          model: DismantlerVersion,
                          where: {
                            dismantler_id: context.dismantler.dismantler_id,
                          },
                          required: false,
                          attributes: [],
                        },
                        {
                          model: Model,
                          required: false,
                          attributes: [],
                          include: [
                            {
                              model: AniaModel,
                              required: false,
                              attributes: [],
                            },
                            {
                              model: DismantlerModel,
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                              attributes: [],
                            },
                            {
                              model: Brand,
                              required: false,
                              attributes: [],
                              include: [
                                {
                                  model: AniaBrand,
                                  required: false,
                                  attributes: [],
                                },
                                {
                                  model: DismantlerBrand,
                                  where: {
                                    dismantler_id:
                                      context.dismantler.dismantler_id,
                                  },
                                  required: false,
                                  attributes: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });

        if (order_items.length > 0) {
          params.push({
            order_id: {
              [Op.in]: [...new Set(order_items.map((item) => item.order_id))],
            },
          });
        }

        // TODO search also on component scanner codes (but in fulltext, when ready)

        // Dismantler Ania Entry
        const dismantler_ania_entries = await DismantlerAniaEntry.findAll({
          attributes: ["entry_id"],
          where: {
            dismantler_id: context.dismantler.dismantler_id,
            entry: { [Op[op]]: text[i] },
          },
        });

        if (dismantler_ania_entries.length > 0) {
          const entry_order_items = await OrderItem.findAll({
            attributes: ["order_id"],
            where: {
              "$component_order_item.component.entry_id$": {
                [Op.in]: dismantler_ania_entries.map(
                  (dismantler_ania_entry) => dismantler_ania_entry.entry_id
                ),
              },
            },
            include: [
              {
                model: ComponentOrderItem,
                required: true,
                attributes: [],
                include: [
                  {
                    model: Component,
                    where: { dismantler_id: context.dismantler.dismantler_id },
                    required: true,
                    attributes: [],
                  },
                ],
              },
            ],
          });

          if (entry_order_items.length > 0) {
            params.push({
              order_id: {
                [Op.in]: [
                  ...new Set(entry_order_items.map((item) => item.order_id)),
                ],
              },
            });
          }
        }
        // END Dismantler Ania Entry

        filter.where.push({
          [Op.or]: [...params],
        });
      }
    }

    // Only from
    if (from && from !== "null" && from !== "") {
      filter.where.push({
        ordered_at: {
          [Op.gte]: moment(from).format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    }
    // Only to
    if (to && to !== "null" && to !== "") {
      filter.where.push({
        ordered_at: {
          [Op.lte]: moment(to).format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    }
    // Both from - to
    if (
      from &&
      from !== "null" &&
      from !== "" &&
      to &&
      to !== "null" &&
      to !== ""
    ) {
      filter.where.push({
        ordered_at: {
          [Op.between]: [
            moment(from).format("YYYY-MM-DD HH:mm:ss"),
            moment(to).format("YYYY-MM-DD HH:mm:ss"),
          ],
        },
      });
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const ordersIDs = await Order.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return ordersIDs;
  },

  // Reservations
  reservations_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,
      from,
      to,
      access_id,
      client_id,
      archived_at,
    },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Reservation Reservee
        { model: ReservationReservee },

        // Reservation Shipping
        { model: ReservationShipping },

        // Reservation Billing
        { model: ReservationBilling },
      ],
      order: [["reservation_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // access_id
    if (
      typeof access_id !== "undefined" &&
      access_id !== "null" &&
      access_id !== null &&
      access_id !== ""
    ) {
      filter.where.push({
        access_id: access_id,
      });
    }

    // client_id
    if (
      typeof client_id !== "undefined" &&
      client_id !== "null" &&
      client_id !== null &&
      client_id !== ""
    ) {
      filter.where.push({
        client_id: client_id,
      });
    }

    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Reservation
            { reservation_id: { [Op[op]]: text[i] } },

            // Reservation Reservee
            { "$reservation_reservee.name$": { [Op[op]]: text[i] } },
            { "$reservation_reservee.surname$": { [Op[op]]: text[i] } },
            { "$reservation_reservee.ssn$": { [Op[op]]: text[i] } },
            { "$reservation_reservee.phone$": { [Op[op]]: text[i] } },
            { "$reservation_reservee.email$": { [Op[op]]: text[i] } },

            // Reservation Shipping
            { "$reservation_shipping.to$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.address1$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.address2$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.city$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.zip$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.province$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.country$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.phone$": { [Op[op]]: text[i] } },
            { "$reservation_shipping.email$": { [Op[op]]: text[i] } },

            // Reservation Billing
            { "$reservation_billing.to$": { [Op[op]]: text[i] } },
            { "$reservation_billing.address1$": { [Op[op]]: text[i] } },
            { "$reservation_billing.address2$": { [Op[op]]: text[i] } },
            { "$reservation_billing.city$": { [Op[op]]: text[i] } },
            { "$reservation_billing.zip$": { [Op[op]]: text[i] } },
            { "$reservation_billing.province$": { [Op[op]]: text[i] } },
            { "$reservation_billing.country$": { [Op[op]]: text[i] } },
            { "$reservation_billing.phone$": { [Op[op]]: text[i] } },
            { "$reservation_billing.email$": { [Op[op]]: text[i] } },
            { "$reservation_billing.ssn$": { [Op[op]]: text[i] } },
            { "$reservation_billing.vat$": { [Op[op]]: text[i] } },
            { "$reservation_billing.sdi$": { [Op[op]]: text[i] } },
            { "$reservation_billing.pec$": { [Op[op]]: text[i] } },
          ],
        });
      }
    }

    // Only from
    if (from && from !== "null" && from !== "") {
      filter.where.push({
        reserved_at: {
          [Op.gte]: moment(from).format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    }
    // Only to
    if (to && to !== "null" && to !== "") {
      filter.where.push({
        reserved_at: {
          [Op.lte]: moment(to).format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    }
    // Both from - to
    if (
      from &&
      from !== "null" &&
      from !== "" &&
      to &&
      to !== "null" &&
      to !== ""
    ) {
      filter.where.push({
        reserved_at: {
          [Op.between]: [
            moment(from).format("YYYY-MM-DD HH:mm:ss"),
            moment(to).format("YYYY-MM-DD HH:mm:ss"),
          ],
        },
      });
    }
    // END Populating filter.where

    // Populating filter.order
    // Reservation by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const reservationsIDs = await Reservation.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return reservationsIDs;
  },

  // Components
  twice_components_filter: async function (
    { text, operation, order_by, per_page, page },
    context
  ) {
    // Dismantler settings
    const dismantler_settings = settings_parse(
      context.dismantler.dismantler_settings
    );

    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: { [Op.ne]: context.dismantler.dismantler_id },
        },

        // Check type
        {
          [Op.or]: [
            [
              { "$version.model.brand.type.type_type$": "ania_type" },
              {
                "$version.model.brand.type.ania_type.type_id$":
                  dismantler_settings.allowed_ania_type_ids,
              },
            ],
            [{ "$version.model.brand.type.type_type$": "dismantler_type" }],
          ],
        },
      ],
      include: [
        // Entry
        {
          model: Entry,
          include: [
            { model: AniaEntry, required: false },
            {
              model: DismantlerEntry,
              required: false,
            },
          ],
        },

        // Version
        {
          model: Version,
          include: [
            { model: AniaVersion, required: false },
            {
              model: DismantlerVersion,
              required: false,
            },
            {
              model: Model,
              include: [
                { model: AniaModel, required: false },
                {
                  model: DismantlerModel,
                  required: false,
                },
                {
                  model: Brand,
                  include: [
                    { model: AniaBrand, required: false },
                    {
                      model: DismantlerBrand,
                      required: false,
                    },
                    {
                      model: Type,
                      include: [
                        { model: AniaType, required: false },
                        {
                          model: DismantlerType,
                          required: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["component_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Component
            { component_id: { [Op[op]]: text[i] } },
            // { weight: { [Op[op]]: text[i] } },
            { label: { [Op[op]]: text[i] } },

            { oem_code: { [Op[op]]: text[i] } },
            { constructor_code: { [Op[op]]: text[i] } },
            { manufacturer_code: { [Op[op]]: text[i] } },
            { other_codes: { [Op[op]]: text[i] } },

            // { list_price: { [Op[op]]: text[i] } },
            // { counter_price: { [Op[op]]: text[i] } },

            { notes: { [Op[op]]: text[i] } },

            // Entry
            { "$entry.entry_id$": { [Op[op]]: text[i] } },
            { "$entry.ania_entry.ania_entry$": { [Op[op]]: text[i] } },
            { "$entry.ania_entry.ania_id$": { [Op[op]]: text[i] } },
            {
              "$entry.dismantler_entry.dismantler_entry$": {
                [Op[op]]: text[i],
              },
            },

            // Version
            { "$version.version_id$": { [Op[op]]: text[i] } },
            { "$version.ania_version.ania_version$": { [Op[op]]: text[i] } },
            {
              "$version.ania_version.ania_id$": { [Op[op]]: text[i] },
            },
            {
              "$version.dismantler_version.dismantler_version$": {
                [Op[op]]: text[i],
              },
            },

            // Model
            { "$version.model.model_id$": { [Op[op]]: text[i] } },
            {
              "$version.model.ania_model.ania_model$": { [Op[op]]: text[i] },
            },
            {
              "$version.model.ania_model.ania_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.dismantler_model.dismantler_model$": {
                [Op[op]]: text[i],
              },
            },

            // Brand
            {
              "$version.model.brand.brand_id$": { [Op[op]]: text[i] },
            },
            {
              "$version.model.brand.ania_brand.ania_brand$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.ania_brand.ania_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.dismantler_brand.dismantler_brand$": {
                [Op[op]]: text[i],
              },
            },

            // Type
            {
              "$version.model.brand.type.type_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.type.ania_type.ania_type$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.type.ania_type.ania_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.type.dismantler_type.dismantler_type$": {
                [Op[op]]: text[i],
              },
            },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const twiceComponentsIDs = await Component.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return twiceComponentsIDs;
  },

  // No fulltext
  components_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,

      is_disassembled,

      oem_code,
      constructor_code,
      manufacturer_code,

      condition,
      status,

      side,

      vehicle_id,

      type_id,
      brand_id,
      model_id,
      version_id,

      manufacturer_id,

      warehouse_id,
      warehouse_floor_id,
      warehouse_lane_id,
      warehouse_rack_id,
      warehouse_shelf_id,
      warehouse_bin_id,

      media,

      archived_at,
    },
    context
  ) {

    // Initializing filter
    let filter = {
      attributes: ["component_id"],
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Version
        {
          model: Version,
          attributes: ["version_id", "version_type"],
          include: [
            {
              model: AniaVersion,
              attributes: ["ania_version"],
              required: false,
            },
            {
              model: DismantlerVersion,
              attributes: ["dismantler_version"],
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
            {
              model: Model,
              attributes: ["model_id", "model_type"],
              include: [
                {
                  model: AniaModel,
                  attributes: ["ania_model"],
                  required: false,
                },
                {
                  model: DismantlerModel,
                  attributes: ["dismantler_model"],
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                },
                {
                  model: Brand,
                  attributes: ["brand_id", "brand_type", "type_id"],
                  include: [
                    {
                      model: AniaBrand,
                      attributes: ["ania_brand"],
                      required: false,
                    },
                    {
                      model: DismantlerBrand,
                      attributes: ["dismantler_brand"],
                      where: {
                        dismantler_id: context.dismantler.dismantler_id,
                      },
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["component_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.include
    if (text && text !== "null" && text !== null && text !== "") {
      filter.include.push(
        // Entry
        {
          model: Entry,
          attributes: ["entry_id", "entry_type"],
          include: [
            {
              model: AniaEntry,
              attributes: ["ania_entry"],
              required: false,
            },
            {
              model: DismantlerEntry,
              attributes: ["dismantler_entry"],
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
          ],
        },

        // Vehicle
        {
          model: Vehicle,
          attributes: ["vehicle_id", "code", "plate", "vin"],
          where: { dismantler_id: context.dismantler.dismantler_id },
          required: false,
          include: [
            { model: VehicleEngine, attributes: ["code"], required: false },
          ],
        }
      );
    }

    if (
      (typeof warehouse_bin_id !== "undefined" &&
        warehouse_bin_id !== "null" &&
        warehouse_bin_id !== null &&
        warehouse_bin_id !== "") ||
      (typeof warehouse_shelf_id !== "undefined" &&
        warehouse_shelf_id !== "null" &&
        warehouse_shelf_id !== null &&
        warehouse_shelf_id !== "") ||
      (typeof warehouse_rack_id !== "undefined" &&
        warehouse_rack_id !== "null" &&
        warehouse_rack_id !== null &&
        warehouse_rack_id !== "") ||
      (typeof warehouse_lane_id !== "undefined" &&
        warehouse_lane_id !== "null" &&
        warehouse_lane_id !== null &&
        warehouse_lane_id !== "") ||
      (typeof warehouse_floor_id !== "undefined" &&
        warehouse_floor_id !== "null" &&
        warehouse_floor_id !== null &&
        warehouse_floor_id !== "") ||
      (typeof warehouse_id !== "undefined" &&
        warehouse_id !== "null" &&
        warehouse_id !== null &&
        warehouse_id !== "")
    ) {
      filter.include.push(
        // Warehouse Bin
        {
          model: WarehouseBin,
          attributes: ["warehouse_bin_id"],
          required: false,
          include: [
            {
              model: WarehouseShelf,
              attributes: ["warehouse_shelf_id"],
              required: false,
              include: [
                {
                  model: WarehouseRack,
                  attributes: ["warehouse_rack_id"],
                  required: false,
                  include: [
                    {
                      model: WarehouseLane,
                      attributes: ["warehouse_lane_id"],
                      required: false,
                      include: [
                        {
                          model: WarehouseFloor,
                          attributes: ["warehouse_floor_id"],
                          required: false,
                          include: [
                            {
                              model: Warehouse,
                              attributes: ["warehouse_id"],
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }
      );
    }

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Is Disassembled
    if (
      typeof is_disassembled !== "undefined" &&
      is_disassembled !== "null" &&
      is_disassembled !== null &&
      is_disassembled !== ""
    ) {
      filter.where.push({
        is_disassembled: is_disassembled,
      });
    }

    // OEM Code
    if (
      typeof oem_code !== "undefined" &&
      oem_code !== "null" &&
      oem_code !== null &&
      oem_code !== ""
    ) {
      filter.where.push({
        oem_code: oem_code,
      });
    }

    // Constructor Code
    if (
      typeof constructor_code !== "undefined" &&
      constructor_code !== "null" &&
      constructor_code !== null &&
      constructor_code !== ""
    ) {
      filter.where.push({
        constructor_code: constructor_code,
      });
    }

    // Manufacturer Code
    if (
      typeof manufacturer_code !== "undefined" &&
      manufacturer_code !== "null" &&
      manufacturer_code !== null &&
      manufacturer_code !== ""
    ) {
      filter.where.push({
        manufacturer_code: manufacturer_code,
      });
    }

    // Condition
    if (
      typeof condition !== "undefined" &&
      condition !== "null" &&
      condition !== null &&
      condition !== ""
    ) {
      filter.where.push({
        condition: condition,
      });
    }

    // Status
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (!["sold", "reserved"].includes(status)) {
        filter.where.push({
          status: status,
        });
      } else {
        // Sold or Reserved
        if (status === "sold") {
          filter.include.push({
            model: ComponentOrderItem,
            attributes: ["order_item_id"],
            required: true,
            include: [
              {
                model: OrderItem,
                attributes: ["order_item_id"],
                required: true,
                include: [
                  {
                    model: Order,
                    attributes: ["order_id", "ordered_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        } else if (status === "reserved") {
          filter.include.push({
            model: ComponentReservationItem,
            attributes: ["reservation_item_id"],
            required: true,
            include: [
              {
                model: ReservationItem,
                attributes: ["reservation_item_id"],
                required: true,
                include: [
                  {
                    model: Reservation,
                    attributes: ["reservation_id", "reserved_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        }
      }
    }

    // Side
    if (
      typeof side !== "undefined" &&
      side !== "null" &&
      side !== null &&
      side !== ""
    ) {
      filter.where.push({
        side: side,
      });
    }

    // Vehicle
    if (
      typeof vehicle_id !== "undefined" &&
      vehicle_id !== "null" &&
      vehicle_id !== null &&
      vehicle_id !== ""
    ) {
      filter.where.push({
        vehicle_id: vehicle_id,
      });
    }

    // Manufacturer
    if (
      typeof manufacturer_id !== "undefined" &&
      manufacturer_id !== "null" &&
      manufacturer_id !== null &&
      manufacturer_id !== ""
    ) {
      filter.where.push({
        manufacturer_id: manufacturer_id,
      });
    }

    // Version
    if (
      typeof version_id !== "undefined" &&
      version_id !== "null" &&
      version_id !== null &&
      version_id !== ""
    ) {
      // OEM Codes
      const OEMCodes = await oem_codes_by_version(version_id);

      if (OEMCodes.length === 0) {
        filter.where.push({
          "$version.version_id$": version_id,
        });
      } else {
        filter.where.push({
          [Op.or]: [
            {
              "$version.version_id$": version_id,
            },
            {
              oem_code: OEMCodes,
            },
          ],
        });
      }
    } else {
      // No version set

      // Model
      if (
        typeof model_id !== "undefined" &&
        model_id !== "null" &&
        model_id !== null &&
        model_id !== ""
      ) {
        filter.where.push({
          "$version.model.model_id$": model_id,
        });
      }

      // Brand
      if (
        typeof brand_id !== "undefined" &&
        brand_id !== "null" &&
        brand_id !== null &&
        brand_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.brand_id$": brand_id,
        });
      }

      // Type
      if (
        typeof type_id !== "undefined" &&
        type_id !== "null" &&
        type_id !== null &&
        type_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.type_id$": type_id,
        });
      }
    }

    // Warehouse Bin
    if (
      typeof warehouse_bin_id !== "undefined" &&
      warehouse_bin_id !== "null" &&
      warehouse_bin_id !== null &&
      warehouse_bin_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_bin_id$": warehouse_bin_id,
      });
    }

    // Warehouse Shelf
    if (
      typeof warehouse_shelf_id !== "undefined" &&
      warehouse_shelf_id !== "null" &&
      warehouse_shelf_id !== null &&
      warehouse_shelf_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_shelf_id$":
          warehouse_shelf_id,
      });
    }

    // Warehouse Rack
    if (
      typeof warehouse_rack_id !== "undefined" &&
      warehouse_rack_id !== "null" &&
      warehouse_rack_id !== null &&
      warehouse_rack_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_rack_id$":
          warehouse_rack_id,
      });
    }

    // Warehouse Lane
    if (
      typeof warehouse_lane_id !== "undefined" &&
      warehouse_lane_id !== "null" &&
      warehouse_lane_id !== null &&
      warehouse_lane_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_lane_id$":
          warehouse_lane_id,
      });
    }

    // Warehouse Floor
    if (
      typeof warehouse_floor_id !== "undefined" &&
      warehouse_floor_id !== "null" &&
      warehouse_floor_id !== null &&
      warehouse_floor_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse_floor_id$":
          warehouse_floor_id,
      });
    }

    // Warehouse
    if (
      typeof warehouse_id !== "undefined" &&
      warehouse_id !== "null" &&
      warehouse_id !== null &&
      warehouse_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse_id$":
          warehouse_id,
      });
    }

    // Media
    if (
      typeof media !== "undefined" &&
      media !== "null" &&
      media !== null &&
      media !== ""
    ) {
      if (media === "images" || media === "no_images") {
        const where = [
          { media_type: "image" },
          { "$component.dismantler_id$": context.dismantler.dismantler_id },
        ];

        if (
          typeof archived_at !== "undefined" &&
          archived_at !== "null" &&
          archived_at !== null &&
          archived_at !== "" &&
          archived_at !== false
        ) {
          where.push({
            "$component.archived_at$": {
              [Op.ne]: null,
            },
          });
        } else {
          where.push({
            "$component.archived_at$": null,
          });
        }

        const components_with_media_ids = await ComponentMedia.findAll({
          where: where,
          include: [
            {
              model: Component,
              required: true,
            },
          ],
        });

        if (media === "images") {
          filter.where.push({
            component_id: {
              [Op.in]: [
                ...new Set(
                  components_with_media_ids.map((c) => c.component.component_id)
                ),
              ],
            },
          });
        } else {
          filter.where.push({
            component_id: {
              [Op.notIn]: [
                ...new Set(
                  components_with_media_ids.map((c) => c.component.component_id)
                ),
              ],
            },
          });
        }
      }
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring" || op === "startsWith") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      // Check if array
      for (let i = 0; i < text.length; i++) {
        // Params
        const params = [
          // Component
          { component_id: { [Op[op]]: text[i] } },
          { label: { [Op[op]]: text[i] } },

          { oem_code: { [Op[op]]: text[i] } }, // FIXME leading 0
          { constructor_code: { [Op[op]]: text[i] } }, // FIXME leading 0
          { manufacturer_code: { [Op[op]]: text[i] } }, // FIXME leading 0
          { other_codes: { [Op[op]]: text[i] } }, // FIXME leading 0

          // Entry
          { "$entry.ania_entry.ania_entry$": { [Op[op]]: text[i] } },
          {
            "$entry.dismantler_entry.dismantler_entry$": {
              [Op[op]]: text[i],
            },
          },

          // Vehicle
          { "$vehicle.code$": { [Op[op]]: text[i] } },
          { "$vehicle.plate$": { [Op[op]]: text[i] } },
          { "$vehicle.vin$": { [Op[op]]: text[i] } },
          { "$vehicle.vehicle_engine.code$": { [Op[op]]: text[i] } },
        ];

        // Version
        const version_ids = await Version.findAll({
          attributes: ["version_id", "version_type"],
          include: [
            {
              model: AniaVersion,
              attributes: ["ania_version"],
              required: false,
            },
            {
              model: DismantlerVersion,
              attributes: ["dismantler_version"],
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
            {
              model: Model,
              attributes: ["model_id", "model_type"],
              include: [
                {
                  model: AniaModel,
                  attributes: ["ania_model"],
                  required: false,
                },
                {
                  model: DismantlerModel,
                  attributes: ["dismantler_model"],
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                },
                {
                  model: Brand,
                  attributes: ["brand_id", "brand_type", "type_id"],
                  include: [
                    {
                      model: AniaBrand,
                      attributes: ["ania_brand"],
                      required: false,
                    },
                    {
                      model: DismantlerBrand,
                      attributes: ["dismantler_brand"],
                      where: {
                        dismantler_id: context.dismantler.dismantler_id,
                      },
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
          where: {
            [Op.or]: [
              // Version
              { "$ania_version.ania_version$": { [Op[op]]: text[i] } },
              {
                "$dismantler_version.dismantler_version$": {
                  [Op[op]]: text[i],
                },
              },

              // Model
              { "$model.ania_model.ania_model$": { [Op[op]]: text[i] } },
              {
                "$model.dismantler_model.dismantler_model$": {
                  [Op[op]]: text[i],
                },
              },

              // Brand
              {
                "$model.brand.ania_brand.ania_brand$": {
                  [Op[op]]: text[i],
                },
              },
              {
                "$model.brand.dismantler_brand.dismantler_brand$": {
                  [Op[op]]: text[i],
                },
              },
            ],
          },
        });
        if (version_ids.length > 0) {
          params.push({
            "$version.version_id$": {
              [Op.in]: version_ids.map((v) => v.version_id),
            },
          });
        }

        // Dismantler ANIA Entries
        const dismantler_ania_entries = await DismantlerAniaEntry.findAll({
          attributes: ["entry_id", "entry"],
          where: {
            dismantler_id: context.dismantler.dismantler_id,
            entry: { [Op[op]]: text[i] },
          },
        });
        if (dismantler_ania_entries.length > 0) {
          params.push({
            entry_id: {
              [Op.in]: dismantler_ania_entries.map((e) => e.entry_id),
            },
          });
        }

        // Scanner Codes
        const component_ids = await ComponentScannerCode.findAll({
          attributes: ["component_id"],
          where: {
            scanner_code: { [Op[op]]: text[i] },
          },
          include: [
            {
              model: Component,
              where: {
                dismantler_id: context.dismantler.dismantler_id,
              },
              required: true,
            },
          ],
        });
        if (component_ids.length > 0) {
          params.push({
            component_id: {
              [Op.in]: component_ids.map((c) => c.component_id),
            },
          });
        }

        // Dismantler ANIA Entries with text and then OR with other parameters

        filter.where.push({
          [Op.or]: [...params],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (["sold", "reserved"].includes(status)) {
        if (status === "sold") {
          order_by = "component_order_item.order_item.order.ordered_at-DESC";
        } else if (status === "reserved") {
          order_by =
            "component_reservation_item.reservation_item.reservation.reserved_at-DESC";
        }
      }
    }
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const componentsIDs = await Component.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return componentsIDs;
  },

  // Fulltext
  __components_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,

      is_disassembled,

      oem_code,
      constructor_code,
      manufacturer_code,

      condition,
      status,

      side,

      vehicle_id,

      type_id,
      brand_id,
      model_id,
      version_id,

      manufacturer_id,

      warehouse_id,
      warehouse_floor_id,
      warehouse_lane_id,
      warehouse_rack_id,
      warehouse_shelf_id,
      warehouse_bin_id,

      media,

      archived_at,
    },
    context
  ) {
    // Initializing filter
    let filter = {
      attributes: ["component_id"],
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [],
      order: [["component_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.include
    if (
      (typeof version_id !== "undefined" &&
        version_id !== "null" &&
        version_id !== null &&
        version_id !== "") ||
      (typeof brand_id !== "undefined" &&
        brand_id !== "null" &&
        brand_id !== null &&
        brand_id !== "") ||
      (typeof model_id !== "undefined" &&
        model_id !== "null" &&
        model_id !== null &&
        model_id !== "") ||
      (typeof type_id !== "undefined" &&
        type_id !== "null" &&
        type_id !== null &&
        type_id !== "")
    ) {
      filter.include.push(
        // Version
        {
          model: Version,
          attributes: ["version_id", "version_type"],
          include: [
            {
              model: AniaVersion,
              attributes: ["ania_version"],
              required: false,
            },
            {
              model: DismantlerVersion,
              attributes: ["dismantler_version"],
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
            {
              model: Model,
              attributes: ["model_id", "model_type"],
              include: [
                {
                  model: AniaModel,
                  attributes: ["ania_model"],
                  required: false,
                },
                {
                  model: DismantlerModel,
                  attributes: ["dismantler_model"],
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                },
                {
                  model: Brand,
                  attributes: ["brand_id", "brand_type", "type_id"],
                  include: [
                    {
                      model: AniaBrand,
                      attributes: ["ania_brand"],
                      required: false,
                    },
                    {
                      model: DismantlerBrand,
                      attributes: ["dismantler_brand"],
                      where: {
                        dismantler_id: context.dismantler.dismantler_id,
                      },
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        }
      );
    }

    if (
      (typeof warehouse_bin_id !== "undefined" &&
        warehouse_bin_id !== "null" &&
        warehouse_bin_id !== null &&
        warehouse_bin_id !== "") ||
      (typeof warehouse_shelf_id !== "undefined" &&
        warehouse_shelf_id !== "null" &&
        warehouse_shelf_id !== null &&
        warehouse_shelf_id !== "") ||
      (typeof warehouse_rack_id !== "undefined" &&
        warehouse_rack_id !== "null" &&
        warehouse_rack_id !== null &&
        warehouse_rack_id !== "") ||
      (typeof warehouse_lane_id !== "undefined" &&
        warehouse_lane_id !== "null" &&
        warehouse_lane_id !== null &&
        warehouse_lane_id !== "") ||
      (typeof warehouse_floor_id !== "undefined" &&
        warehouse_floor_id !== "null" &&
        warehouse_floor_id !== null &&
        warehouse_floor_id !== "") ||
      (typeof warehouse_id !== "undefined" &&
        warehouse_id !== "null" &&
        warehouse_id !== null &&
        warehouse_id !== "")
    ) {
      filter.include.push(
        // Warehouse Bin
        {
          model: WarehouseBin,
          attributes: ["warehouse_bin_id"],
          required: false,
          include: [
            {
              model: WarehouseShelf,
              attributes: ["warehouse_shelf_id"],
              required: false,
              include: [
                {
                  model: WarehouseRack,
                  attributes: ["warehouse_rack_id"],
                  required: false,
                  include: [
                    {
                      model: WarehouseLane,
                      attributes: ["warehouse_lane_id"],
                      required: false,
                      include: [
                        {
                          model: WarehouseFloor,
                          attributes: ["warehouse_floor_id"],
                          required: false,
                          include: [
                            {
                              model: Warehouse,
                              attributes: ["warehouse_id"],
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }
      );
    }

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Is Disassembled
    if (
      typeof is_disassembled !== "undefined" &&
      is_disassembled !== "null" &&
      is_disassembled !== null &&
      is_disassembled !== ""
    ) {
      filter.where.push({
        is_disassembled: is_disassembled,
      });
    }

    // OEM Code
    if (
      typeof oem_code !== "undefined" &&
      oem_code !== "null" &&
      oem_code !== null &&
      oem_code !== ""
    ) {
      filter.where.push({
        oem_code: oem_code,
      });
    }

    // Constructor Code
    if (
      typeof constructor_code !== "undefined" &&
      constructor_code !== "null" &&
      constructor_code !== null &&
      constructor_code !== ""
    ) {
      filter.where.push({
        constructor_code: constructor_code,
      });
    }

    // Manufacturer Code
    if (
      typeof manufacturer_code !== "undefined" &&
      manufacturer_code !== "null" &&
      manufacturer_code !== null &&
      manufacturer_code !== ""
    ) {
      filter.where.push({
        manufacturer_code: manufacturer_code,
      });
    }

    // Condition
    if (
      typeof condition !== "undefined" &&
      condition !== "null" &&
      condition !== null &&
      condition !== ""
    ) {
      filter.where.push({
        condition: condition,
      });
    }

    // Status
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (!["sold", "reserved"].includes(status)) {
        filter.where.push({
          status: status,
        });
      } else {
        // Sold or Reserved
        if (status === "sold") {
          filter.include.push({
            model: ComponentOrderItem,
            attributes: ["order_item_id"],
            required: true,
            include: [
              {
                model: OrderItem,
                attributes: ["order_item_id"],
                required: true,
                include: [
                  {
                    model: Order,
                    attributes: ["order_id", "ordered_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        } else if (status === "reserved") {
          filter.include.push({
            model: ComponentReservationItem,
            attributes: ["reservation_item_id"],
            required: true,
            include: [
              {
                model: ReservationItem,
                attributes: ["reservation_item_id"],
                required: true,
                include: [
                  {
                    model: Reservation,
                    attributes: ["reservation_id", "reserved_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        }
      }
    }

    // Side
    if (
      typeof side !== "undefined" &&
      side !== "null" &&
      side !== null &&
      side !== ""
    ) {
      filter.where.push({
        side: side,
      });
    }

    // Vehicle
    if (
      typeof vehicle_id !== "undefined" &&
      vehicle_id !== "null" &&
      vehicle_id !== null &&
      vehicle_id !== ""
    ) {
      filter.where.push({
        vehicle_id: vehicle_id,
      });
    }

    // Manufacturer
    if (
      typeof manufacturer_id !== "undefined" &&
      manufacturer_id !== "null" &&
      manufacturer_id !== null &&
      manufacturer_id !== ""
    ) {
      filter.where.push({
        manufacturer_id: manufacturer_id,
      });
    }

    // Version
    if (
      typeof version_id !== "undefined" &&
      version_id !== "null" &&
      version_id !== null &&
      version_id !== ""
    ) {
      // OEM Codes
      const OEMCodes = await oem_codes_by_version(version_id);

      if (OEMCodes.length === 0) {
        filter.where.push({
          "$version.version_id$": version_id,
        });
      } else {
        filter.where.push({
          [Op.or]: [
            {
              "$version.version_id$": version_id,
            },
            {
              oem_code: OEMCodes,
            },
          ],
        });
      }
    } else {
      // No version set

      // Model
      if (
        typeof model_id !== "undefined" &&
        model_id !== "null" &&
        model_id !== null &&
        model_id !== ""
      ) {
        filter.where.push({
          "$version.model.model_id$": model_id,
        });
      }

      // Brand
      if (
        typeof brand_id !== "undefined" &&
        brand_id !== "null" &&
        brand_id !== null &&
        brand_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.brand_id$": brand_id,
        });
      }

      // Type
      if (
        typeof type_id !== "undefined" &&
        type_id !== "null" &&
        type_id !== null &&
        type_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.type_id$": type_id,
        });
      }
    }

    // Warehouse Bin
    if (
      typeof warehouse_bin_id !== "undefined" &&
      warehouse_bin_id !== "null" &&
      warehouse_bin_id !== null &&
      warehouse_bin_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_bin_id$": warehouse_bin_id,
      });
    }

    // Warehouse Shelf
    if (
      typeof warehouse_shelf_id !== "undefined" &&
      warehouse_shelf_id !== "null" &&
      warehouse_shelf_id !== null &&
      warehouse_shelf_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_shelf_id$":
          warehouse_shelf_id,
      });
    }

    // Warehouse Rack
    if (
      typeof warehouse_rack_id !== "undefined" &&
      warehouse_rack_id !== "null" &&
      warehouse_rack_id !== null &&
      warehouse_rack_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_rack_id$":
          warehouse_rack_id,
      });
    }

    // Warehouse Lane
    if (
      typeof warehouse_lane_id !== "undefined" &&
      warehouse_lane_id !== "null" &&
      warehouse_lane_id !== null &&
      warehouse_lane_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_lane_id$":
          warehouse_lane_id,
      });
    }

    // Warehouse Floor
    if (
      typeof warehouse_floor_id !== "undefined" &&
      warehouse_floor_id !== "null" &&
      warehouse_floor_id !== null &&
      warehouse_floor_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse_floor_id$":
          warehouse_floor_id,
      });
    }

    // Warehouse
    if (
      typeof warehouse_id !== "undefined" &&
      warehouse_id !== "null" &&
      warehouse_id !== null &&
      warehouse_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse_id$":
          warehouse_id,
      });
    }

    // Media
    if (
      typeof media !== "undefined" &&
      media !== "null" &&
      media !== null &&
      media !== ""
    ) {
      if (media === "images" || media === "no_images") {
        const where = [
          { media_type: "image" },
          { "$component.dismantler_id$": context.dismantler.dismantler_id },
        ];

        if (
          typeof archived_at !== "undefined" &&
          archived_at !== "null" &&
          archived_at !== null &&
          archived_at !== "" &&
          archived_at !== false
        ) {
          where.push({
            "$component.archived_at$": {
              [Op.ne]: null,
            },
          });
        } else {
          where.push({
            "$component.archived_at$": null,
          });
        }

        const components_with_media_ids = await ComponentMedia.findAll({
          where: where,
          include: [
            {
              model: Component,
              required: true,
            },
          ],
        });

        if (media === "images") {
          filter.where.push({
            component_id: {
              [Op.in]: [
                ...new Set(
                  components_with_media_ids.map((c) => c.component.component_id)
                ),
              ],
            },
          });
        } else {
          filter.where.push({
            component_id: {
              [Op.notIn]: [
                ...new Set(
                  components_with_media_ids.map((c) => c.component.component_id)
                ),
              ],
            },
          });
        }
      }
    }

    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      // Split
      if (text.includes(" ")) {
        text = text.split(" ");
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      // Separate words
      const long_words = [];
      const short_words = [];
      for (let i = 0; i < text.length; i++) {
        if (text[i].length >= 3) {
          long_words.push(text[i].trim());
        } else {
          short_words.push(text[i].trim());
        }
      }

      // Init where
      const where = [];

      // Against
      let against = "";
      if (long_words.length > 0) {
        against += long_words.map((long_word) => `+${long_word}*`).join(" ");
      }

      if (against !== "") {
        where.push(
          Sequelize.literal(
            `MATCH(component_fulltext, version_fulltext, entry_fulltext, vehicle_fulltext, manufacturer_fulltext) AGAINST('${against}' IN BOOLEAN MODE)`
          )
        );
      }

      // Like
      if (short_words.length > 0) {
        for (let i = 0; i < short_words.length; i++) {
          where.push({
            [Op.or]: [
              { component_fulltext: { [Op.like]: `%${short_words[i]}%` } },
              { version_fulltext: { [Op.like]: `%${short_words[i]}%` } },
              { entry_fulltext: { [Op.like]: `%${short_words[i]}%` } },
              { vehicle_fulltext: { [Op.like]: `%${short_words[i]}%` } },
              { manufacturer_fulltext: { [Op.like]: `%${short_words[i]}%` } },
            ],
          });
        }
      }

      const fulltexts = await ComponentFulltext.findAll({
        attributes: ["component_id"],
        where: {
          [Op.and]: [...where],
        },
        include: [
          {
            model: Component,
            where: { dismantler_id: context.dismantler.dismantler_id },
            required: true,
          },
        ],
      });

      if (fulltexts && fulltexts.length > 0) {
        filter.where.push({
          component_id: {
            [Op.in]: fulltexts.map((fulltext) => fulltext.component_id),
          },
        });
      } else {
        // No fulltext
        filter.where.push({
          component_id: null,
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (["sold", "reserved"].includes(status)) {
        if (status === "sold") {
          order_by = "component_order_item.order_item.order.ordered_at-DESC";
        } else if (status === "reserved") {
          order_by =
            "component_reservation_item.reservation_item.reservation.reserved_at-DESC";
        }
      }
    }
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const componentsIDs = await Component.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return componentsIDs;
  },

  // Vehicles
  vehicles_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,

      type_id,
      brand_id,
      model_id,
      version_id,

      deposit_id,
      deposit_lot_id,
      deposit_lane_id,
      deposit_placement_id,
      deposit_floor_id,

      status,

      media,

      archived_at,
    },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Version
        {
          model: Version,
          attributes: ["version_id", "version_type"],
          include: [
            {
              model: AniaVersion,
              attributes: ["ania_version"],
              required: false,
            },
            {
              model: DismantlerVersion,
              attributes: ["dismantler_version"],
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
            {
              model: Model,
              attributes: ["model_id", "model_type"],
              include: [
                {
                  model: AniaModel,
                  attributes: ["ania_model"],
                  required: false,
                },
                {
                  model: DismantlerModel,
                  attributes: ["dismantler_model"],
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                },
                {
                  model: Brand,
                  attributes: ["brand_id", "brand_type", "type_id"],
                  include: [
                    {
                      model: AniaBrand,
                      attributes: ["ania_brand"],
                      required: false,
                    },
                    {
                      model: DismantlerBrand,
                      attributes: ["dismantler_brand"],
                      where: {
                        dismantler_id: context.dismantler.dismantler_id,
                      },
                      required: false,
                    },
                    // {
                    //   model: Type,
                    //   include: [
                    //     { model: AniaType, required: false },
                    //     {
                    //       model: DismantlerType,
                    //       where: {
                    //         dismantler_id: context.dismantler.dismantler_id,
                    //       },
                    //       required: false,
                    //     },
                    //   ],
                    // },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["vehicle_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.include
    if (text && text !== "null" && text !== null && text !== "") {
      filter.include.push(
        // Vehicle Acceptance
        { model: VehicleAcceptance },

        // Vehicle Drainage
        { model: VehicleDrainage },

        // Vehicle Body
        { model: VehicleBody },

        // Vehicle Engine
        { model: VehicleEngine },

        // Vehicle Transmission
        { model: VehicleTransmission }
      );
    }

    if (
      (typeof deposit_floor_id !== "undefined" &&
        deposit_floor_id !== "null" &&
        deposit_floor_id !== null &&
        deposit_floor_id !== "") ||
      (typeof deposit_placement_id !== "undefined" &&
        deposit_placement_id !== "null" &&
        deposit_placement_id !== null &&
        deposit_placement_id !== "") ||
      (typeof deposit_lane_id !== "undefined" &&
        deposit_lane_id !== "null" &&
        deposit_lane_id !== null &&
        deposit_lane_id !== "") ||
      (typeof deposit_lot_id !== "undefined" &&
        deposit_lot_id !== "null" &&
        deposit_lot_id !== null &&
        deposit_lot_id !== "") ||
      (typeof deposit_id !== "undefined" &&
        deposit_id !== "null" &&
        deposit_id !== null &&
        deposit_id !== "")
    ) {
      filter.include.push(
        // Deposit Floor
        {
          model: DepositFloor,
          required: false,
          include: [
            {
              model: DepositPlacement,
              required: false,
              include: [
                {
                  model: DepositLane,
                  required: false,
                  include: [
                    {
                      model: DepositLot,
                      required: false,
                      include: [
                        {
                          model: Deposit,
                          where: {
                            dismantler_id: context.dismantler.dismantler_id,
                          },
                          required: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }
      );
    }

    if (
      order_by &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      const related_models = {
        vehicle_acceptance: VehicleAcceptance,
        vehicle_drainage: VehicleDrainage,
      };

      Object.keys(related_models).forEach((key) => {
        if (order_by.includes(key)) {
          const included = filter.include.find((include) => {
            return include.model === related_models[key];
          });

          if (!included) {
            filter.include.push({ model: related_models[key] });
          }
        }
      });
    }

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Status
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (!["sold", "reserved"].includes(status)) {
        filter.where.push({
          status: status,
        });
      } else {
        // Sold or Reserved
        if (status === "sold") {
          filter.include.push({
            model: VehicleOrderItem,
            attributes: ["order_item_id"],
            required: true,
            include: [
              {
                model: OrderItem,
                attributes: ["order_item_id"],
                required: true,
                include: [
                  {
                    model: Order,
                    attributes: ["order_id", "ordered_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        } else if (status === "reserved") {
          filter.include.push({
            model: VehicleReservationItem,
            attributes: ["reservation_item_id"],
            required: true,
            include: [
              {
                model: ReservationItem,
                attributes: ["reservation_item_id"],
                required: true,
                include: [
                  {
                    model: Reservation,
                    attributes: ["reservation_id", "reserved_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        }
      }
    }

    // Version
    if (
      typeof version_id !== "undefined" &&
      version_id !== "null" &&
      version_id !== null &&
      version_id !== ""
    ) {
      filter.where.push({
        "$version.version_id$": version_id,
      });
    } else {
      if (
        typeof model_id !== "undefined" &&
        model_id !== "null" &&
        model_id !== null &&
        model_id !== ""
      ) {
        filter.where.push({
          "$version.model.model_id$": model_id,
        });
      }

      if (
        typeof brand_id !== "undefined" &&
        brand_id !== "null" &&
        brand_id !== null &&
        brand_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.brand_id$": brand_id,
        });
      }

      if (
        typeof type_id !== "undefined" &&
        type_id !== "null" &&
        type_id !== null &&
        type_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.type_id$": type_id,
        });
      }
    }

    // Deposit Floor
    if (
      typeof deposit_floor_id !== "undefined" &&
      deposit_floor_id !== "null" &&
      deposit_floor_id !== null &&
      deposit_floor_id !== ""
    ) {
      filter.where.push({
        "$deposit_floor.deposit_floor_id$": deposit_floor_id,
      });
    }

    // Deposit Placement
    if (
      typeof deposit_placement_id !== "undefined" &&
      deposit_placement_id !== "null" &&
      deposit_placement_id !== null &&
      deposit_placement_id !== ""
    ) {
      filter.where.push({
        "$deposit_floor.deposit_placement.deposit_placement_id$":
          deposit_placement_id,
      });
    }

    // Deposit Lane
    if (
      typeof deposit_lane_id !== "undefined" &&
      deposit_lane_id !== "null" &&
      deposit_lane_id !== null &&
      deposit_lane_id !== ""
    ) {
      filter.where.push({
        "$deposit_floor.deposit_placement.deposit_lane.deposit_lane_id$":
          deposit_lane_id,
      });
    }

    // Deposit Lot
    if (
      typeof deposit_lot_id !== "undefined" &&
      deposit_lot_id !== "null" &&
      deposit_lot_id !== null &&
      deposit_lot_id !== ""
    ) {
      filter.where.push({
        "$deposit_floor.deposit_placement.deposit_lane.deposit_lot.deposit_lot_id$":
          deposit_lot_id,
      });
    }

    // Deposit
    if (
      typeof deposit_id !== "undefined" &&
      deposit_id !== "null" &&
      deposit_id !== null &&
      deposit_id !== ""
    ) {
      filter.where.push({
        "$deposit_floor.deposit_placement.deposit_lane.deposit_lot.deposit.deposit_id$":
          deposit_id,
      });
    }

    // Media
    if (
      typeof media !== "undefined" &&
      media !== "null" &&
      media !== null &&
      media !== ""
    ) {
      if (media === "images" || media === "no_images") {
        const where = [
          { media_type: "image" },
          { "$vehicle.dismantler_id$": context.dismantler.dismantler_id },
        ];

        if (
          typeof archived_at !== "undefined" &&
          archived_at !== "null" &&
          archived_at !== null &&
          archived_at !== "" &&
          archived_at !== false
        ) {
          where.push({
            "$vehicle.archived_at$": {
              [Op.ne]: null,
            },
          });
        } else {
          where.push({
            "$vehicle.archived_at$": null,
          });
        }

        const vehicles_with_media_ids = await VehicleMedia.findAll({
          where: where,
          include: [
            {
              model: Vehicle,
              required: true,
            },
          ],
        });

        if (media === "images") {
          filter.where.push({
            vehicle_id: {
              [Op.in]: [
                ...new Set(
                  vehicles_with_media_ids.map((c) => c.vehicle.vehicle_id)
                ),
              ],
            },
          });
        } else {
          filter.where.push({
            vehicle_id: {
              [Op.notIn]: [
                ...new Set(
                  vehicles_with_media_ids.map((c) => c.vehicle.vehicle_id)
                ),
              ],
            },
          });
        }
      }
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }

    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring" || op === "startsWith") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        // Params
        const params = [
          // Vehicle
          { vehicle_id: { [Op[op]]: text[i] } },
          { code: { [Op[op]]: text[i] } },
          { plate: { [Op[op]]: text[i] } },
          { vin: { [Op[op]]: text[i] } },
          { km: { [Op[op]]: text[i] } },
          { keys: { [Op[op]]: text[i] } },

          // Vehicle Acceptance
          { "$vehicle_acceptance.accepted_at$": { [Op[op]]: text[i] } },

          // Vehicle Drainage
          { "$vehicle_drainage.drained_at$": { [Op[op]]: text[i] } },

          // Vehicle Body
          { "$vehicle_body.color$": { [Op[op]]: text } },
          { "$vehicle_body.color_code$": { [Op[op]]: text[i] } },
          { "$vehicle_body.finish$": { [Op[op]]: text[i] } },

          // Vehicle Engine
          { "$vehicle_engine.code$": { [Op[op]]: text[i] } },
          { "$vehicle_engine.kw$": { [Op[op]]: text[i] } },
          { "$vehicle_engine.hp$": { [Op[op]]: text[i] } },
          { "$vehicle_engine.displacement$": { [Op[op]]: text[i] } },
          { "$vehicle_engine.cylinders$": { [Op[op]]: text[i] } },
          { "$vehicle_engine.valves$": { [Op[op]]: text[i] } },

          // Vehicle Transmission
          { "$vehicle_transmission.code$": { [Op[op]]: text[i] } },
          { "$vehicle_transmission.type$": { [Op[op]]: text[i] } },
          { "$vehicle_transmission.gears$": { [Op[op]]: text[i] } },
        ];

        // Version
        const version_ids = await Version.findAll({
          attributes: ["version_id", "version_type"],
          include: [
            {
              model: AniaVersion,
              attributes: ["ania_version"],
              required: false,
            },
            {
              model: DismantlerVersion,
              attributes: ["dismantler_version"],
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
            {
              model: Model,
              attributes: ["model_id", "model_type"],
              include: [
                {
                  model: AniaModel,
                  attributes: ["ania_model"],
                  required: false,
                },
                {
                  model: DismantlerModel,
                  attributes: ["dismantler_model"],
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                },
                {
                  model: Brand,
                  attributes: ["brand_id", "brand_type", "type_id"],
                  include: [
                    {
                      model: AniaBrand,
                      attributes: ["ania_brand"],
                      required: false,
                    },
                    {
                      model: DismantlerBrand,
                      attributes: ["dismantler_brand"],
                      where: {
                        dismantler_id: context.dismantler.dismantler_id,
                      },
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
          where: {
            [Op.or]: [
              // Version
              { "$ania_version.ania_version$": { [Op[op]]: text[i] } },
              {
                "$dismantler_version.dismantler_version$": {
                  [Op[op]]: text[i],
                },
              },

              // Model
              { "$model.ania_model.ania_model$": { [Op[op]]: text[i] } },
              {
                "$model.dismantler_model.dismantler_model$": {
                  [Op[op]]: text[i],
                },
              },

              // Brand
              {
                "$model.brand.ania_brand.ania_brand$": {
                  [Op[op]]: text[i],
                },
              },
              {
                "$model.brand.dismantler_brand.dismantler_brand$": {
                  [Op[op]]: text[i],
                },
              },
            ],
          },
        });
        if (version_ids.length > 0) {
          params.push({
            "$version.version_id$": {
              [Op.in]: version_ids.map((v) => v.version_id),
            },
          });
        }

        filter.where.push({
          [Op.or]: [...params],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (["sold", "reserved"].includes(status)) {
        if (status === "sold") {
          order_by = "vehicle_order_item.order_item.order.ordered_at-DESC";
        } else if (status === "reserved") {
          order_by =
            "vehicle_reservation_item.reservation_item.reservation.reserved_at-DESC";
        }
      }
    }
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const vehiclesIDs = await Vehicle.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return vehiclesIDs;
  },

  // Tyres
  tyres_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,

      status,
      season,

      manufacturer_id,

      warehouse_id,
      warehouse_floor_id,
      warehouse_lane_id,
      warehouse_rack_id,
      warehouse_shelf_id,
      warehouse_bin_id,

      media,

      archived_at,
    },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Manufacturer
        {
          model: Manufacturer,
          include: [
            {
              model: SystemManufacturer,
              required: false,
            },
            {
              model: DismantlerManufacturer,
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
          ],
        },

        // Warehouse Bin
        {
          model: WarehouseBin,
          required: false,
          include: [
            {
              model: WarehouseShelf,
              required: false,
              include: [
                {
                  model: WarehouseRack,
                  required: false,
                  include: [
                    {
                      model: WarehouseLane,
                      required: false,
                      include: [
                        {
                          model: WarehouseFloor,
                          required: false,
                          include: [
                            {
                              model: Warehouse,
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["tyre_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Status
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (!["sold", "reserved"].includes(status)) {
        filter.where.push({
          status: status,
        });
      } else {
        // Sold or Reserved
        if (status === "sold") {
          filter.include.push({
            model: TyreOrderItem,
            attributes: ["order_item_id"],
            required: true,
            include: [
              {
                model: OrderItem,
                attributes: ["order_item_id"],
                required: true,
                include: [
                  {
                    model: Order,
                    attributes: ["order_id", "ordered_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        } else if (status === "reserved") {
          filter.include.push({
            model: TyreReservationItem,
            attributes: ["reservation_item_id"],
            required: true,
            include: [
              {
                model: ReservationItem,
                attributes: ["reservation_item_id"],
                required: true,
                include: [
                  {
                    model: Reservation,
                    attributes: ["reservation_id", "reserved_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        }
      }
    }

    // Season
    if (
      typeof season !== "undefined" &&
      season !== "null" &&
      season !== null &&
      season !== ""
    ) {
      filter.where.push({
        season: season,
      });
    }

    // Manufacturer
    if (
      typeof manufacturer_id !== "undefined" &&
      manufacturer_id !== "null" &&
      manufacturer_id !== null &&
      manufacturer_id !== ""
    ) {
      filter.where.push({
        "$manufacturer.manufacturer_id$": manufacturer_id,
      });
    }

    // Warehouse Bin
    if (
      typeof warehouse_bin_id !== "undefined" &&
      warehouse_bin_id !== "null" &&
      warehouse_bin_id !== null &&
      warehouse_bin_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_bin_id$": warehouse_bin_id,
      });
    }

    // Warehouse Shelf
    if (
      typeof warehouse_shelf_id !== "undefined" &&
      warehouse_shelf_id !== "null" &&
      warehouse_shelf_id !== null &&
      warehouse_shelf_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_shelf_id$":
          warehouse_shelf_id,
      });
    }

    // Warehouse Rack
    if (
      typeof warehouse_rack_id !== "undefined" &&
      warehouse_rack_id !== "null" &&
      warehouse_rack_id !== null &&
      warehouse_rack_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_rack_id$":
          warehouse_rack_id,
      });
    }

    // Warehouse Lane
    if (
      typeof warehouse_lane_id !== "undefined" &&
      warehouse_lane_id !== "null" &&
      warehouse_lane_id !== null &&
      warehouse_lane_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_lane_id$":
          warehouse_lane_id,
      });
    }

    // Warehouse Floor
    if (
      typeof warehouse_floor_id !== "undefined" &&
      warehouse_floor_id !== "null" &&
      warehouse_floor_id !== null &&
      warehouse_floor_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse_floor_id$":
          warehouse_floor_id,
      });
    }

    // Warehouse
    if (
      typeof warehouse_id !== "undefined" &&
      warehouse_id !== "null" &&
      warehouse_id !== null &&
      warehouse_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse_id$":
          warehouse_id,
      });
    }

    // Media
    if (
      typeof media !== "undefined" &&
      media !== "null" &&
      media !== null &&
      media !== ""
    ) {
      if (media === "images" || media === "no_images") {
        const where = [
          { media_type: "image" },
          { "$tyre.dismantler_id$": context.dismantler.dismantler_id },
        ];

        if (
          typeof archived_at !== "undefined" &&
          archived_at !== "null" &&
          archived_at !== null &&
          archived_at !== "" &&
          archived_at !== false
        ) {
          where.push({
            "$tyre.archived_at$": {
              [Op.ne]: null,
            },
          });
        } else {
          where.push({
            "$tyre.archived_at$": null,
          });
        }

        const tyres_with_media_ids = await TyreMedia.findAll({
          where: where,
          include: [
            {
              model: Tyre,
              required: true,
            },
          ],
        });

        if (media === "images") {
          filter.where.push({
            tyre_id: {
              [Op.in]: [
                ...new Set(tyres_with_media_ids.map((c) => c.tyre.tyre_id)),
              ],
            },
          });
        } else {
          filter.where.push({
            tyre_id: {
              [Op.notIn]: [
                ...new Set(tyres_with_media_ids.map((c) => c.tyre.tyre_id)),
              ],
            },
          });
        }
      }
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Tyre
            { tyre_id: { [Op[op]]: text[i] } },

            { label: { [Op[op]]: text[i] } },
            { lot: { [Op[op]]: text[i] } },

            { specification: { [Op[op]]: text[i] } },

            { notes: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (["sold", "reserved"].includes(status)) {
        if (status === "sold") {
          order_by = "tyre_order_item.order_item.order.ordered_at-DESC";
        } else if (status === "reserved") {
          order_by =
            "tyre_reservation_item.reservation_item.reservation.reserved_at-DESC";
        }
      }
    }
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const tyresIDs = await Tyre.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return tyresIDs;
  },

  // Wheels
  wheels_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,

      status,

      material,
      finish,

      type_id,
      brand_id,
      model_id,
      version_id,

      manufacturer_id,

      warehouse_id,
      warehouse_floor_id,
      warehouse_lane_id,
      warehouse_rack_id,
      warehouse_shelf_id,
      warehouse_bin_id,

      media,

      archived_at,
    },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Version
        {
          model: Version,
          include: [
            { model: AniaVersion, required: false },
            {
              model: DismantlerVersion,
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
            {
              model: Model,
              include: [
                { model: AniaModel, required: false },
                {
                  model: DismantlerModel,
                  where: { dismantler_id: context.dismantler.dismantler_id },
                  required: false,
                },
                {
                  model: Brand,
                  include: [
                    { model: AniaBrand, required: false },
                    {
                      model: DismantlerBrand,
                      where: {
                        dismantler_id: context.dismantler.dismantler_id,
                      },
                      required: false,
                    },
                    {
                      model: Type,
                      include: [
                        { model: AniaType, required: false },
                        {
                          model: DismantlerType,
                          where: {
                            dismantler_id: context.dismantler.dismantler_id,
                          },
                          required: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // Manufacturer
        {
          model: Manufacturer,
          include: [
            {
              model: SystemManufacturer,
              required: false,
            },
            {
              model: DismantlerManufacturer,
              where: { dismantler_id: context.dismantler.dismantler_id },
              required: false,
            },
          ],
        },

        // Warehouse Bin
        {
          model: WarehouseBin,
          required: false,
          include: [
            {
              model: WarehouseShelf,
              required: false,
              include: [
                {
                  model: WarehouseRack,
                  required: false,
                  include: [
                    {
                      model: WarehouseLane,
                      required: false,
                      include: [
                        {
                          model: WarehouseFloor,
                          required: false,
                          include: [
                            {
                              model: Warehouse,
                              where: {
                                dismantler_id: context.dismantler.dismantler_id,
                              },
                              required: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["wheel_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Status
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (!["sold", "reserved"].includes(status)) {
        filter.where.push({
          status: status,
        });
      } else {
        // Sold or Reserved
        if (status === "sold") {
          filter.include.push({
            model: WheelOrderItem,
            attributes: ["order_item_id"],
            required: true,
            include: [
              {
                model: OrderItem,
                attributes: ["order_item_id"],
                required: true,
                include: [
                  {
                    model: Order,
                    attributes: ["order_id", "ordered_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        } else if (status === "reserved") {
          filter.include.push({
            model: WheelReservationItem,
            attributes: ["reservation_item_id"],
            required: true,
            include: [
              {
                model: ReservationItem,
                attributes: ["reservation_item_id"],
                required: true,
                include: [
                  {
                    model: Reservation,
                    attributes: ["reservation_id", "reserved_at"],
                    required: true,
                  },
                ],
              },
            ],
          });
        }
      }
    }

    // Material
    if (
      typeof material !== "undefined" &&
      material !== "null" &&
      material !== null &&
      material !== ""
    ) {
      filter.where.push({
        material: material,
      });
    }

    // Finish
    if (
      typeof finish !== "undefined" &&
      finish !== "null" &&
      finish !== null &&
      finish !== ""
    ) {
      filter.where.push({
        finish: finish,
      });
    }

    // Manufacturer
    if (
      typeof manufacturer_id !== "undefined" &&
      manufacturer_id !== "null" &&
      manufacturer_id !== null &&
      manufacturer_id !== ""
    ) {
      filter.where.push({
        "$manufacturer.manufacturer_id$": manufacturer_id,
      });
    }

    // Version
    if (
      typeof version_id !== "undefined" &&
      version_id !== "null" &&
      version_id !== null &&
      version_id !== ""
    ) {
      filter.where.push({
        "$version.version_id$": version_id,
      });
    } else {
      // No version set

      // Model
      if (
        typeof model_id !== "undefined" &&
        model_id !== "null" &&
        model_id !== null &&
        model_id !== ""
      ) {
        filter.where.push({
          "$version.model.model_id$": model_id,
        });
      }

      // Brand
      if (
        typeof brand_id !== "undefined" &&
        brand_id !== "null" &&
        brand_id !== null &&
        brand_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.brand_id$": brand_id,
        });
      }

      // Type
      if (
        typeof type_id !== "undefined" &&
        type_id !== "null" &&
        type_id !== null &&
        type_id !== ""
      ) {
        filter.where.push({
          "$version.model.brand.type.type_id$": type_id,
        });
      }
    }

    // Warehouse Bin
    if (
      typeof warehouse_bin_id !== "undefined" &&
      warehouse_bin_id !== "null" &&
      warehouse_bin_id !== null &&
      warehouse_bin_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_bin_id$": warehouse_bin_id,
      });
    }

    // Warehouse Shelf
    if (
      typeof warehouse_shelf_id !== "undefined" &&
      warehouse_shelf_id !== "null" &&
      warehouse_shelf_id !== null &&
      warehouse_shelf_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_shelf_id$":
          warehouse_shelf_id,
      });
    }

    // Warehouse Rack
    if (
      typeof warehouse_rack_id !== "undefined" &&
      warehouse_rack_id !== "null" &&
      warehouse_rack_id !== null &&
      warehouse_rack_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_rack_id$":
          warehouse_rack_id,
      });
    }

    // Warehouse Lane
    if (
      typeof warehouse_lane_id !== "undefined" &&
      warehouse_lane_id !== "null" &&
      warehouse_lane_id !== null &&
      warehouse_lane_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_lane_id$":
          warehouse_lane_id,
      });
    }

    // Warehouse Floor
    if (
      typeof warehouse_floor_id !== "undefined" &&
      warehouse_floor_id !== "null" &&
      warehouse_floor_id !== null &&
      warehouse_floor_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse_floor_id$":
          warehouse_floor_id,
      });
    }

    // Warehouse
    if (
      typeof warehouse_id !== "undefined" &&
      warehouse_id !== "null" &&
      warehouse_id !== null &&
      warehouse_id !== ""
    ) {
      filter.where.push({
        "$warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse_id$":
          warehouse_id,
      });
    }

    // Media
    if (
      typeof media !== "undefined" &&
      media !== "null" &&
      media !== null &&
      media !== ""
    ) {
      if (media === "images" || media === "no_images") {
        const where = [
          { media_type: "image" },
          { "$wheel.dismantler_id$": context.dismantler.dismantler_id },
        ];

        if (
          typeof archived_at !== "undefined" &&
          archived_at !== "null" &&
          archived_at !== null &&
          archived_at !== "" &&
          archived_at !== false
        ) {
          where.push({
            "$wheel.archived_at$": {
              [Op.ne]: null,
            },
          });
        } else {
          where.push({
            "$wheel.archived_at$": null,
          });
        }

        const wheels_with_media_ids = await WheelMedia.findAll({
          where: where,
          include: [
            {
              model: Wheel,
              required: true,
            },
          ],
        });

        if (media === "images") {
          filter.where.push({
            wheel_id: {
              [Op.in]: [
                ...new Set(wheels_with_media_ids.map((c) => c.wheel.wheel_id)),
              ],
            },
          });
        } else {
          filter.where.push({
            wheel_id: {
              [Op.notIn]: [
                ...new Set(wheels_with_media_ids.map((c) => c.wheel.wheel_id)),
              ],
            },
          });
        }
      }
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Wheel
            { wheel_id: { [Op[op]]: text[i] } },

            { label: { [Op[op]]: text[i] } },
            { lot: { [Op[op]]: text[i] } },

            { notes: { [Op[op]]: text[i] } },

            // Version
            { "$version.version_id$": { [Op[op]]: text[i] } },
            { "$version.ania_version.ania_version$": { [Op[op]]: text[i] } },
            {
              "$version.ania_version.ania_id$": { [Op[op]]: text[i] },
            },
            {
              "$version.dismantler_version.dismantler_version$": {
                [Op[op]]: text[i],
              },
            },

            // Model
            { "$version.model.model_id$": { [Op[op]]: text[i] } },
            {
              "$version.model.ania_model.ania_model$": { [Op[op]]: text[i] },
            },
            {
              "$version.model.ania_model.ania_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.dismantler_model.dismantler_model$": {
                [Op[op]]: text[i],
              },
            },

            // Brand
            {
              "$version.model.brand.brand_id$": { [Op[op]]: text[i] },
            },
            {
              "$version.model.brand.ania_brand.ania_brand$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.ania_brand.ania_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.dismantler_brand.dismantler_brand$": {
                [Op[op]]: text[i],
              },
            },

            // Type
            {
              "$version.model.brand.type.type_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.type.ania_type.ania_type$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.type.ania_type.ania_id$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$version.model.brand.type.dismantler_type.dismantler_type$": {
                [Op[op]]: text[i],
              },
            },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof status !== "undefined" &&
      status !== "null" &&
      status !== null &&
      status !== ""
    ) {
      if (["sold", "reserved"].includes(status)) {
        if (status === "sold") {
          order_by = "wheel_order_item.order_item.order.ordered_at-DESC";
        } else if (status === "reserved") {
          order_by =
            "wheel_reservation_item.reservation_item.reservation.reserved_at-DESC";
        }
      }
    }
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const wheelsIDs = await Wheel.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return wheelsIDs;
  },

  // Clients
  clients_filter: async function (
    { text, operation, order_by, per_page, page, billing, archived_at },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Client Billing
        { model: ClientBilling },
      ],
      order: [["client_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // billing
    if (
      typeof billing !== "undefined" &&
      billing !== "null" &&
      billing !== null &&
      billing !== ""
    ) {
      filter.where.push({
        "$client_billing.billing$": billing,
      });
    }

    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Client
            { client_id: { [Op[op]]: text[i] } },
            { name: { [Op[op]]: text[i] } },
            { surname: { [Op[op]]: text[i] } },

            { phone: { [Op[op]]: text[i] } },
            { email: { [Op[op]]: text[i] } },
            { website: { [Op[op]]: text[i] } },
            { notes: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const clientsIDs = await Client.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return clientsIDs;
  },

  // Warehouses
  warehouses_filter: async function (
    { text, operation, order_by, per_page, page, archived_at },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Warehouse Address
        { model: WarehouseAddress },
      ],
      order: [["warehouse_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Warehouse
            { warehouse_id: { [Op[op]]: text[i] } },
            { warehouse: { [Op[op]]: text[i] } },

            // Warehouse Address
            { "$warehouse_address.address1$": { [Op[op]]: text[i] } },
            { "$warehouse_address.address2$": { [Op[op]]: text[i] } },
            { "$warehouse_address.city$": { [Op[op]]: text[i] } },
            { "$warehouse_address.zip$": { [Op[op]]: text[i] } },
            { "$warehouse_address.province$": { [Op[op]]: text[i] } },
            { "$warehouse_address.country$": { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const warehousesIDs = await Warehouse.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return warehousesIDs;
  },

  warehouse_floors_filter: async function (
    { text, operation, order_by, per_page, page, warehouse_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$warehouse.dismantler_id$": context.dismantler.dismantler_id,
        },
      ],
      include: [{ model: Warehouse, required: true }],
      order: [["warehouse_floor_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof warehouse_id !== "undefined" &&
      warehouse_id !== "null" &&
      warehouse_id !== ""
    ) {
      filter.where.push({
        warehouse_id: warehouse_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Warehouse
            { warehouse_floor_id: { [Op[op]]: text[i] } },
            { floor: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const warehouseFloorsIDs = await WarehouseFloor.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return warehouseFloorsIDs;
  },

  warehouse_lanes_filter: async function (
    { text, operation, order_by, per_page, page, warehouse_floor_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$warehouse_floor.warehouse.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: WarehouseFloor,
          required: true,
          include: [{ model: Warehouse, required: true }],
        },
      ],
      order: [["warehouse_lane_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof warehouse_floor_id !== "undefined" &&
      warehouse_floor_id !== "null" &&
      warehouse_floor_id !== ""
    ) {
      filter.where.push({
        warehouse_floor_id: warehouse_floor_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Warehouse
            { warehouse_lane_id: { [Op[op]]: text[i] } },
            { lane: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const warehouseLanesIDs = await WarehouseLane.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return warehouseLanesIDs;
  },

  warehouse_racks_filter: async function (
    { text, operation, order_by, per_page, page, warehouse_lane_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$warehouse_lane.warehouse_floor.warehouse.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: WarehouseLane,
          required: true,
          include: [
            {
              model: WarehouseFloor,
              required: true,
              include: [{ model: Warehouse, required: true }],
            },
          ],
        },
      ],
      order: [["warehouse_rack_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof warehouse_lane_id !== "undefined" &&
      warehouse_lane_id !== "null" &&
      warehouse_lane_id !== ""
    ) {
      filter.where.push({
        warehouse_lane_id: warehouse_lane_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Warehouse
            { warehouse_rack_id: { [Op[op]]: text[i] } },
            { rack: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const warehouseRacksIDs = await WarehouseRack.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return warehouseRacksIDs;
  },

  warehouse_shelves_filter: async function (
    { text, operation, order_by, per_page, page, warehouse_rack_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$warehouse_rack.warehouse_lane.warehouse_floor.warehouse.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: WarehouseRack,
          required: true,
          include: [
            {
              model: WarehouseLane,
              required: true,
              include: [
                {
                  model: WarehouseFloor,
                  required: true,
                  include: [{ model: Warehouse, required: true }],
                },
              ],
            },
          ],
        },
      ],
      order: [["warehouse_shelf_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof warehouse_rack_id !== "undefined" &&
      warehouse_rack_id !== "null" &&
      warehouse_rack_id !== ""
    ) {
      filter.where.push({
        warehouse_rack_id: warehouse_rack_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Warehouse
            { warehouse_shelf_id: { [Op[op]]: text[i] } },
            { shelf: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const warehouseShelvesIDs = await WarehouseShelf.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return warehouseShelvesIDs;
  },

  warehouse_bins_filter: async function (
    { text, operation, order_by, per_page, page, warehouse_shelf_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: WarehouseShelf,
          required: true,
          include: [
            {
              model: WarehouseRack,
              required: true,
              include: [
                {
                  model: WarehouseLane,
                  required: true,
                  include: [
                    {
                      model: WarehouseFloor,
                      required: true,
                      include: [{ model: Warehouse, required: true }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["warehouse_bin_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof warehouse_shelf_id !== "undefined" &&
      warehouse_shelf_id !== "null" &&
      warehouse_shelf_id !== ""
    ) {
      filter.where.push({
        warehouse_shelf_id: warehouse_shelf_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Warehouse
            { warehouse_bin_id: { [Op[op]]: text[i] } },
            { bin: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const warehouseBinsIDs = await WarehouseBin.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return warehouseBinsIDs;
  },

  // Deposits
  deposits_filter: async function (
    { text, operation, order_by, per_page, page, archived_at },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [
        // Deposit Address
        { model: DepositAddress },
      ],
      order: [["deposit_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // archived_at
    if (
      typeof archived_at !== "undefined" &&
      archived_at !== "null" &&
      archived_at !== null &&
      archived_at !== "" &&
      archived_at !== false
    ) {
      filter.where.push({
        archived_at: {
          [Op.ne]: null,
        },
      });
    } else {
      filter.where.push({
        archived_at: null,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Deposit
            { deposit_id: { [Op[op]]: text[i] } },
            { deposit: { [Op[op]]: text[i] } },

            // Deposit Address
            { "$deposit_address.address1$": { [Op[op]]: text[i] } },
            { "$deposit_address.address2$": { [Op[op]]: text[i] } },
            { "$deposit_address.city$": { [Op[op]]: text[i] } },
            { "$deposit_address.zip$": { [Op[op]]: text[i] } },
            { "$deposit_address.province$": { [Op[op]]: text[i] } },
            { "$deposit_address.country$": { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const depositsIDs = await Deposit.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return depositsIDs;
  },

  deposit_lots_filter: async function (
    { text, operation, order_by, per_page, page, deposit_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$deposit.dismantler_id$": context.dismantler.dismantler_id,
        },
      ],
      include: [{ model: Deposit, required: true }],
      order: [["deposit_lot_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof deposit_id !== "undefined" &&
      deposit_id !== "null" &&
      deposit_id !== ""
    ) {
      filter.where.push({
        deposit_id: deposit_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Deposit
            { deposit_lot_id: { [Op[op]]: text[i] } },
            { lot: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const depositLotsIDs = await DepositLot.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return depositLotsIDs;
  },

  deposit_lanes_filter: async function (
    { text, operation, order_by, per_page, page, deposit_lot_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$deposit_lot.deposit.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: DepositLot,
          required: true,
          include: [{ model: Deposit, required: true }],
        },
      ],
      order: [["deposit_lane_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof deposit_lot_id !== "undefined" &&
      deposit_lot_id !== "null" &&
      deposit_lot_id !== ""
    ) {
      filter.where.push({
        deposit_lot_id: deposit_lot_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Deposit
            { deposit_lane_id: { [Op[op]]: text[i] } },
            { lane: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const depositLanesIDs = await DepositLane.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return depositLanesIDs;
  },

  deposit_placements_filter: async function (
    { text, operation, order_by, per_page, page, deposit_lane_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$deposit_lane.deposit_lot.deposit.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: DepositLane,
          required: true,
          include: [
            {
              model: DepositLot,
              required: true,
              include: [{ model: Deposit, required: true }],
            },
          ],
        },
      ],
      order: [["deposit_placement_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof deposit_lane_id !== "undefined" &&
      deposit_lane_id !== "null" &&
      deposit_lane_id !== ""
    ) {
      filter.where.push({
        deposit_lane_id: deposit_lane_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Deposit
            { deposit_placement_id: { [Op[op]]: text[i] } },
            { placement: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const depositPlacementsIDs = await DepositPlacement.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return depositPlacementsIDs;
  },

  deposit_floors_filter: async function (
    { text, operation, order_by, per_page, page, deposit_placement_id },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          "$deposit_placement.deposit_lane.deposit_lot.deposit.dismantler_id$":
            context.dismantler.dismantler_id,
        },
      ],
      include: [
        {
          model: DepositPlacement,
          required: true,
          include: [
            {
              model: DepositLane,
              required: true,
              include: [
                {
                  model: DepositLot,
                  required: true,
                  include: [{ model: Deposit, required: true }],
                },
              ],
            },
          ],
        },
      ],
      order: [["deposit_floor_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof deposit_placement_id !== "undefined" &&
      deposit_placement_id !== "null" &&
      deposit_placement_id !== ""
    ) {
      filter.where.push({
        deposit_placement_id: deposit_placement_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Deposit
            { deposit_floor_id: { [Op[op]]: text[i] } },
            { floor: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const depositFloorsIDs = await DepositFloor.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return depositFloorsIDs;
  },

  // Groups
  // Groups
  groups_filter: async function (
    { text, operation, order_by, per_page, page, group_type },
    context
  ) {
    // Dismantler settings
    const dismantler_settings = settings_parse(
      context.dismantler.dismantler_settings
    );

    // Initializing filter
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("ania_group.ania_group"),
              Sequelize.col("dismantler_group.dismantler_group")
            ),
            "group",
          ],
        ],
      },
      where: [
        // Check type
        {
          [Op.or]: [
            [{ group_type: "ania_group" }],
            [
              { group_type: "dismantler_group" },
              {
                "$dismantler_group.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        // Group
        {
          model: AniaGroup,
          required: false,
        },
        {
          model: DismantlerGroup,
          required: false,
        },
      ],
      order: [["group_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof group_type !== "undefined" &&
      group_type !== "null" &&
      group_type !== ""
    ) {
      filter.where.push({
        group_type: group_type,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Group
            { group_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_group.dismantler_group$": { [Op[op]]: text[i] },
            },
            {
              "$ania_group.ania_group$": { [Op[op]]: text[i] },
            },
          ],
        });
      }
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }
    // END Populating filter.order
    // Finding IDs
    const groupsIDs = await Group.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return groupsIDs;
  },

  // Decks
  decks_filter: async function (
    { text, operation, order_by, per_page, page },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [
        {
          dismantler_id: context.dismantler.dismantler_id,
        },
      ],
      include: [],
      order: [["deck_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Deck
            { deck_id: { [Op[op]]: text[i] } },
            { deck: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const decksIDs = await Deck.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return decksIDs;
  },

  // Entries
  entries_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,
      is_safety,
      is_active,
      deck_id,
      group_id,
      entry_type,
    },
    context
  ) {
    // Initializing filters
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("ania_entry.ania_entry"),
              Sequelize.col("dismantler_entry.dismantler_entry")
            ),
            "entry",
          ],
        ],
      },
      where: [
        {
          [Op.or]: [
            { entry_type: "ania_entry" },
            [
              { entry_type: "dismantler_entry" },
              {
                "$dismantler_entry.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        {
          model: AniaEntry,
          required: false,
        },
        {
          model: DismantlerEntry,
          required: false,
        },
      ],
      order: [["entry_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    let dismantler_ania_entry_filter = {
      attributes: ["entry_id", "entry"],
      where: [{ dismantler_id: context.dismantler.dismantler_id }],
    };

    // Populating filter.where
    // deck_id
    let in_deck_entries = [];
    if (
      typeof deck_id !== "undefined" &&
      deck_id !== "null" &&
      deck_id !== null &&
      deck_id !== ""
    ) {
      const deck_entries = await DeckEntry.findAll({
        attributes: ["entry_id"],
        where: {
          deck_id: deck_id,
        },
        include: [
          {
            model: Deck,
            where: { dismantler_id: context.dismantler.dismantler_id },
            required: true,
          },
          {
            model: Entry,
            required: true,
            include: [
              { model: AniaEntry, required: false },
              {
                model: DismantlerEntry,
                required: false,
                where: { dismantler_id: context.dismantler.dismantler_id },
              },
            ],
          },
        ],
      });

      // Push
      in_deck_entries.push(
        ...deck_entries.map((entry) => {
          return entry.entry_id;
        })
      );
    }

    // Is active
    let active_entries = [];
    if (
      typeof is_active !== "undefined" &&
      is_active !== "null" &&
      is_active !== null &&
      is_active !== ""
    ) {
      const deck_entries = await DeckEntry.findAll({
        attributes: ["entry_id"],
        include: [
          {
            model: Deck,
            where: { dismantler_id: context.dismantler.dismantler_id },
            required: true,
          },
          {
            model: Entry,
            required: true,
            include: [
              { model: AniaEntry, required: false },
              {
                model: DismantlerEntry,
                required: false,
                where: { dismantler_id: context.dismantler.dismantler_id },
              },
            ],
          },
        ],
      });

      // Push
      active_entries.push(
        ...[
          ...new Set(
            deck_entries.map((entry) => {
              return entry.entry_id;
            })
          ),
        ]
      );
    }

    // group_id
    if (
      typeof group_id !== "undefined" &&
      group_id !== "null" &&
      group_id !== null &&
      group_id !== ""
    ) {
      const entry_ids = await TypeEntryGroup.findAll({
        attributes: ["entry_id"],
        where: {
          group_id: group_id,
        },
      });

      if (entry_ids.length > 0) {
        filter.where.push({
          entry_id: {
            [Op.in]: entry_ids.map((e) => e.entry_id),
          },
        });
      }
    }

    // Is safety
    let safety_entries = [];
    if (
      typeof is_safety !== "undefined" &&
      is_safety !== "null" &&
      is_safety !== ""
    ) {
      // Dismantler Entries
      const dismantler_safety_entries = await DismantlerEntry.findAll({
        where: {
          dismantler_id: context.dismantler.dismantler_id,
          is_safety: is_safety,
        },
      });

      if (dismantler_safety_entries.length > 0) {
        // Push
        safety_entries.push(
          ...dismantler_safety_entries.map((entry) => {
            return entry.entry_id;
          })
        );
      }

      // ANIA Entries
      const ania_safety_entries = await AniaEntry.findAll({
        include: [
          {
            model: DismantlerAniaEntry,
            where: {
              is_safety: true,
              dismantler_id: context.dismantler.dismantler_id,
            },
            required: true,
          },
        ],
      });

      if (is_safety.toString() === "true") {
        // Push
        safety_entries.push(
          ...ania_safety_entries.map((entry) => {
            return entry.entry_id;
          })
        );
      } else {
        const ania_not_safety_entries = await AniaEntry.findAll({
          where: {
            entry_id: {
              [Op.notIn]: ania_safety_entries.map((entry) => {
                return entry.entry_id;
              }),
            },
          },
        });

        // Push
        safety_entries.push(
          ...ania_not_safety_entries.map((entry) => {
            return entry.entry_id;
          })
        );
      }
    }

    // Push is_safety to where
    if (
      typeof is_safety !== "undefined" &&
      is_safety !== "null" &&
      is_safety !== ""
    ) {
      if (safety_entries.length > 0) {
        // Push in where
        filter.where.push({
          entry_id: {
            [Op.in]: safety_entries,
          },
        });
      } else {
        // Push in where
        filter.where.push({
          entry_id: {
            [Op.eq]: [],
          },
        });
      }
    }

    // Push is_active, deck_id to where
    if (
      (typeof is_active !== "undefined" &&
        is_active !== "null" &&
        is_active !== null &&
        is_active !== "") ||
      (typeof deck_id !== "undefined" &&
        deck_id !== "null" &&
        deck_id !== null &&
        deck_id !== "")
    ) {
      if (
        typeof is_active !== "undefined" &&
        is_active !== "null" &&
        is_active !== null &&
        is_active !== "" &&
        typeof deck_id !== "undefined" &&
        deck_id !== "null" &&
        deck_id !== null &&
        deck_id !== ""
      ) {
        // is_active AND deck_id
        if (is_active.toString() === "true") {
          // is_active true

          // With deck_id
          if (in_deck_entries.length > 0) {
            filter.where.push({
              entry_id: {
                [Op.in]: in_deck_entries,
              },
            });
          } else {
            // Empty
            filter.where.push({
              entry_id: {
                [Op.in]: [],
              },
            });
          }
        } else if (is_active.toString() === "false") {
          // is_active false
          // With deck_id
          if (in_deck_entries.length > 0) {
            filter.where.push({
              entry_id: {
                [Op.notIn]: in_deck_entries,
              },
            });
          } else {
            // All
          }
        }
      } else if (
        typeof is_active !== "undefined" &&
        is_active !== "null" &&
        is_active !== null &&
        is_active !== ""
      ) {
        // is_active only
        if (is_active.toString() === "true") {
          filter.where.push({
            entry_id: {
              [Op.in]: active_entries,
            },
          });
        } else if (is_active.toString() === "false") {
          filter.where.push({
            entry_id: {
              [Op.notIn]: active_entries,
            },
          });
        }
      } else if (
        typeof deck_id !== "undefined" &&
        deck_id !== "null" &&
        deck_id !== null &&
        deck_id !== ""
      ) {
        // deck_id only
        if (in_deck_entries.length > 0) {
          filter.where.push({
            entry_id: {
              [Op.in]: in_deck_entries,
            },
          });
        } else {
          // Empty
          filter.where.push({
            entry_id: { [Op.in]: [] },
          });
        }
      }
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }

    // Text
    const text_params = [];
    const dismantler_ania_entry_text_params = [];
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Check if array
      if (Array.isArray(text)) {
        // Add whole text
        text_params.push(
          ...[
            { entry_id: { [Op[op]]: text.join(" ") } },
            {
              "$dismantler_entry.dismantler_entry$": {
                [Op[op]]: text.join(" "),
              },
            },
            {
              "$ania_entry.ania_entry$": { [Op[op]]: text.join(" ") },
            },
          ]
        );

        // Fragment
        for (let i = 0; i < text.length; i++) {
          const params = [
            // Entry
            { entry_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_entry.dismantler_entry$": { [Op[op]]: text[i] },
            },
            {
              "$ania_entry.ania_entry$": { [Op[op]]: text[i] },
            },
          ];

          // Populate filter
          text_params.push(...params);

          // Populate Dismantler Ania Entries Filter
          dismantler_ania_entry_text_params.push(
            // Entry
            { entry: { [Op[op]]: text[i] } }
          );
        }
      } else {
        // Params
        const params = [
          // Entry
          { entry_id: { [Op[op]]: text } },

          {
            "$dismantler_entry.dismantler_entry$": { [Op[op]]: text },
          },
          {
            "$ania_entry.ania_entry$": { [Op[op]]: text },
          },
        ];

        // Populate filter
        text_params.push(...params);

        // Populate Dismantler Ania Entries Filter
        dismantler_ania_entry_text_params.push(
          // Entry
          { entry: { [Op[op]]: text } }
        );
      }
    }

    if (text_params.length > 0) {
      filter.where.push({
        [Op.or]: text_params,
      });
    }

    // Dismantler Ania Entries
    let dismantler_ania_entries_ids = [];
    if (dismantler_ania_entry_text_params.length > 0) {
      const dismantler_ania_antries = await DismantlerAniaEntry.findAll({
        attributes: dismantler_ania_entry_filter.attributes,
        where: [
          ...dismantler_ania_entry_filter.where,
          { [Op.or]: dismantler_ania_entry_text_params },
        ],
      });

      if (dismantler_ania_antries.length > 0) {
        // Push
        dismantler_ania_entries_ids.push(
          ...dismantler_ania_antries.map((entry) => {
            return entry.entry_id;
          })
        );
      }
    }

    // Push dismantler_ania_entries_ids
    if (dismantler_ania_entries_ids.length > 0) {
      if (active_entries.length > 0 || safety_entries.length > 0) {
        if (active_entries.length > 0 && safety_entries.length > 0) {
          // Intersect
          dismantler_ania_entries_ids = dismantler_ania_entries_ids.filter(
            (entry) => {
              return (
                active_entries.includes(entry) && safety_entries.includes(entry)
              );
            }
          );
        } else {
          // Intersect
          dismantler_ania_entries_ids = dismantler_ania_entries_ids.filter(
            (entry) => {
              return (
                active_entries.includes(entry) || safety_entries.includes(entry)
              );
            }
          );
        }
      }

      filter.where = [
        {
          [Op.or]: [
            filter.where,
            {
              entry_id: { [Op.in]: dismantler_ania_entries_ids },
            },
          ],
        },
      ];
    }

    // Don't move from here: ORDER MATTERS
    if (
      typeof entry_type !== "undefined" &&
      entry_type !== "null" &&
      entry_type !== ""
    ) {
      filter.where.push({
        entry_type: entry_type,
      });
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }
    // END Populating filter.order

    // Finding IDs
    const entriesIDs = await Entry.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return entriesIDs;
  },

  // Types
  types_filter: async function (
    { text, operation, order_by, per_page, page, type_type },
    context
  ) {
    // Dismantler settings
    const dismantler_settings = settings_parse(
      context.dismantler.dismantler_settings
    );

    // Initializing filter
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("ania_type.ania_type"),
              Sequelize.col("dismantler_type.dismantler_type")
            ),
            "type",
          ],
        ],
      },
      where: [
        // Check type
        {
          [Op.or]: [
            [
              { type_type: "ania_type" },
              {
                "$ania_type.type_id$":
                  dismantler_settings.allowed_ania_type_ids,
              },
            ],
            [
              { type_type: "dismantler_type" },
              {
                "$dismantler_type.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        // Type
        {
          model: AniaType,
          required: false,
        },
        {
          model: DismantlerType,
          required: false,
        },
      ],
      order: [["type_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof type_type !== "undefined" &&
      type_type !== "null" &&
      type_type !== ""
    ) {
      filter.where.push({
        type_type: type_type,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Type
            { type_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_type.dismantler_type$": { [Op[op]]: text[i] },
            },
            {
              "$ania_type.ania_type$": { [Op[op]]: text[i] },
            },
          ],
        });
      }
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }
    // END Populating filter.order
    // Finding IDs
    const typesIDs = await Type.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return typesIDs;
  },

  // Brands
  brands_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,
      brand_type,

      type_id,
    },
    context
  ) {
    // Dismantler settings
    const dismantler_settings = settings_parse(
      context.dismantler.dismantler_settings
    );

    // Initializing filter
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("ania_brand.ania_brand"),
              Sequelize.col("dismantler_brand.dismantler_brand")
            ),
            "brand",
          ],
        ],
      },
      where: [
        // Check brand
        {
          [Op.or]: [
            { brand_type: "ania_brand" },
            [
              { brand_type: "dismantler_brand" },
              {
                "$dismantler_brand.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },

        // Check type
        {
          [Op.or]: [
            [
              { "$type.type_type$": "ania_type" },
              {
                "$type.ania_type.type_id$":
                  dismantler_settings.allowed_ania_type_ids,
              },
            ],
            [
              { "$type.type_type$": "dismantler_type" },
              {
                "$type.dismantler_type.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        // Brand
        {
          model: AniaBrand,
          required: false,
        },
        {
          model: DismantlerBrand,
          required: false,
        },

        // Type
        {
          model: Type,
          include: [
            {
              model: AniaType,
              required: false,
            },
            {
              model: DismantlerType,
              required: false,
            },
          ],
        },
      ],
      order: [["brand_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof brand_type !== "undefined" &&
      brand_type !== "null" &&
      brand_type !== ""
    ) {
      filter.where.push({
        brand_type: brand_type,
      });
    }

    if (
      typeof type_id !== "undefined" &&
      type_id !== "null" &&
      type_id !== null &&
      type_id !== ""
    ) {
      filter.where.push({
        "$type.type_id$": type_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Brand
            { brand_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_brand.dismantler_brand$": { [Op[op]]: text[i] },
            },
            {
              "$ania_brand.ania_brand$": { [Op[op]]: text[i] },
            },
          ],
        });
      }
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }
    // END Populating filter.order
    // Finding IDs
    const brandsIDs = await Brand.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return brandsIDs;
  },

  // Models
  models_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,
      model_type,

      type_id,
      brand_id,
    },
    context
  ) {
    // Dismantler settings
    const dismantler_settings = settings_parse(
      context.dismantler.dismantler_settings
    );

    // Initializing filter
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("ania_model.ania_model"),
              Sequelize.col("dismantler_model.dismantler_model")
            ),
            "model",
          ],
        ],
      },
      where: [
        // Check model
        {
          [Op.or]: [
            { model_type: "ania_model" },
            [
              { model_type: "dismantler_model" },
              {
                "$dismantler_model.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },

        // Check type
        {
          [Op.or]: [
            [
              { "$brand.type.type_type$": "ania_type" },
              {
                "$brand.type.ania_type.type_id$":
                  dismantler_settings.allowed_ania_type_ids,
              },
            ],
            [
              { "$brand.type.type_type$": "dismantler_type" },
              {
                "$brand.type.dismantler_type.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        // Model
        {
          model: AniaModel,
          required: false,
        },
        {
          model: DismantlerModel,
          required: false,
        },

        // Brand
        {
          model: Brand,
          include: [
            // Type
            {
              model: Type,
              include: [
                {
                  model: AniaType,
                  required: false,
                },
                {
                  model: DismantlerType,
                  required: false,
                },
              ],
            },
          ],
        },
      ],
      order: [["model_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof model_type !== "undefined" &&
      model_type !== "null" &&
      model_type !== ""
    ) {
      filter.where.push({
        model_type: model_type,
      });
    }

    if (
      typeof type_id !== "undefined" &&
      type_id !== "null" &&
      type_id !== null &&
      type_id !== ""
    ) {
      filter.where.push({
        "$brand.type.type_id$": type_id,
      });
    }

    if (
      typeof brand_id !== "undefined" &&
      brand_id !== "null" &&
      brand_id !== null &&
      brand_id !== ""
    ) {
      filter.where.push({
        "$brand.brand_id$": brand_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Model
            { model_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_model.dismantler_model$": { [Op[op]]: text[i] },
            },
            { "$ania_model.ania_model$": { [Op[op]]: text[i] } },
          ],
        });
      }
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }
    // END Populating filter.order
    // Finding IDs
    const modelsIDs = await Model.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return modelsIDs;
  },

  // Versions
  versions_filter: async function (
    {
      text,
      operation,
      order_by,
      per_page,
      page,
      version_type,

      type_id,
      brand_id,
      model_id,
    },
    context
  ) {
    // Dismantler settings
    const dismantler_settings = settings_parse(
      context.dismantler.dismantler_settings
    );

    // Initializing filter
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("ania_version.ania_version"),
              Sequelize.col("dismantler_version.dismantler_version")
            ),
            "version",
          ],
        ],
      },
      where: [
        // Check version
        {
          [Op.or]: [
            { version_type: "ania_version" },
            [
              { version_type: "dismantler_version" },
              {
                "$dismantler_version.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },

        // Check type
        {
          [Op.or]: [
            [
              { "$model.brand.type.type_type$": "ania_type" },
              {
                "$model.brand.type.ania_type.type_id$":
                  dismantler_settings.allowed_ania_type_ids,
              },
            ],
            [
              { "$model.brand.type.type_type$": "dismantler_type" },
              {
                "$model.brand.type.dismantler_type.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        // Version
        {
          model: AniaVersion,
          required: false,
        },
        {
          model: DismantlerVersion,
          required: false,
        },

        // Model
        {
          model: Model,
          include: [
            {
              // Brand
              model: Brand,
              include: [
                {
                  // Type
                  model: Type,
                  include: [
                    {
                      model: AniaType,
                      required: false,
                    },
                    {
                      model: DismantlerType,
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["version_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof version_type !== "undefined" &&
      version_type !== "null" &&
      version_type !== ""
    ) {
      filter.where.push({
        version_type: version_type,
      });
    }

    if (
      typeof type_id !== "undefined" &&
      type_id !== "null" &&
      type_id !== null &&
      type_id !== ""
    ) {
      filter.where.push({
        "$model.brand.type.type_id$": type_id,
      });
    }

    if (
      typeof brand_id !== "undefined" &&
      brand_id !== "null" &&
      brand_id !== null &&
      brand_id !== ""
    ) {
      filter.where.push({
        "$model.brand.brand_id$": brand_id,
      });
    }

    if (
      typeof model_id !== "undefined" &&
      model_id !== "null" &&
      model_id !== null &&
      model_id !== ""
    ) {
      filter.where.push({
        "$model.model_id$": model_id,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Version
            { version_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_version.dismantler_version$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$ania_version.ania_version$": { [Op[op]]: text[i] },
            },
          ],
        });
      }
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }
    // END Populating filter.order
    // Finding IDs
    const versionsIDs = await Version.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return versionsIDs;
  },

  // Manufacturers
  manufacturers_filter: async function (
    { text, operation, order_by, per_page, page, manufacturer_type, entity },
    context
  ) {
    // Initializing filter
    let filter = {
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT_WS",
              "",
              Sequelize.col("system_manufacturer.system_manufacturer"),
              Sequelize.col("dismantler_manufacturer.dismantler_manufacturer")
            ),
            "manufacturer",
          ],
        ],
      },
      where: [
        // Check type
        {
          [Op.or]: [
            [{ manufacturer_type: "system_manufacturer" }],
            [
              { manufacturer_type: "dismantler_manufacturer" },
              {
                "$dismantler_manufacturer.dismantler_id$":
                  context.dismantler.dismantler_id,
              },
            ],
          ],
        },
      ],
      include: [
        // Manufacturer
        {
          model: SystemManufacturer,
          required: false,
        },
        {
          model: DismantlerManufacturer,
          required: false,
        },
      ],
      order: [["manufacturer_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof manufacturer_type !== "undefined" &&
      manufacturer_type !== "null" &&
      manufacturer_type !== null &&
      manufacturer_type !== ""
    ) {
      filter.where.push({
        manufacturer_type: manufacturer_type,
      });
    }

    if (
      typeof entity !== "undefined" &&
      entity !== "null" &&
      entity !== null &&
      entity !== ""
    ) {
      // Split
      if (entity.includes(",")) {
        entity = entity.split(",");
      }

      if (Array.isArray(entity)) {
        const entities = [];
        for (let i = 0; i < entity.length; i++) {
          entities.push({ [Op.substring]: entity[i].trim() });
        }
        filter.where.push({
          entity: { [Op.or]: entities },
        });
      } else {
        filter.where.push({
          entity: { [Op.substring]: entity.trim() },
        });
      }
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Type
            { manufacturer_id: { [Op[op]]: text[i] } },

            {
              "$dismantler_manufacturer.dismantler_manufacturer$": {
                [Op[op]]: text[i],
              },
            },
            {
              "$system_manufacturer.system_manufacturer$": {
                [Op[op]]: text[i],
              },
            },
          ],
        });
      }
    }

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      // Check if order_by contains a +
      let items = [];
      if (order_by.includes("+")) {
        items = order_by.split("+");
      }

      if (items.length > 0) {
        filter.order = [];

        for (let i = 0; i < items.length; i++) {
          let order = items[i].split("-");

          // Split all dots
          while (order[0].includes(".")) {
            order[0] = order[0].split(".");
          }

          // Flatten
          filter.order.push(order.flat(Infinity));
        }
      } else {
        let order = order_by.split("-");

        // Split all dots
        while (order[0].includes(".")) {
          order[0] = order[0].split(".");
        }

        // Flatten
        filter.order = [order.flat(Infinity)];
      }
    }

    // END Populating filter.order
    // Finding IDs
    const manufacturersIDs = await Manufacturer.findAndCountAll({
      attributes: filter.attributes,
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return manufacturersIDs;
  },

  // Services
  services_filter: async function (
    { text, operation, order_by, per_page, page, type },
    context
  ) {
    // Initializing filter
    let filter = {
      where: [],
      include: [],
      order: [["service_id", "DESC"]],
      offset: page && per_page ? (page - 1) * per_page : null,
      limit: per_page ? per_page : null,
    };

    // Populating filter.where
    if (
      typeof type !== "undefined" &&
      type !== "null" &&
      type !== null &&
      type !== ""
    ) {
      filter.where.push({
        type: type,
      });
    }

    // Operation
    let op = "startsWith";
    switch (operation) {
      case "starts_with":
        op = "startsWith";
        break;
      case "ends_with":
        op = "endsWith";
        break;
      case "substring":
        op = "substring";
        break;
      case "equals":
        op = "eq";
        break;
      default:
        op = "startsWith";
    }
    // Text
    if (text && text !== "null" && text !== null && text !== "") {
      if (op === "substring") {
        // Split
        if (text.includes(" ")) {
          text = text.split(" ");
        }
      }

      // Convert to array
      if (!Array.isArray(text)) {
        text = [text];
      }

      for (let i = 0; i < text.length; i++) {
        filter.where.push({
          [Op.or]: [
            // Service
            { service_id: { [Op[op]]: text[i] } },
            { service: { [Op[op]]: text[i] } },
          ],
        });
      }
    }
    // END Populating filter.where

    // Populating filter.order
    // Order by
    if (
      typeof order_by !== "undefined" &&
      order_by !== "null" &&
      order_by !== null &&
      order_by !== ""
    ) {
      let order = order_by.split("-");

      // Split all dots
      while (order[0].includes(".")) {
        order[0] = order[0].split(".");
      }

      // Flatten
      filter.order = [order.flat(Infinity)];
    }
    // END Populating filter.order

    // Finding IDs
    const servicesIDs = await Service.findAndCountAll({
      where: filter.where,
      include: filter.include,
      order: filter.order,
      offset: filter.offset,
      limit: filter.limit,
    });

    // Return
    return servicesIDs;
  },
};

async function oem_codes_by_version(version_id) {
  const OEMCodes = [];

  const OEMCodeVersions = await OEMCodeVersion.findAll({
    where: { version_id: version_id },
    include: [
      {
        model: OEMCode,
      },
    ],
  });

  if (OEMCodeVersions && OEMCodeVersions.length > 0) {
    OEMCodeVersions.forEach((OEMCodeVersion) => {
      OEMCodes.push(OEMCodeVersion.oem_code.oem_code);
    });
  }

  return OEMCodes;
}
