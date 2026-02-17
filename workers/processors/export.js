// #region imports
// Path
const path = require("path");

// File System
const fs = require("fs");
const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} = require("@aws-sdk/client-s3");
// Configure S3
const s3 = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// MomentJS
const moment = require("moment");
moment.locale("it");

// ExcelJS
const ExcelJS = require("exceljs");

// Sequelize
const { Op, Sequelize, EmptyResultError } = require("sequelize");



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

//#endregion Models

// Service
const Service = require("@databases/sequelize/models/service/service");
// END Models

// Utilities
// Parsers
const { union_parse, media_parse } = require("@utilities/helpers/parsers");

// END Utilities

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
    deposits_filter,
} = require("@graphql/access/filters");
// END Filters

// Enums
const {
    order_item_enums,
    reservation_item_enums,
    component_enums,
    side_enums,

    vehicle_engine_enums,

    channel_enums,
} = require("@databases/sequelize/enums");

//#endregion


module.exports = {
    export_orders: async function (job) {
        console.log("[export_orders]", job.data);
    },

    export_order_items: async function (job) {
        console.log("[export_order_items]", job.data);
    },

    export_reservation_items: async function (job) {
        console.log("[export_reservation_items]", job.data);
    },

    export_components: async function (job) {

        // Fields
        const fields = job.data.fields;
        const filters = job.data.filters;

        const context = {
            dismantler: {
                dismantler_id: job.data.dismantler_id,
            },
            access: {
                access_id: job.data.access_id,
            },
        };


        const components = [];
        let count = 0;
        let page = 1;
        const per_page = 100;
        while (true) {

            const components_ids = await components_filter(
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

                    vehicle_key: fields.includes("filters") ? filters.vehicle_id : null,


                    type_id: fields.includes("filters") ? filters.type_id : null,
                    brand_id: fields.includes("filters") ? filters.brand_id : null,
                    model_id: fields.includes("filters") ? filters.model_id : null,
                    version_id: fields.includes("filters") ? filters.version_id : null,

                    manufacturer_id: fields.includes("filters")
                        ? filters.manufacturer_id
                        : null,

                    warehouse_id: fields.includes("filters") ? filters.warehouse_id : null,
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

                    archived_at: fields.includes("filters") ? filters.archived_at : null,
                },
                context
            );

            if (count === 0) {
                count = components_ids.count;
            }

            const components_ids_in_page = components_ids.rows.map((c) => c.component_id);

            console.log("[export_components] Page:", page, "IDs:", components_ids_in_page);

            //stop if page empty
            if (components_ids_in_page.length === 0) {
                break;
            }

            // Include
            const components_details_in_page = await Component.findAll({
                where: {
                    component_id: components_ids.rows.map((c) => c.component_id),
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
                                        required: false,
                                    },
                                ],
                            },
                            {
                                model: DismantlerEntry,
                                where: { dismantler_id: job.data.dismantler_id },
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
                                where: { dismantler_id: job.data.dismantler_id },
                                required: false,
                            },
                            {
                                model: Model,
                                include: [
                                    { model: AniaModel, required: false },
                                    {
                                        model: DismantlerModel,
                                        where: { dismantler_id: job.data.dismantler_id },
                                        required: false,
                                    },
                                    {
                                        model: Brand,
                                        include: [
                                            { model: AniaBrand, required: false },
                                            {
                                                model: DismantlerBrand,
                                                where: { dismantler_id: job.data.dismantler_id },
                                                required: false,
                                            },
                                            {
                                                model: Type,
                                                include: [
                                                    { model: AniaType, required: false },
                                                    {
                                                        model: DismantlerType,
                                                        where: {
                                                            dismantler_id: job.data.dismantler_id,
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
                                where: { dismantler_id: job.data.dismantler_id },
                                required: false,
                            },
                        ],
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
                                                        include: [{ model: Warehouse }],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },

                    // Vehicle
                    { model: Vehicle, include: [{ model: VehicleEngine }] },
                ],
            });

            for (let i = 0; i < components_details_in_page.length; i++) {
                const component = components_details_in_page[i];

                // Entry
                if (component.entry) {
                    if (!component.entry.ania_entry && !component.entry.dismantler_entry) {
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

            components.push(...components_details_in_page);

            page++;
        }


        // Checking if component is set
        if (!components) {
            const error = new Error("Not found");
            error.code = 404;

            throw error;
        }

        //NOTE: perché sovrascrivere order_by dell'utente ? 
        // Reorder component by components_ids
        components.sort((a, b) => b.component_id - a.component_id); // DESC

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
                width: 14,
            },

            {
                key: "component.label",
                header: "Etichetta",
                width: 14,
            },

            {
                key: "component.entry",
                header: "Voce",
                width: 46,
            },

            {
                key: "component.side",
                header: "Lato",
                width: 10,
            },

            {
                key: "component.type",
                header: "Tipo",
                width: 30,
            },
            {
                key: "component.brand",
                header: "Marca",
                width: 16,
            },
            {
                key: "component.model",
                header: "Modello",
                width: 30,
            },
            {
                key: "component.version",
                header: "Versione",
                width: 44,
            },
            {
                key: "component.version.produced_from",
                header: "Commercializzato dal",
                width: 18,
            },
            {
                key: "component.version.produced_to",
                header: "Commercializzato fino al",
                width: 20,
            },

            // TODO Evaluate if expose the IDs
            {
                key: "component.vehicle_id",
                header: "ID Veicolo",
                width: 12,
            },
            {
                key: "component.version_id",
                header: "ID Versione",
                width: 12,
            },
            {
                key: "component.entry_id",
                header: "ID Voce",
                width: 12,
            },

            {
                key: "component.is_disassembled",
                header: "Smontato",
                width: 14,
            },

            {
                key: "component.oem_code",
                header: "Codice OEM",
                width: 16,
            },
            {
                key: "component.constructor_code",
                header: "Codice costruttore",
                width: 16,
            },
            {
                key: "component.manufacturer",
                header: "Produttore",
                width: 14,
            },
            {
                key: "component.manufacturer_code",
                header: "Codice produttore",
                width: 20,
            },
            {
                key: "component.other_codes",
                header: "Codici ulteriori",
                width: 20,
            },

            {
                key: "component.weight",
                header: "Peso",
                width: 24,
            },

            {
                key: "component.condition",
                header: "Condizione",
                width: 12,
            },
            {
                key: "component.status",
                header: "Status",
                width: 18,
            },

            {
                key: "component.list_price",
                header: "Prezzo di listino",
                width: 20,
            },
            {
                key: "component.counter_price",
                header: "Prezzo al banco",
                width: 18,
            },

            // Warehouse
            {
                key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.warehouse.warehouse",
                header: "Magazzino: Magazzino",
                width: 20,
            },
            {
                key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.warehouse_floor.floor",
                header: "Magazzino: Piano",
                width: 18,
            },
            {
                key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.warehouse_lane.lane",
                header: "Magazzino: Corsia",
                width: 18,
            },
            {
                key: "component.warehouse_bin.warehouse_shelf.warehouse_rack.rack",
                header: "Magazzino: Scaffale",
                width: 18,
            },
            {
                key: "component.warehouse_bin.warehouse_shelf.shelf",
                header: "Magazzino: Ripiano",
                width: 18,
            },
            {
                key: "component.warehouse_bin.bin",
                header: "Magazzino: Contenitore",
                width: 20,
            },

            // Vehicle
            {
                key: "component.vehicle.code",
                header: "Veicolo associato: ID Pratica",
                width: 24,
            },
            {
                key: "component.vehicle.plate",
                header: "Veicolo associato: Targa",
                width: 20,
            },
            {
                key: "component.vehicle.vin",
                header: "Veicolo associato: Telaio",
                width: 20,
            },
            {
                key: "component.vehicle.registered_at",
                header: "Veicolo associato: Data immatricolazione",
                width: 36,
            },
            {
                key: "component.vehicle.km",
                header: "Veicolo associato: Chilometri",
                width: 24,
            },
            {
                key: "component.vehicle.notes",
                header: "Veicolo associato: Note",
                width: 26,
            },
            {
                key: "component.vehicle.vehicle_engine.code",
                header: "Veicolo associato: Motore: Codice",
                width: 30,
            },
            {
                key: "component.vehicle.vehicle_engine.propulsion",
                header: "Veicolo associato: Motore: Propulsione",
                width: 32,
            },

            {
                key: "component.notes",
                header: "Note",
                width: 26,
            },

            {
                key: "component.component_scanner_codes",
                header: "Codici scanner",
                width: 30,
            },

            {
                key: "component.images",
                header: "Fotografie",
                width: 26,
            },

            {
                key: "component.created_at",
                header: "Creato il",
                width: 18,
            },
            {
                key: "component.updated_at",
                header: "Aggiornato il",
                width: 18,
            },
        ];

        worksheet.columns = columns.filter((column) => {
            return fields.includes(column.key);
        });

        // Rows
        let index = 0;
        components.forEach((component) => {
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
                                component[field.replace("component.", "")].toString() === "true"
                                    ? 1
                                    : 0
                                ][0];
                        }
                        break;

                    case "component.entry":
                        let entry = null;
                        if (component.entry !== null && component.entry.entry !== undefined) {
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
                        if (component.version.model.brand.brand_type == "dismantler_brand") {
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

            worksheet.getColumn("component.notes").eachCell(function (cell, rowNumber) {
                cell.alignment = { wrapText: true };
            });
        } catch (error) {
            console.log("[export_components]", error);
            // No existing column
        }

        const fileBuffer = await workbook.xlsx.writeBuffer();
        const key = `exports/components/export_components_${job.data.dismantler_id}_${moment().format("YYYYMMDD_HHmmss")}.xlsx`;

        if (process.env.NODE_ENV === "development") {
            await workbook.xlsx.writeFile(`../local_bucket/${fileName}`);
        } else {
            //NOTE: da testare
            await s3.send(
                new PutObjectCommand({
                    Bucket: "twice-parts",
                    Key: key,
                    Body: fileBuffer,
                    ACL: "private",
                    ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                })
            );

            console.log("[export_components] Export uploaded to S3");
        }
        //#endregion Write on file

        //#endregion ExcelJS

        const presignedUrl = await getSignedUrl(
            s3,
            //NOTE: dice serve per forza in aws 3
            new GetObjectCommand({
                Bucket: "twice-parts",
                Key: key,
            }),
            { expiresIn: 6 * 60 * 60 } // 6 hours in seconds
        );

        if (!presignedUrl) {
            const error = new Error("Failed to generate presigned URL");
            error.status = 500;
            throw error;
        }


        //send e-mail


    },

    export_vehicles: async function (job) {
        console.log("[export_vehicles]", job.data);
    },

    export_clients: async function (job) {
        console.log("[export_clients]", job.data);
    },

    export_warehouses: async function (job) {
        console.log("[export_warehouses]", job.data);
    },

    export_deposits: async function (job) {
        console.log("[export_deposits]", job.data);
    },

    export_accesses: async function (job) {
        console.log("[export_accesses]", job.data);
    },

    export_accesses_logs: async function (job) {
        console.log("[export_accesses_logs]", job.data);
    },
}