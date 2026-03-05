//#region
// Path
const path = require("path");

// File System
const fs = require("fs");

// Axios
const axios = require("axios");

// Moment
const moment = require("moment");
moment.locale("it");

// ExcelJS
const ExcelJS = require("exceljs");

// Sequelize
const { Op, Sequelize, EmptyResultError } = require("sequelize");

// Amazon Web Service
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Configure S3
const s3 = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "fra1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Mailer
const { sendEmail } = require("@utilities/helpers/mailer");

// #region Models
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
// END Order

// Reservation
const Reservation = require("@databases/sequelize/models/reservation/reservation");
const ReservationItem = require("@databases/sequelize/models/reservation/reservation_item");

// Component
const Component = require("@databases/sequelize/models/component/component");
const ComponentMedia = require("@databases/sequelize/models/component/component_media");
const ComponentTag = require("@databases/sequelize/models/component/component_tag");
const ComponentScannerCode = require("@databases/sequelize/models/component/component_scanner_code");

const ComponentOrderItem = require("@databases/sequelize/models/component/component_order_item");
const ComponentReservationItem = require("@databases/sequelize/models/component/component_reservation_item");

// Vehicle
const Vehicle = require("@databases/sequelize/models/vehicle/vehicle");
const VehicleAcceptance = require("@databases/sequelize/models/vehicle/vehicle_acceptance");
const VehicleBody = require("@databases/sequelize/models/vehicle/vehicle_body");
const VehicleDrainage = require("@databases/sequelize/models/vehicle/vehicle_drainage");
const VehicleEngine = require("@databases/sequelize/models/vehicle/vehicle_engine");
const VehicleTransmission = require("@databases/sequelize/models/vehicle/vehicle_transmission");
const VehicleMedia = require("@databases/sequelize/models/vehicle/vehicle_media");
const VehicleScannerCode = require("@databases/sequelize/models/vehicle/vehicle_scanner_code");

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

// ANIA
const AniaGroup = require("@databases/sequelize/models/ania/ania_group");
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

const DismantlerAniaEntryAniaBrand = require("@databases/sequelize/models/dismantler/dismantler_ania_entry_ania_brand");
const DismantlerAniaEntryAniaModel = require("@databases/sequelize/models/dismantler/dismantler_ania_entry_ania_model");
const DismantlerAniaEntryAniaVersion = require("@databases/sequelize/models/dismantler/dismantler_ania_entry_ania_version");
// END Entry, Type, Brand, Model, Version

// Manufacturer
const Manufacturer = require("@databases/sequelize/models/manufacturer");
const SystemManufacturer = require("@databases/sequelize/models/system/system_manufacturer");
const DismantlerManufacturer = require("@databases/sequelize/models/dismantler/dismantler_manufacturer");

// Service
const Service = require("@databases/sequelize/models/service/service");
// #endregion Models

// Utilities
// Parsers
const { union_parse, media_parse } = require("@utilities/helpers/parsers");

// Filters
const {
  // Access
  accesses_filter,
  accesses_logs_filter,

  // Order
  orders_filter,

  // Component
  components_filter,

  // Vehicle
  vehicles_filter,

  // Client
  clients_filter,

  // Warehouse
  warehouses_filter,

  // Deposit
  deposits_filter
} = require("@graphql/access/filters");
// END Utilities

// Enums
const {
  order_item_enums,
  reservation_item_enums,
  component_enums,
  side_enums,

  vehicle_enums,
  vehicle_engine_enums,
  vehicle_transmission_enums,
  vehicle_body_enums,

  channel_enums,

  // General
  is_tested_enums,
  is_available_enums
} = require("@databases/sequelize/enums");

//#endregion

