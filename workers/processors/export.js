// #region imports
// Path
const path = require("path");

// File System
const fs = require("fs");

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

            if (components.length === 0) {
                components = components_ids.count;
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


        console.log('components', components.length);

        // Checking if component is set
        if (!components) {
            const error = new Error("Not found");
            error.code = 404;

            throw error;
        }

        //NOTE: perché sovrascrivere order_by dell'utente ? 
        // Reorder component by components_ids
        components.sort((a, b) => b.component_id - a.component_id); // DESC



        console.log(components.length);
        return { success: true, count: components.length };


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