module.exports = {
  // Orders
  export_orders: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const ordersIDs = await orders_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          from: fields.includes("filters") ? filters.from : null,
          to: fields.includes("filters") ? filters.to : null,

          access_id: fields.includes("filters") ? filters.access_id : null,
          client_id: fields.includes("filters") ? filters.client_id : null,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        ordersIDs.count === 0 ||
        (ordersIDs.count > 0 && ordersIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const orders = await Order.findAll({
        where: {
          order_id: ordersIDs.rows.map((c) => c.order_id)
        },
        include: [
          // Order Buyer
          { model: OrderBuyer },

          // Order Shipping
          { model: OrderShipping },

          // Order Billing
          { model: OrderBilling },

          // Order Items
          { model: OrderItem }
        ]
      });

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        // Entry
        if (order.entry) {
          if (!order.entry.ania_entry && !order.entry.dismantler_entry) {
            // Error
          }

          order.entry.entry = union_parse(order.entry, "entry");
        }

        // Version
        if (order.version) {
          if (
            !order.version.ania_version &&
            !order.version.dismantler_version
          ) {
            // Error
          }

          order.version.version = union_parse(order.version, "version");

          // Model
          if (order.version.model) {
            if (
              !order.version.model.ania_model &&
              !order.version.model.dismantler_model
            ) {
              // Error
            }

            order.version.model.model = union_parse(
              order.version.model,
              "model"
            );

            // Brand
            if (order.version.model.brand) {
              if (
                !order.version.model.brand.ania_brand &&
                !order.version.model.brand.dismantler_brand
              ) {
                // Error
              }

              order.version.model.brand.brand = union_parse(
                order.version.model.brand,
                "brand"
              );

              // Type
              if (order.version.model.brand.type) {
                if (
                  !order.version.model.brand.type.ania_type &&
                  !order.version.model.brand.type.dismantler_type
                ) {
                  // Error
                }

                order.version.model.brand.type.type = union_parse(
                  order.version.model.brand.type,
                  "type"
                );
              }
            }
          }
        }

        // Manufacturer
        if (order.manufacturer) {
          if (
            !order.manufacturer.system_manufacturer &&
            !order.manufacturer.dismantler_manufacturer
          ) {
            // Error
          }

          order.manufacturer.manufacturer = union_parse(
            order.manufacturer,
            "manufacturer"
          );
        }

        // Order Media
        if (order.order_media && order.order_media.length > 0) {
          // Media parse
          order.order_media = media_parse(order.order_media);
        }
      }

      // Reorder order by ordersIDs
      orders.sort(function (a, b) {
        return (
          ordersIDs.rows.findIndex((c) => c.order_id === a.order_id) -
          ordersIDs.rows.findIndex((c) => c.order_id === b.order_id)
        );
      });

      results.push(...orders);

      page++;
    }

    console.log("[export_orders] Orders found: ", results.length);

    // Services
    const services = await Service.findAll();
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Ordini");

    // Columns
    const columns = [
      {
        key: "order.order_id",
        header: "ID Ordine",
        width: 14
      },

      {
        key: "order.service",
        header: "Servizio",
        width: 18
      },
      {
        key: "order.channel",
        header: "Canale",
        width: 18
      },

      // Summary
      {
        key: "order.order_items.count",
        header: "Articoli",
        width: 18
      },
      {
        key: "order.order_items.subtotal",
        header: "Subtotale",
        width: 18
      },
      {
        key: "order.order_items.total",
        header: "Totale",
        width: 18
      },

      // Order Buyer
      {
        key: "order.order_buyer.name",
        header: "Cliente: Nome",
        width: 18
      },
      {
        key: "order.order_buyer.surname",
        header: "Cliente: Cognome",
        width: 18
      },
      {
        key: "order.order_buyer.ssn",
        header: "Cliente: Codice Fiscale",
        width: 20
      },
      {
        key: "order.order_buyer.phone",
        header: "Cliente: Telefono",
        width: 18
      },
      {
        key: "order.order_buyer.email",
        header: "Cliente: Indirizzo email",
        width: 22
      },

      // Order Shipping
      {
        key: "order.order_shipping.to",
        header: "Spedizione: Presso",
        width: 18
      },
      {
        key: "order.order_shipping.address1",
        header: "Spedizione: Indirizzo 1",
        width: 20
      },
      {
        key: "order.order_shipping.address2",
        header: "Spedizione: Indirizzo 2",
        width: 20
      },
      {
        key: "order.order_shipping.city",
        header: "Spedizione: Città",
        width: 18
      },
      {
        key: "order.order_shipping.zip ",
        header: "Spedizione: CAP",
        width: 18
      },
      {
        key: "order.order_shipping.province",
        header: "Spedizione: Provincia",
        width: 18
      },
      {
        key: "order.order_shipping.country",
        header: "Spedizione: Paese",
        width: 18
      },
      {
        key: "order.order_shipping.phone",
        header: "Spedizione: Telefono",
        width: 18
      },
      {
        key: "order.order_shipping.email",
        header: "Spedizione: Indirizzo email",
        width: 22
      },
      {
        key: "order.order_shipping.price",
        header: "Spedizione: Prezzo di spadizione",
        width: 26
      },

      // Order Billing
      {
        key: "order.order_billing.to",
        header: "Fatturazione: Presso",
        width: 18
      },
      {
        key: "order.order_billing.address1",
        header: "Fatturazione: Indirizzo 1",
        width: 20
      },
      {
        key: "order.order_billing.address2",
        header: "Fatturazione: Indirizzo 2",
        width: 20
      },
      {
        key: "order.order_billing.city",
        header: "Fatturazione: Città",
        width: 18
      },
      {
        key: "order.order_billing.zip ",
        header: "Fatturazione: CAP",
        width: 18
      },
      {
        key: "order.order_billing.province",
        header: "Fatturazione: Provincia",
        width: 20
      },
      {
        key: "order.order_billing.country",
        header: "Fatturazione: Paese",
        width: 18
      },
      {
        key: "order.order_billing.phone",
        header: "Fatturazione: Telefono",
        width: 18
      },
      {
        key: "order.order_billing.email",
        header: "Fatturazione: Indirizzo email",
        width: 24
      },
      {
        key: "order.order_billing.ssn",
        header: "Fatturazione: Codice fiscale",
        width: 24
      },
      {
        key: "order.order_billing.vat",
        header: "Fatturazione: Partita IVA",
        width: 24
      },
      {
        key: "order.order_billing.sdi",
        header: "Fatturazione: Codice SDI",
        width: 24
      },
      {
        key: "order.order_billing.pec",
        header: "Fatturazione: Indirizzo PEC",
        width: 24
      },

      {
        key: "order.ordered_at",
        header: "Ordinato il",
        width: 18
      },
      {
        key: "order.archived_at",
        header: "Archiviato il",
        width: 18
      },
      {
        key: "order.created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "order.updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((order) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }
        switch (field) {
          case "order.service":
            let service = null;
            if (order.service_id !== null) {
              service = services.find(
                (service) => service.service_id === order.service_id
              )?.service;
            }
            if (service !== null) {
              row[field] = service;
            }
            break;
          case "order.channel":
            if (
              order[field.replace("order.", "")] &&
              order[field.replace("order.", "")] !== null
            ) {
              row[field] = channel_enums[order[field.replace("order.", "")]][0];
            }
            break;

          // Summary
          case "order.order_items.count":
            let order_items_count = null;
            if (order.order_items && order.order_items.length > 0) {
              order_items_count = order.order_items.length;
            }
            if (order_items_count !== null) {
              row[field] = order_items_count;
            }
            break;

          case "order.order_items.subtotal":
            let order_items_subtotal = 0;
            if (order.order_items && order.order_items.length > 0) {
              order.order_items.forEach((order_item) => {
                if (order_item.price && order_item.price !== null) {
                  order_items_subtotal += parseFloat(order_item.price);
                }
              });
            }
            row[field] = parseFloat(order_items_subtotal).toFixed(2);
            break;

          case "order.order_items.total":
            let order_items_total = 0;
            if (order.order_items && order.order_items.length > 0) {
              order.order_items.forEach((order_item) => {
                if (order_item.price && order_item.price !== null) {
                  order_items_total += parseFloat(order_item.price);
                }
              });
            }
            if (order.order_shipping && order.order_shipping.price !== null) {
              order_items_total += parseFloat(order.order_shipping.price);
            }
            row[field] = parseFloat(order_items_total).toFixed(2);
            break;

          // Order Buyer
          case "order.order_buyer.name":
            if (
              order.order_buyer &&
              order.order_buyer[field.replace("order.order_buyer.", "")] !==
                null
            ) {
              row[field] =
                order.order_buyer[field.replace("order.order_buyer.", "")];
            }
            break;
          case "order.order_buyer.surname":
            if (
              order.order_buyer &&
              order.order_buyer[field.replace("order.order_buyer.", "")] !==
                null
            ) {
              row[field] =
                order.order_buyer[field.replace("order.order_buyer.", "")];
            }
            break;
          case "order.order_buyer.ssn":
            if (
              order.order_buyer &&
              order.order_buyer[field.replace("order.order_buyer.", "")] !==
                null
            ) {
              row[field] =
                order.order_buyer[field.replace("order.order_buyer.", "")];
            }
            break;
          case "order.order_buyer.phone":
            if (
              order.order_buyer &&
              order.order_buyer[field.replace("order.order_buyer.", "")] !==
                null
            ) {
              row[field] =
                order.order_buyer[field.replace("order.order_buyer.", "")];
            }
            break;
          case "order.order_buyer.email":
            if (
              order.order_buyer &&
              order.order_buyer[field.replace("order.order_buyer.", "")] !==
                null
            ) {
              row[field] =
                order.order_buyer[field.replace("order.order_buyer.", "")];
            }
            break;

          // Order Shipping
          case "order.order_shipping.to":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.address1":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.address2":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.city":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.zip":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.province":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.country":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.phone":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.email":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;
          case "order.order_shipping.price":
            if (
              order.order_shipping &&
              order.order_shipping[
                field.replace("order.order_shipping.", "")
              ] !== null
            ) {
              row[field] =
                order.order_shipping[
                  field.replace("order.order_shipping.", "")
                ];
            }
            break;

          // Order Billing
          case "order.order_billing.to":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.address1":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.address2":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.city":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.zip":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.province":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.country":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.phone":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.email":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.ssn":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.vat":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.sdi":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;
          case "order.order_billing.pec":
            if (
              order.order_billing &&
              order.order_billing[field.replace("order.order_billing.", "")] !==
                null
            ) {
              row[field] =
                order.order_billing[field.replace("order.order_billing.", "")];
            }
            break;

          case "order.ordered_at":
            row[field] = moment(order[field.replace("order.", "")]).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            break;
          case "order.archived_at":
            row[field] = moment(order[field.replace("order.", "")]).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            break;
          case "order.created_at":
            row[field] = moment(order[field.replace("order.", "")]).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            break;
          case "order.updated_at":
            row[field] = moment(order[field.replace("order.", "")]).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            break;

          default:
            row[field] = order[field.replace("order.", "")];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "orders" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/orders/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/orders/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export ordini", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Reservations
  export_reservations: async function (job) {
    console.log("[export_reservations]", job.data);
  },

  // Components
  export_components: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const componentsIDs = await components_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          is_disassembled: fields.includes("filters")
            ? filters.is_disassembled
            : null,

          oem_code: fields.includes("filters") ? filters.oem_code : null,
          constructor_code: fields.includes("filters")
            ? filters.constructor_code
            : null,
          manufacturer_code: fields.includes("filters")
            ? filters.manufacturer_code
            : null,

          condition: fields.includes("filters") ? filters.condition : null,
          status: fields.includes("filters") ? filters.status : null,

          side: fields.includes("filters") ? filters.side : null,

          vehicle_id: fields.includes("filters") ? filters.vehicle_id : null,

          type_id: fields.includes("filters") ? filters.type_id : null,
          brand_id: fields.includes("filters") ? filters.brand_id : null,
          model_id: fields.includes("filters") ? filters.model_id : null,
          version_id: fields.includes("filters") ? filters.version_id : null,

          manufacturer_id: fields.includes("filters")
            ? filters.manufacturer_id
            : null,

          warehouse_id: fields.includes("filters")
            ? filters.warehouse_id
            : null,
          warehouse_floor_id: fields.includes("filters")
            ? filters.warehouse_floor_id
            : null,
          warehouse_lane_id: fields.includes("filters")
            ? filters.warehouse_lane_id
            : null,
          warehouse_rack_id: fields.includes("filters")
            ? filters.warehouse_rack_id
            : null,
          warehouse_shelf_id: fields.includes("filters")
            ? filters.warehouse_shelf_id
            : null,
          warehouse_bin_id: fields.includes("filters")
            ? filters.warehouse_bin_id
            : null,

          media: fields.includes("filters") ? filters.media : null,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        componentsIDs.count === 0 ||
        (componentsIDs.count > 0 && componentsIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const components = await Component.findAll({
        where: {
          component_id: componentsIDs.rows.map((c) => c.component_id)
        },
        include: [
          // Component Media
          { model: ComponentMedia, separate: true },

          // Component Scanner Code
          { model: ComponentScannerCode, separate: true },

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

          // Manufacturer
          {
            model: Manufacturer,
            include: [
              {
                model: SystemManufacturer,
                required: false
              },
              {
                model: DismantlerManufacturer,
                where: { dismantler_id: job.data.dismantler_id },
                required: false
              }
            ]
          },

          // Warehouse Bin
          {
            model: WarehouseBin,
            include: [
              {
                model: WarehouseShelf,
                include: [
                  {
                    model: WarehouseRack,
                    include: [
                      {
                        model: WarehouseLane,
                        include: [
                          {
                            model: WarehouseFloor,
                            include: [{ model: Warehouse }]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Vehicle
          { model: Vehicle, include: [{ model: VehicleEngine }] }
        ]
      });

      for (let i = 0; i < components.length; i++) {
        const component = components[i];

        // Entry
        if (component.entry) {
          if (
            !component.entry.ania_entry &&
            !component.entry.dismantler_entry
          ) {
            // Error
          }

          component.entry.entry = union_parse(component.entry, "entry");
        }

        // Version
        if (component.version) {
          if (
            !component.version.ania_version &&
            !component.version.dismantler_version
          ) {
            // Error
          }

          component.version.version = union_parse(component.version, "version");

          // Model
          if (component.version.model) {
            if (
              !component.version.model.ania_model &&
              !component.version.model.dismantler_model
            ) {
              // Error
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
                // Error
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
                  // Error
                }

                component.version.model.brand.type.type = union_parse(
                  component.version.model.brand.type,
                  "type"
                );
              }
            }
          }
        }

        // Manufacturer
        if (component.manufacturer) {
          if (
            !component.manufacturer.system_manufacturer &&
            !component.manufacturer.dismantler_manufacturer
          ) {
            // Error
          }

          component.manufacturer.manufacturer = union_parse(
            component.manufacturer,
            "manufacturer"
          );
        }

        // Component Media
        if (component.component_media && component.component_media.length > 0) {
          // Media parse
          component.component_media = media_parse(component.component_media);
        }
      }

      // Reorder component by componentsIDs
      components.sort(function (a, b) {
        return (
          componentsIDs.rows.findIndex(
            (c) => c.component_id === a.component_id
          ) -
          componentsIDs.rows.findIndex((c) => c.component_id === b.component_id)
        );
      });

      results.push(...components);

      page++;
    }

    console.log("[export_components] Components found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Componenti");

    // Columns
    const columns = [
      {
        key: "component.component_id",
        header: "ID Componente",
        width: 14
      },

      {
        key: "component.label",
        header: "Etichetta",
        width: 14
      },

      {
        key: "component.entry",
        header: "Voce",
        width: 46
      },

      {
        key: "component.side",
        header: "Lato",
        width: 10
      },

      {
        key: "component.type",
        header: "Tipo",
        width: 30
      },
      {
        key: "component.brand",
        header: "Marca",
        width: 16
      },
      {
        key: "component.model",
        header: "Modello",
        width: 30
      },
      {
        key: "component.version",
        header: "Versione",
        width: 44
      },
      {
        key: "component.version.produced_from",
        header: "Commercializzato dal",
        width: 18
      },
      {
        key: "component.version.produced_to",
        header: "Commercializzato fino al",
        width: 20
      },

      // TODO Evaluate if expose the IDs
      {
        key: "component.vehicle_id",
        header: "ID Veicolo",
        width: 12
      },
      {
        key: "component.version_id",
        header: "ID Versione",
        width: 12
      },
      {
        key: "component.entry_id",
        header: "ID Voce",
        width: 12
      },

      {
        key: "component.is_disassembled",
        header: "Smontato",
        width: 14
      },

      {
        key: "component.oem_code",
        header: "Codice OEM",
        width: 16
      },
      {
        key: "component.constructor_code",
        header: "Codice costruttore",
        width: 16
      },
      {
        key: "component.manufacturer",
        header: "Produttore",
        width: 14
      },
      {
        key: "component.manufacturer_code",
        header: "Codice produttore",
        width: 20
      },
      {
        key: "component.other_codes",
        header: "Codici ulteriori",
        width: 20
      },

      {
        key: "component.weight",
        header: "Peso",
        width: 24
      },

      {
        key: "component.condition",
        header: "Condizione",
        width: 12
      },
      {
        key: "component.status",
        header: "Status",
        width: 18
      },

      {
        key: "component.list_price",
        header: "Prezzo di listino",
        width: 20
      },
      {
        key: "component.counter_price",
        header: "Prezzo al banco",
        width: 18
      },

      // Warehouse
      {
        key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse",
        header: "Magazzino: Magazzino",
        width: 20
      },
      {
        key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.floor",
        header: "Magazzino: Piano",
        width: 18
      },
      {
        key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.lane",
        header: "Magazzino: Corsia",
        width: 18
      },
      {
        key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.rack",
        header: "Magazzino: Scaffale",
        width: 18
      },
      {
        key: "component.warehouse_bin.warehouse_shelf.shelf",
        header: "Magazzino: Ripiano",
        width: 18
      },
      {
        key: "component.warehouse_bin.bin",
        header: "Magazzino: Contenitore",
        width: 20
      },

      // Vehicle
      {
        key: "component.vehicle.code",
        header: "Veicolo associato: ID Pratica",
        width: 24
      },
      {
        key: "component.vehicle.plate",
        header: "Veicolo associato: Targa",
        width: 20
      },
      {
        key: "component.vehicle.vin",
        header: "Veicolo associato: Telaio",
        width: 20
      },
      {
        key: "component.vehicle.registered_at",
        header: "Veicolo associato: Data immatricolazione",
        width: 36
      },
      {
        key: "component.vehicle.km",
        header: "Veicolo associato: Chilometri",
        width: 24
      },
      {
        key: "component.vehicle.notes",
        header: "Veicolo associato: Note",
        width: 26
      },
      {
        key: "component.vehicle.vehicle_engine.code",
        header: "Veicolo associato: Motore: Codice",
        width: 30
      },
      {
        key: "component.vehicle.vehicle_engine.propulsion",
        header: "Veicolo associato: Motore: Propulsione",
        width: 32
      },

      {
        key: "component.notes",
        header: "Note",
        width: 26
      },

      {
        key: "component.component_scanner_codes",
        header: "Codici scanner",
        width: 30
      },

      {
        key: "component.images",
        header: "Fotografie",
        width: 26
      },

      {
        key: "component.created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "component.updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((component) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }
        switch (field) {
          case "component.is_disassembled":
            if (
              component[field.replace("component.", "")] &&
              component[field.replace("component.", "")] !== null
            ) {
              row[field] =
                component_enums.is_disassembled[
                  component[field.replace("component.", "")].toString() ===
                  "true"
                    ? 1
                    : 0
                ][0];
            }
            break;

          case "component.entry":
            let entry = null;
            if (
              component.entry !== null &&
              component.entry.entry !== undefined
            ) {
              if (component.entry.entry_type === "ania_entry") {
                // ANIA Entry
                entry = component.entry.entry.ania_entry;

                if (component.entry.entry.dismantler_ania_entries?.length > 0) {
                  if (
                    component.entry.entry.dismantler_ania_entries[0].entry !==
                    null
                  ) {
                    entry =
                      component.entry.entry.dismantler_ania_entries[0].entry;
                  }
                }
              } else {
                // Dismantler Entry
                entry = component.entry.entry.dismantler_entry;
              }
            }

            if (entry !== null) {
              row[field] = entry;
            }
            break;

          case "component.side":
            if (
              component[field.replace("component.", "")] &&
              component[field.replace("component.", "")] !== null
            ) {
              row[field] =
                side_enums[component[field.replace("component.", "")]][0];
            }
            break;

          case "component.type":
            let type = null;
            if (component.version.model.brand.type.type_type == "ania_type") {
              type = component.version.model.brand.type.type.ania_type;
            }
            if (
              component.version.model.brand.type.type_type == "dismantler_type"
            ) {
              type = component.version.model.brand.type.type.dismantler_type;
            }
            if (type !== null) {
              row[field] = type;
            }
            break;

          case "component.brand":
            let brand = null;
            if (component.version.model.brand.brand_type == "ania_brand") {
              brand = component.version.model.brand.brand.ania_brand;
            }
            if (
              component.version.model.brand.brand_type == "dismantler_brand"
            ) {
              brand = component.version.model.brand.brand.dismantler_brand;
            }
            if (brand !== null) {
              row[field] = brand;
            }
            break;
          case "component.model":
            let model = null;
            if (component.version.model.model_type == "ania_model") {
              model = component.version.model.model.ania_model;
            }
            if (component.version.model.model_type == "dismantler_model") {
              model = component.version.model.model.dismantler_model;
            }
            if (model !== null) {
              row[field] = model;
            }
            break;
          case "component.version":
            let version = null;
            if (component.version.version_type === "ania_version") {
              version = component.version.version.ania_version;
            }
            if (component.version.version_type === "dismantler_version") {
              version = component.version.version.dismantler_version;
            }
            if (version !== null) {
              row[field] = version;
            }
            break;
          case "component.version.produced_from":
            let produced_from = null;
            if (component.version.version_type === "ania_version") {
              produced_from = component.version.ania_version.produced_from;
            }
            if (produced_from !== null) {
              row[field] = moment(produced_from).format("DD-MM-YYYY");
            }
            break;
          case "component.version.produced_to":
            let produced_to = null;
            if (component.version.version_type === "ania_version") {
              produced_to = component.version.ania_version.produced_to;
            }
            if (produced_to !== null) {
              row[field] = moment(produced_to).format("DD-MM-YYYY");
            }
            break;

          case "component.status":
            if (
              component[field.replace("component.", "")] &&
              component[field.replace("component.", "")] !== null
            ) {
              row[field] =
                component_enums.status[
                  component[field.replace("component.", "")]
                ][0];
            }
            break;
          case "component.condition":
            if (
              component[field.replace("component.", "")] &&
              component[field.replace("component.", "")] !== null
            ) {
              row[field] =
                component_enums.condition[
                  component[field.replace("component.", "")]
                ][0];
            }
            break;

          // Warehouse
          case "component.warehouse_bin.bin":
            if (component.warehouse_bin) {
              if (component.warehouse_bin.default === true) {
                row[field] = "Su ripiano";
              } else {
                row[field] = component.warehouse_bin.bin;
              }
            }
            break;
          case "component.warehouse_bin.warehouse_shelf.shelf":
            if (
              component.warehouse_bin &&
              component.warehouse_bin.warehouse_shelf
            ) {
              row[field] = component.warehouse_bin.warehouse_shelf.shelf;
            }
            break;
          case "component.warehouse_bin.warehouse_shelf.warehouse_rack.rack":
            if (
              component.warehouse_bin &&
              component.warehouse_bin.warehouse_shelf &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
            ) {
              row[field] =
                component.warehouse_bin.warehouse_shelf.warehouse_rack.rack;
            }
            break;
          case "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.lane":
            if (
              component.warehouse_bin &&
              component.warehouse_bin.warehouse_shelf &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
                .warehouse_lane
            ) {
              row[field] =
                component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.lane;
            }
            break;
          case "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.floor":
            if (
              component.warehouse_bin &&
              component.warehouse_bin.warehouse_shelf &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
                .warehouse_lane &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
                .warehouse_lane.warehouse_floor
            ) {
              row[field] =
                component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.floor;
            }
            break;
          case "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse":
            if (
              component.warehouse_bin &&
              component.warehouse_bin.warehouse_shelf &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
                .warehouse_lane &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
                .warehouse_lane.warehouse_floor &&
              component.warehouse_bin.warehouse_shelf.warehouse_rack
                .warehouse_lane.warehouse_floor.warehouse
            ) {
              row[field] =
                component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse;
            }
            break;

          // Vehicle
          case "component.vehicle.code":
            if (component.vehicle) {
              row[field] = component.vehicle.code;
            }
            break;
          case "component.vehicle.plate":
            if (component.vehicle) {
              row[field] = component.vehicle.plate;
            }
            break;
          case "component.vehicle.vin":
            if (component.vehicle) {
              row[field] = component.vehicle.vin;
            }
            break;
          case "component.vehicle.registered_at":
            if (component.vehicle) {
              if (component.vehicle.registered_at !== null) {
                row[field] = moment(component.vehicle.registered_at).format(
                  "DD-MM-YYYY"
                );
              }
            }
            break;
          case "component.vehicle.km":
            if (component.vehicle) {
              if (component.vehicle.km !== null) {
                row[field] = component.vehicle.km;
              }
            }
            break;
          case "component.vehicle.notes":
            if (component.vehicle) {
              if (component.vehicle.notes !== null) {
                row[field] = component.vehicle.notes;
              }
            }
            break;
          case "component.vehicle.vehicle_engine.code":
            if (component.vehicle) {
              if (component.vehicle.vehicle_engine !== null) {
                if (component.vehicle.vehicle_engine.code !== null) {
                  row[field] = component.vehicle.vehicle_engine.code;
                }
              }
            }
            break;
          case "component.vehicle.vehicle_engine.propulsion":
            if (component.vehicle) {
              if (component.vehicle.vehicle_engine !== null) {
                if (component.vehicle.vehicle_engine.propulsion !== null) {
                  row[field] =
                    vehicle_engine_enums.propulsion[
                      component.vehicle.vehicle_engine.propulsion
                    ][0];
                }
              }
            }
            break;

          // Scanner codes
          case "component.component_scanner_codes":
            let component_scanner_codes = [];
            if (component.component_scanner_codes.length > 0) {
              component_scanner_codes = component.component_scanner_codes.map(
                (component_scanner_code) => component_scanner_code.scanner_code
              );
              row[field] = component_scanner_codes.join(", ");
            }
            break;

          // Media
          case "component.images":
            let images = [];
            if (component.component_media.length > 0) {
              images = component.component_media.filter(
                (component_media) => component_media.media_type === "image"
              );
            }
            if (images.length > 0) {
              images = images.map((image) => {
                return `https://twice-parts.fra1.digitaloceanspaces.com/components/img/${image.media.filename}`;
              });
              row[field] = images.join(", ");
            }
            break;

          case "component.created_at":
            row[field] = moment(
              component[field.replace("component.", "")]
            ).format("DD-MM-YYYY HH:mm:ss");
            break;
          case "component.updated_at":
            row[field] = moment(
              component[field.replace("component.", "")]
            ).format("DD-MM-YYYY HH:mm:ss");
            break;

          default:
            row[field] = component[field.replace("component.", "")];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet
        .getColumn("component.vehicle.notes")
        .eachCell(function (cell, rowNumber) {
          cell.alignment = { wrapText: true };
        });

      worksheet
        .getColumn("component.notes")
        .eachCell(function (cell, rowNumber) {
          cell.alignment = { wrapText: true };
        });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "components" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/components/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/components/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export componenti", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Vehicles
  export_vehicles: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const vehiclesIDs = await vehicles_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          type_id: fields.includes("filters") ? filters.type_id : null,
          brand_id: fields.includes("filters") ? filters.brand_id : null,
          model_id: fields.includes("filters") ? filters.model_id : null,
          version_id: fields.includes("filters") ? filters.version_id : null,

          deposit_id: fields.includes("filters") ? filters.deposit_id : null,
          deposit_lot_id: fields.includes("filters")
            ? filters.deposit_lot_id
            : null,
          deposit_lane_id: fields.includes("filters")
            ? filters.deposit_lane_id
            : null,
          deposit_placement_id: fields.includes("filters")
            ? filters.deposit_placement_id
            : null,
          deposit_floor_id: fields.includes("filters")
            ? filters.deposit_floor_id
            : null,

          status: fields.includes("filters") ? filters.status : null,

          media: fields.includes("filters") ? filters.media : null,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        vehiclesIDs.count === 0 ||
        (vehiclesIDs.count > 0 && vehiclesIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const vehicles = await Vehicle.findAll({
        where: {
          vehicle_id: vehiclesIDs.rows.map((c) => c.vehicle_id)
        },
        include: [
          // Vehicle Media
          { model: VehicleMedia, separate: true },

          // Vehicle Scanner Code
          { model: VehicleScannerCode, separate: true },

          // Deposit Floor
          {
            model: DepositFloor,
            include: [
              {
                model: DepositPlacement,
                include: [
                  {
                    model: DepositLane,
                    include: [
                      {
                        model: DepositLot,
                        include: [{ model: Deposit }]
                      }
                    ]
                  }
                ]
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

          // Vehicle Engine
          { model: VehicleEngine },

          // Vehicle Transmission
          { model: VehicleTransmission },

          // Vehicle Acceptance
          { model: VehicleAcceptance },

          // Vehicle Drainage
          { model: VehicleDrainage },

          // Vehicle Body
          { model: VehicleBody }
        ]
      });

      for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];

        // Version
        if (vehicle.version) {
          if (
            !vehicle.version.ania_version &&
            !vehicle.version.dismantler_version
          ) {
            // Error
          }

          vehicle.version.version = union_parse(vehicle.version, "version");

          // Model
          if (vehicle.version.model) {
            if (
              !vehicle.version.model.ania_model &&
              !vehicle.version.model.dismantler_model
            ) {
              // Error
            }

            vehicle.version.model.model = union_parse(
              vehicle.version.model,
              "model"
            );

            // Brand
            if (vehicle.version.model.brand) {
              if (
                !vehicle.version.model.brand.ania_brand &&
                !vehicle.version.model.brand.dismantler_brand
              ) {
                // Error
              }

              vehicle.version.model.brand.brand = union_parse(
                vehicle.version.model.brand,
                "brand"
              );

              // Type
              if (vehicle.version.model.brand.type) {
                if (
                  !vehicle.version.model.brand.type.ania_type &&
                  !vehicle.version.model.brand.type.dismantler_type
                ) {
                  // Error
                }

                vehicle.version.model.brand.type.type = union_parse(
                  vehicle.version.model.brand.type,
                  "type"
                );
              }
            }
          }
        }

        // Vehicle Media
        if (vehicle.vehicle_media && vehicle.vehicle_media.length > 0) {
          // Media parse
          vehicle.vehicle_media = media_parse(vehicle.vehicle_media);
        }
      }

      // Reorder vehicle by vehiclesIDs
      vehicles.sort(function (a, b) {
        return (
          vehiclesIDs.rows.findIndex((c) => c.vehicle_id === a.vehicle_id) -
          vehiclesIDs.rows.findIndex((c) => c.vehicle_id === b.vehicle_id)
        );
      });

      results.push(...vehicles);

      page++;
    }

    console.log("[export_vehicles] Vehicles found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Veicoli");

    // Columns
    const columns = [
      {
        key: "vehicle.vehicle_id",
        header: "ID Veicolo",
        width: 9
      },

      {
        key: "vehicle.code",
        header: "ID Pratica",
        width: 10
      },

      {
        key: "vehicle.vehicle_acceptance.accepted_at",
        header: "Accettazione: Data accettazione",
        width: 24
      },
      {
        key: "vehicle.vehicle_drainage.drained_at",
        header: "Bonifica: Data bonifica",
        width: 24
      },
      {
        key: "vehicle.vehicle_acceptance.purchase_price",
        header: "Accettazione: Prezzo d'acquisto",
        width: 24
      },
      {
        key: "vehicle.vehicle_acceptance.purchased_from",
        header: "Accettazione: Acquistato da",
        width: 30
      },

      {
        key: "vehicle.plate",
        header: "Targa",
        width: 10
      },
      {
        key: "vehicle.registered_at",
        header: "Data immatricolazione",
        width: 10
      },
      {
        key: "vehicle.type",
        header: "Tipo",
        width: 16
      },
      {
        key: "vehicle.brand",
        header: "Marca",
        width: 16
      },
      {
        key: "vehicle.model",
        header: "Modello",
        width: 30
      },
      {
        key: "vehicle.version",
        header: "Versione",
        width: 44
      },

      {
        key: "vehicle.produced_from",
        header: "Commercializzato dal",
        width: 10
      },
      {
        key: "vehicle.produced_to",
        header: "Commercializzato fino al",
        width: 24
      },

      {
        key: "vehicle.vin",
        header: "Telaio",
        width: 14
      },
      {
        key: "vehicle.km",
        header: "Chilometri",
        width: 20
      },
      {
        key: "vehicle.keys",
        header: "Chiavi",
        width: 8
      },
      {
        key: "vehicle.status",
        header: "Status",
        width: 18
      },
      {
        key: "vehicle.notes",
        header: "Note",
        width: 18
      },

      // Vehicle Engine
      {
        key: "vehicle.vehicle_engine.is_available",
        header: "Motore: Motore",
        width: 18
      },
      {
        key: "vehicle.vehicle_engine.code",
        header: "Motore: Codice",
        width: 24
      },
      {
        key: "vehicle.vehicle_engine.propulsion",
        header: "Motore: Propulsione",
        width: 24
      },
      {
        key: "vehicle.vehicle_engine.kw",
        header: "Motore: kW",
        width: 12
      },
      {
        key: "vehicle.vehicle_engine.hp",
        header: "Motore: CV",
        width: 12
      },
      {
        key: "vehicle.vehicle_engine.displacement",
        header: "Motore: Cilindrata",
        width: 18
      },
      {
        key: "vehicle.vehicle_engine.cylinders",
        header: "Motore: Cilindri",
        width: 12
      },
      {
        key: "vehicle.vehicle_engine.valves",
        header: "Motore: Valvole",
        width: 12
      },
      {
        key: "vehicle.vehicle_engine.is_tested",
        header: "Motore: Testato",
        width: 16
      },
      {
        key: "vehicle.vehicle_engine.condition",
        header: "Motore: Condizione",
        width: 20
      },
      {
        key: "vehicle.vehicle_engine.notes",
        header: "Motore: Note",
        width: 30
      },

      // Vehicle Transmission
      {
        key: "vehicle.vehicle_transmission.is_available",
        header: "Trasmissione: Trasmissione",
        width: 18
      },
      {
        key: "vehicle.vehicle_transmission.code",
        header: "Trasmissione: Codice",
        width: 24
      },
      {
        key: "vehicle.vehicle_transmission.type",
        header: "Trasmissione: Tipologia",
        width: 18
      },
      {
        key: "vehicle.vehicle_transmission.drive",
        header: "Trasmissione: Trazione",
        width: 18
      },
      {
        key: "vehicle.vehicle_transmission.gears",
        header: "Trasmissione: Numero marce",
        width: 12
      },
      {
        key: "vehicle.vehicle_transmission.has_reverse",
        header: "Trasmissione: Retromarcia",
        width: 18
      },
      {
        key: "vehicle.vehicle_transmission.is_tested",
        header: "Trasmissione: Testato",
        width: 18
      },
      {
        key: "vehicle.vehicle_transmission.condition",
        header: "Trasmissione: Condizione",
        width: 20
      },
      {
        key: "vehicle.vehicle_transmission.notes",
        header: "Trasmissione: Note",
        width: 30
      },

      // Vehicle Body
      {
        key: "vehicle.vehicle_body.color",
        header: "Carrozzeria: Colore",
        width: 18
      },
      {
        key: "vehicle.vehicle_body.color_code",
        header: "Carrozzeria: Codice colore",
        width: 24
      },
      {
        key: "vehicle.vehicle_body.finish",
        header: "Carrozzeria: Finitura",
        width: 18
      },
      {
        key: "vehicle.vehicle_body.notes",
        header: "Carrozzeria: Note",
        width: 30
      },

      {
        key: "vehicle.counter_price",
        header: "Prezzo al banco",
        width: 18
      },

      // Deposit
      {
        key: "vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot.deposit.deposit",
        header: "Deposito: Deposito",
        width: 18
      },
      {
        key: "vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot.lot",
        header: "Deposito: Piazzale",
        width: 18
      },
      {
        key: "vehicle.deposit_floor.deposit_placement.deposit_lane.lane",
        header: "Deposito: Corsia",
        width: 18
      },
      {
        key: "vehicle.deposit_floor.deposit_placement.placement",
        header: "Deposito: Postazione",
        width: 18
      },
      {
        key: "vehicle.deposit_floor.floor",
        header: "Deposito: Piano",
        width: 18
      },

      {
        key: "vehicle.vehicle_scanner_codes",
        header: "Codici scanner",
        width: 30
      },

      {
        key: "vehicle.created_at",
        header: "Creato il",
        width: 30
      },
      {
        key: "vehicle.updated_at",
        header: "Aggiornato il",
        width: 30
      },
      {
        key: "vehicle.archived_at",
        header: "Archiviato il",
        width: 30
      },
      {
        key: "vehicle.pressed_at",
        header: "Pressato il",
        width: 30
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((vehicle) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }

        switch (field) {
          case "vehicle.status":
            if (
              vehicle[field.replace("vehicle.", "")] &&
              vehicle[field.replace("vehicle.", "")] !== null
            ) {
              row[field] =
                vehicle_enums.status[vehicle[field.replace("vehicle.", "")]][0];
            }
            break;

          case "vehicle.produced_from":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;
          case "vehicle.produced_to":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;
          case "vehicle.registered_at":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;

          case "vehicle.vehicle_scanner_codes":
            let vehicle_scanner_codes = [];
            if (vehicle.vehicle_scanner_codes?.length > 0) {
              vehicle_scanner_codes = vehicle.vehicle_scanner_codes.map(
                (vehicle_scanner_code) => vehicle_scanner_code.scanner_code
              );
              row[field] = vehicle_scanner_codes.join(", ");
            }
            break;

          // Deposit
          case "vehicle.deposit_floor.floor":
            if (vehicle.deposit_floor) {
              if (vehicle.deposit_floor.default === true) {
                row[field] = "Piano terra";
              } else {
                row[field] = vehicle.deposit_floor.floor;
              }
            }
            break;
          case "vehicle.deposit_floor.deposit_placement.placement":
            if (
              vehicle.deposit_floor &&
              vehicle.deposit_floor.deposit_placement
            ) {
              row[field] = vehicle.deposit_floor.deposit_placement.placement;
            }
            break;
          case "vehicle.deposit_floor.deposit_placement.deposit_lane.lane":
            if (
              vehicle.deposit_floor &&
              vehicle.deposit_floor.deposit_placement &&
              vehicle.deposit_floor.deposit_placement.deposit_lane
            ) {
              row[field] =
                vehicle.deposit_floor.deposit_placement.deposit_lane.lane;
            }
            break;
          case "vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot.lot":
            if (
              vehicle.deposit_floor &&
              vehicle.deposit_floor.deposit_placement &&
              vehicle.deposit_floor.deposit_placement.deposit_lane &&
              vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot
            ) {
              row[field] =
                vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot.lot;
            }
            break;
          case "vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot.deposit.deposit":
            if (
              vehicle.deposit_floor &&
              vehicle.deposit_floor.deposit_placement &&
              vehicle.deposit_floor.deposit_placement.deposit_lane &&
              vehicle.deposit_floor.deposit_placement.deposit_lane
                .deposit_lot &&
              vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot
                .deposit
            ) {
              row[field] =
                vehicle.deposit_floor.deposit_placement.deposit_lane.deposit_lot.deposit.deposit;
            }
            break;

          // Version
          case "vehicle.type":
            let type = null;
            if (vehicle.version.model.brand.type.type_type == "ania_type") {
              type = vehicle.version.model.brand.type.type.ania_type;
            }
            if (
              vehicle.version.model.brand.type.type_type == "dismantler_type"
            ) {
              type = vehicle.version.model.brand.type.type.dismantler_type;
            }
            if (type !== null) {
              row[field] = type;
            }
            break;

          case "vehicle.brand":
            let brand = null;
            if (vehicle.version.model.brand.brand_type == "ania_brand") {
              brand = vehicle.version.model.brand.brand.ania_brand;
            }
            if (vehicle.version.model.brand.brand_type == "dismantler_brand") {
              brand = vehicle.version.model.brand.brand.dismantler_brand;
            }
            if (brand !== null) {
              row[field] = brand;
            }
            break;
          case "vehicle.model":
            let model = null;
            if (vehicle.version.model.model_type == "ania_model") {
              model = vehicle.version.model.model.ania_model;
            }
            if (vehicle.version.model.model_type == "dismantler_model") {
              model = vehicle.version.model.model.dismantler_model;
            }
            if (model !== null) {
              row[field] = model;
            }
            break;
          case "vehicle.version":
            let version = null;
            if (vehicle.version.version_type === "ania_version") {
              version = vehicle.version.version.ania_version;
            }
            if (vehicle.version.version_type === "dismantler_version") {
              version = vehicle.version.version.dismantler_version;
            }
            if (version !== null) {
              row[field] = version;
            }
            break;

          // Vehicle Acceptance
          case "vehicle.vehicle_acceptance.accepted_at":
            row[field] =
              vehicle.vehicle_acceptance[
                field.replace("vehicle.vehicle_acceptance.", "")
              ] !== null
                ? moment(
                    vehicle.vehicle_acceptance[
                      field.replace("vehicle.vehicle_acceptance.", "")
                    ]
                  ).format("DD-MM-YYYY HH:mm:ss")
                : null;
            break;
          case "vehicle.vehicle_acceptance.purchase_price":
            row[field] = vehicle.vehicle_acceptance?.purchase_price ?? null;
            break;
          case "vehicle.vehicle_acceptance.purchased_from":
            row[field] = vehicle.vehicle_acceptance?.purchased_from ?? null;
            break;

          // Vehicle Drainage
          case "vehicle.vehicle_drainage.drained_at":
            row[field] =
              vehicle.vehicle_drainage[
                field.replace("vehicle.vehicle_drainage.", "")
              ] !== null
                ? moment(
                    vehicle.vehicle_drainage[
                      field.replace("vehicle.vehicle_drainage.", "")
                    ]
                  ).format("DD-MM-YYYY HH:mm:ss")
                : null;
            break;

          // Vehicle Engine
          case "vehicle.vehicle_engine.is_available":
            if (
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] &&
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] !== null
            ) {
              row[field] =
                is_available_enums[
                  vehicle.vehicle_engine[
                    field.replace("vehicle.vehicle_engine.", "")
                  ].toString() === "true"
                    ? 1
                    : 0
                ][0];
            }
            break;

          case "vehicle.vehicle_engine.code":
            row[field] = vehicle.vehicle_engine?.code ?? null;
            break;
          case "vehicle.vehicle_engine.propulsion":
            if (
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] &&
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_engine_enums.propulsion[
                  vehicle.vehicle_engine[
                    field.replace("vehicle.vehicle_engine.", "")
                  ]
                ][0];
            }
            break;
          case "vehicle.vehicle_engine.kw":
            row[field] = vehicle.vehicle_engine?.kw ?? null;
            break;
          case "vehicle.vehicle_engine.hp":
            row[field] = vehicle.vehicle_engine?.hp ?? null;
            break;
          case "vehicle.vehicle_engine.displacement":
            row[field] = vehicle.vehicle_engine?.displacement ?? null;
            break;
          case "vehicle.vehicle_engine.cylinders":
            row[field] = vehicle.vehicle_engine?.cylinders ?? null;
            break;
          case "vehicle.vehicle_engine.valves":
            row[field] = vehicle.vehicle_engine?.valves ?? null;
            break;
          case "vehicle.vehicle_engine.is_tested":
            if (
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] &&
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] !== null
            ) {
              row[field] =
                is_tested_enums[
                  vehicle.vehicle_engine[
                    field.replace("vehicle.vehicle_engine.", "")
                  ].toString() === "true"
                    ? 1
                    : 0
                ][0];
            }
            break;
          case "vehicle.vehicle_engine.condition":
            if (
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] &&
              vehicle.vehicle_engine[
                field.replace("vehicle.vehicle_engine.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_engine_enums.condition[
                  vehicle.vehicle_engine[
                    field.replace("vehicle.vehicle_engine.", "")
                  ]
                ][0];
            }
            break;
          case "vehicle.vehicle_engine.notes":
            row[field] = vehicle.vehicle_engine?.notes ?? null;
            break;

          // Vehicle Transmission
          case "vehicle.vehicle_transmission.is_available":
            if (
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] &&
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] !== null
            ) {
              row[field] =
                is_available_enums[
                  vehicle.vehicle_transmission[
                    field.replace("vehicle.vehicle_transmission.", "")
                  ].toString() === "true"
                    ? 1
                    : 0
                ][0];
            }
            break;
          case "vehicle.vehicle_transmission.code":
            row[field] = vehicle.vehicle_transmission?.code ?? null;
            break;
          case "vehicle.vehicle_transmission.type":
            if (
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] &&
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_transmission_enums.type[
                  vehicle.vehicle_transmission[
                    field.replace("vehicle.vehicle_transmission.", "")
                  ]
                ][0];
            }
            break;
          case "vehicle.vehicle_transmission.gears":
            row[field] = vehicle.vehicle_transmission?.gears ?? null;
            break;
          case "vehicle.vehicle_transmission.has_reverse":
            if (
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] &&
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_transmission_enums.has_reverse[
                  vehicle.vehicle_transmission[
                    field.replace("vehicle.vehicle_transmission.", "")
                  ].toString() === "true"
                    ? 1
                    : 0
                ][0];
            }
            break;
          case "vehicle.vehicle_transmission.drive":
            if (
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] &&
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_transmission_enums.drive[
                  vehicle.vehicle_transmission[
                    field.replace("vehicle.vehicle_transmission.", "")
                  ]
                ][0];
            }
            break;
          case "vehicle.vehicle_transmission.is_tested":
            if (
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] &&
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] !== null
            ) {
              row[field] =
                is_tested_enums[
                  vehicle.vehicle_transmission[
                    field.replace("vehicle.vehicle_transmission.", "")
                  ].toString() === "true"
                    ? 1
                    : 0
                ][0];
            }
            break;
          case "vehicle.vehicle_transmission.condition":
            if (
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] &&
              vehicle.vehicle_transmission[
                field.replace("vehicle.vehicle_transmission.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_transmission_enums.condition[
                  vehicle.vehicle_transmission[
                    field.replace("vehicle.vehicle_transmission.", "")
                  ]
                ][0];
            }
            break;
          case "vehicle.vehicle_transmission.notes":
            row[field] = vehicle.vehicle_transmission?.notes ?? null;
            break;

          // Vehicle Body
          case "vehicle.vehicle_body.color":
            row[field] = vehicle.vehicle_body?.color ?? null;
            break;
          case "vehicle.vehicle_body.color_code":
            row[field] = vehicle.vehicle_body?.color_code ?? null;
            break;
          case "vehicle.vehicle_body.finish":
            if (
              vehicle.vehicle_body[
                field.replace("vehicle.vehicle_body.", "")
              ] &&
              vehicle.vehicle_body[
                field.replace("vehicle.vehicle_body.", "")
              ] !== null
            ) {
              row[field] =
                vehicle_body_enums.finish[
                  vehicle.vehicle_body[
                    field.replace("vehicle.vehicle_body.", "")
                  ]
                ][0];
            }
            break;
          case "vehicle.vehicle_body.notes":
            row[field] = vehicle.vehicle_body?.notes ?? null;
            break;

          case "vehicle.created_at":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;
          case "vehicle.updated_at":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;
          case "vehicle.archived_at":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;
          case "vehicle.pressed_at":
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? moment(vehicle[field.replace("vehicle.", "")]).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : null;
            break;

          default:
            row[field] =
              vehicle[field.replace("vehicle.", "")] !== null
                ? vehicle[field.replace("vehicle.", "")]
                : null;
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet.getColumn("notes").eachCell(function (cell, rowNumber) {
        cell.alignment = { wrapText: true };
      });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "vehicles" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/vehicles/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/vehicles/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export veicoli", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Tyres
  export_tyres: async function (job) {
    console.log("[export_tyres]", job.data);
  },

  // Wheels
  export_wheels: async function (job) {
    console.log("[export_wheels]", job.data);
  },

  // Clients
  export_clients: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const clientsIDs = await clients_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          billing: fields.includes("filters") ? filters.billing : null,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        clientsIDs.count === 0 ||
        (clientsIDs.count > 0 && clientsIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const clients = await Client.findAll({
        include: [],
        where: {
          client_id: clientsIDs.rows.map((c) => c.client_id)
        }
      });

      // TODO for (let i = 0; i < clients.length; i++)

      // Reorder client by clientsIDs
      clients.sort(function (a, b) {
        return (
          clientsIDs.rows.findIndex((c) => c.client_id === a.client_id) -
          clientsIDs.rows.findIndex((c) => c.client_id === b.client_id)
        );
      });

      results.push(...clients);

      page++;
    }

    console.log("[export_clients] Clients found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Clienti");

    // Columns
    const columns = [
      {
        key: "client_id",
        header: "ID Cliente",
        width: 9
      },
      {
        key: "name",
        header: "Nome",
        width: 10
      },
      {
        key: "surname",
        header: "Cognome",
        width: 10
      },
      {
        key: "ssn",
        header: "Codice fiscale",
        width: 14
      },
      {
        key: "phone",
        header: "Telefono",
        width: 10
      },
      {
        key: "email",
        header: "Email",
        width: 24
      },
      {
        key: "website",
        header: "Sito web",
        width: 12
      },
      {
        key: "notes",
        header: "Note",
        width: 20
      },

      {
        key: "created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((client) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }

        switch (field) {
          case "created_at":
            row[field] = moment(client[field]).format("DD-MM-YYYY HH:mm:ss");
            break;
          case "updated_at":
            row[field] = moment(client[field]).format("DD-MM-YYYY HH:mm:ss");
            break;

          default:
            row[field] = client[field];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet.getColumn("notes").eachCell(function (cell, rowNumber) {
        cell.alignment = { wrapText: true };
      });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "clients" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/clients/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/clients/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export clienti", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Warehouses
  export_warehouses: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const warehousesIDs = await warehouses_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        warehousesIDs.count === 0 ||
        (warehousesIDs.count > 0 && warehousesIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const warehouses = await Warehouse.findAll({
        include: [],
        where: {
          warehouse_id: warehousesIDs.rows.map((c) => c.warehouse_id)
        }
      });

      // TODO for (let i = 0; i < warehouses.length; i++)

      // Reorder warehouse by warehousesIDs
      warehouses.sort(function (a, b) {
        return (
          warehousesIDs.rows.findIndex(
            (c) => c.warehouse_id === a.warehouse_id
          ) -
          warehousesIDs.rows.findIndex((c) => c.warehouse_id === b.warehouse_id)
        );
      });

      results.push(...warehouses);

      page++;
    }

    console.log("[export_warehouses] Warehouses found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Magazzini");

    // Columns
    const columns = [
      {
        key: "warehouse_id",
        header: "ID Magazzino",
        width: 9
      },
      {
        key: "warehouse",
        header: "Magazzino",
        width: 10
      },

      {
        key: "created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((warehouse) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }

        switch (field) {
          case "created_at":
            row[field] = moment(warehouse[field]).format("DD-MM-YYYY HH:mm:ss");
            break;
          case "updated_at":
            row[field] = moment(warehouse[field]).format("DD-MM-YYYY HH:mm:ss");
            break;

          default:
            row[field] = warehouse[field];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet.getColumn("notes").eachCell(function (cell, rowNumber) {
        cell.alignment = { wrapText: true };
      });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "warehouses" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/warehouses/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/warehouses/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export magazzini", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Deposits
  export_deposits: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const depositsIDs = await deposits_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        depositsIDs.count === 0 ||
        (depositsIDs.count > 0 && depositsIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const deposits = await Deposit.findAll({
        include: [],
        where: {
          deposit_id: depositsIDs.rows.map((c) => c.deposit_id)
        }
      });

      // TODO for (let i = 0; i < deposits.length; i++)

      // Reorder deposit by depositsIDs
      deposits.sort(function (a, b) {
        return (
          depositsIDs.rows.findIndex((c) => c.deposit_id === a.deposit_id) -
          depositsIDs.rows.findIndex((c) => c.deposit_id === b.deposit_id)
        );
      });

      results.push(...deposits);

      page++;
    }

    console.log("[export_deposits] Deposits found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Depositi");

    // Columns
    const columns = [
      {
        key: "deposit_id",
        header: "ID Deposito",
        width: 11
      },
      {
        key: "deposit",
        header: "Deposito",
        width: 10
      },

      {
        key: "created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((deposit) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }

        switch (field) {
          case "created_at":
            row[field] = moment(deposit[field]).format("DD-MM-YYYY HH:mm:ss");
            break;
          case "updated_at":
            row[field] = moment(deposit[field]).format("DD-MM-YYYY HH:mm:ss");
            break;

          default:
            row[field] = deposit[field];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet.getColumn("notes").eachCell(function (cell, rowNumber) {
        cell.alignment = { wrapText: true };
      });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "deposits" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/deposits/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/deposits/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export depositi", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Accesses
  export_accesses: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const accessesIDs = await accesses_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          is_active: fields.includes("filters") ? filters.is_active : null,
          all: fields.includes("filters") ? filters.all : null,

          archived_at: fields.includes("filters") ? filters.archived_at : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        accessesIDs.count === 0 ||
        (accessesIDs.count > 0 && accessesIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const accesses = await Access.findAll({
        include: [],
        where: {
          access_id: accessesIDs.rows.map((c) => c.access_id)
        }
      });

      // TODO for (let i = 0; i < accesses.length; i++)

      // Reorder access by accessesIDs
      accesses.sort(function (a, b) {
        return (
          accessesIDs.rows.findIndex((c) => c.access_id === a.access_id) -
          accessesIDs.rows.findIndex((c) => c.access_id === b.access_id)
        );
      });

      results.push(...accesses);

      page++;
    }

    console.log("[export_accesses] Accesses found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Accessi");

    // Columns
    const columns = [
      {
        key: "access_id",
        header: "ID Accesso",
        width: 9
      },

      {
        key: "name",
        header: "Nome",
        width: 10
      },
      {
        key: "surname",
        header: "Cognome",
        width: 10
      },

      {
        key: "email",
        header: "Email",
        width: 14
      },

      {
        key: "is_active",
        header: "Accesso",
        width: 24
      },

      {
        key: "created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });

    // Rows
    let index = 0;
    results.forEach((access) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }

        switch (field) {
          case "is_active":
            if (access[field]) {
              row[field] = "Attivo";
            } else {
              row[field] = "Inattivo";
            }
            break;

          case "created_at":
            row[field] = moment(access[field]).format("DD-MM-YYYY HH:mm:ss");
            break;
          case "updated_at":
            row[field] = moment(access[field]).format("DD-MM-YYYY HH:mm:ss");
            break;

          default:
            row[field] = access[field];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet.getColumn("notes").eachCell(function (cell, rowNumber) {
        cell.alignment = { wrapText: true };
      });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "accesses" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/accesses/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/accesses/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export accessi", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  },

  // Accesses Logs
  export_accesses_logs: async function (job) {
    // Existing access
    const existingAccess = await Access.findOne({
      where: {
        access_id: job.data.access_id,

        is_active: true,
        archived_at: null
      },
      include: [
        {
          model: Dismantler,
          required: true,
          where: {
            dismantler_id: job.data.dismantler_id,

            is_active: true
          }
        }
      ]
    });

    if (!existingAccess) {
      throw new Error(
        "No access found. Cannot perform the requested operation."
      );
    }

    // Fields
    const fields = job.data.fields;
    const filters = job.data.filters;

    // #region Data
    // Config
    let page = 1;
    const per_page = 50;

    const results = [];

    while (true) {
      const accessesLogsIDs = await accesses_logs_filter(
        {
          text: fields.includes("filters") ? filters.text : null,
          operation: fields.includes("filters") ? filters.operation : null,
          order_by: fields.includes("filters") ? filters.order_by : null,
          per_page: per_page,
          page: page,

          access_id: fields.includes("filters") ? filters.access_id : null,

          action: fields.includes("filters") ? filters.action : null,
          entity: fields.includes("filters") ? filters.entity : null
        },
        {
          dismantler: {
            dismantler_id: job.data.dismantler_id
          },
          access: {
            access_id: job.data.access_id
          }
        }
      );

      if (
        accessesLogsIDs.count === 0 ||
        (accessesLogsIDs.count > 0 && accessesLogsIDs.rows.length === 0)
      ) {
        break;
      }

      // Making the query
      const accessesLogs = await AccessLog.findAll({
        include: [],
        where: {
          access_log_id: accessesLogsIDs.rows.map((c) => c.access_log_id)
        }
      });

      // TODO for (let i = 0; i < accessesLogs.length; i++)

      // Reorder accessesLog by accessesLogsIDs
      accessesLogs.sort(function (a, b) {
        return (
          accessesLogsIDs.rows.findIndex(
            (c) => c.accessesLog_id === a.accessesLog_id
          ) -
          accessesLogsIDs.rows.findIndex(
            (c) => c.accessesLog_id === b.accessesLog_id
          )
        );
      });

      results.push(...accessesLogs);

      page++;
    }

    console.log("[export_accesses_logs] Access Logs found: ", results.length);
    // #endregion Data

    // #region ExcelJS
    // Workbook
    const workbook = new ExcelJS.Workbook();

    // Workbook properties
    workbook.created = new Date();
    workbook.modified = new Date();

    // Worksheet
    const worksheet = workbook.addWorksheet("Accessi");

    // Columns
    const columns = [
      {
        key: "access_log_id",
        header: "ID Accesso",
        width: 9
      },

      {
        key: "action",
        header: "Azione",
        width: 14
      },

      {
        key: "entity",
        header: "Entita",
        width: 18
      },
      {
        key: "entity_id",
        header: "ID Entita",
        width: 14
      },

      {
        key: "data",
        header: "Dati aggiuntivi",
        width: 16
      },

      {
        key: "created_at",
        header: "Creato il",
        width: 18
      },
      {
        key: "updated_at",
        header: "Aggiornato il",
        width: 18
      }
    ];

    worksheet.columns = columns.filter((column) => {
      return fields.includes(column.key);
    });
    // Rows
    let index = 0;
    results.forEach((access_log) => {
      // Row
      const row = {};
      fields.forEach((field) => {
        if (field === "filters") {
          return;
        }

        switch (field) {
          case "action":
            switch (access_log[field]) {
              case "create":
                row[field] = "Creazione";
                break;
              case "read":
                row[field] = "Lettura";
                break;
              case "update":
                row[field] = "Aggiornamento";
                break;
              case "delete":
                row[field] = "Cancellazione";
                break;
              case "export":
                row[field] = "Esportazione";
                break;
              case "import":
                row[field] = "Importazione";
                break;
              case "archive":
                row[field] = "Archiviazione";
                break;
              case "unarchive":
                row[field] = "Disarchiviazione";
                break;
              default:
                row[field] = access_log[field];
            }
            break;

          case "entity":
            switch (access_log[field]) {
              case "order":
                row[field] = "Ordine";
                break;
              case "reservation":
                row[field] = "Prenotazione";
                break;
              case "component":
                row[field] = "Componente";
                break;
              case "component_media":
                row[field] = "Media componente";
                break;

              case "vehicle":
                row[field] = "Veicolo";
                break;
              case "vehicle_media":
                row[field] = "Media veicolo";
                break;

              case "tyre":
                row[field] = "Pneumatico";
                break;
              case "tyre_media":
                row[field] = "Media pneumatico";
                break;

              case "wheel":
                row[field] = "Cerchio";
                break;
              case "wheel_media":
                row[field] = "Media cerchio";
                break;

              case "client":
                row[field] = "Cliente";
                break;
              case "client_address":
                row[field] = "Indirizzo cliente";
                break;

              case "entry":
                row[field] = "Voce";
                break;

              case "type":
                row[field] = "Tipo";
                break;
              case "brand":
                row[field] = "Marca";
                break;
              case "model":
                row[field] = "Modello";
                break;
              case "version":
                row[field] = "Versione";
                break;

              case "manufacturer":
                row[field] = "Produttore";
                break;

              case "warehouse":
                row[field] = "Magazzino";
                break;
              case "warehouse_address":
                row[field] = "Indirizzo magazzino";
                break;
              case "warehouse_floor":
                row[field] = "Piano";
                break;
              case "warehouse_lane":
                row[field] = "Corsia";
                break;
              case "warehouse_rack":
                row[field] = "Scaffale";
                break;
              case "warehouse_shelf":
                row[field] = "Ripiano";
                break;
              case "warehouse_bin":
                row[field] = "Contenitore";
                break;

              case "deposit":
                row[field] = "Deposito";
                break;
              case "deposit_address":
                row[field] = "Indirizzo deposito";
                break;
              case "deposit_lot":
                row[field] = "Piazzale";
                break;
              case "deposit_lane":
                row[field] = "Corsia";
                break;
              case "deposit_placement":
                row[field] = "Postazione";
                break;
              case "deposit_floor":
                row[field] = "Piano";
                break;

              case "access":
                row[field] = "Accesso";
                break;

              default:
                row[field] = access_log[field];
            }
            break;

          case "created_at":
            row[field] = moment(access_log[field]).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            break;
          case "updated_at":
            row[field] = moment(access_log[field]).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            break;

          default:
            row[field] = access_log[field];
            break;
        }
      });

      // Values
      worksheet.insertRow(2 + index, row);

      index++;
    });

    // Alignment
    try {
      worksheet.getColumn("notes").eachCell(function (cell, rowNumber) {
        cell.alignment = { wrapText: true };
      });
    } catch (error) {
      // No existing column
    }
    // #endregion ExcelJS

    // #region Upload
    // Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const filename =
      new Date().toISOString() +
      "-" +
      job.data.dismantler_id +
      "-" +
      "accesses_logs" +
      ".xlsx";

    // Send to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/accesses_logs/${filename}`,
          Body: buffer,
          ACL: "private",
          ContentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3. " + error.message);
    }
    // #endregion Upload

    // #region Presigned URL
    let presignedURL = null;
    try {
      presignedURL = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: "twice-parts",
          Key: `exports/accesses_logs/${filename}`
        }),
        { expiresIn: 6 * 60 * 60 }
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate presigned URL. " + error.message);
    }

    if (presignedURL === null) {
      throw new Error("Failed to generate presigned URL.");
    }
    // #endregion Presigned URL

    // #region Mailer
    const template = fs.readFileSync(
      path.join(__dirname, "../../email/templates/export.html"),
      "utf-8"
    );
    const html = template.replace("{{ presignedURL }}", presignedURL);

    try {
      await sendEmail([existingAccess.email], "Export attivita", html);
    } catch (error) {
      throw new Error("Failed to send email. " + error.message);
    }
    // #endregion Mailer
  }
};
