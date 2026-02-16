// Database Models
// Master
const Master = require("@databases/sequelize/models/master/master");
const MasterPermission = require("@databases/sequelize/models/master/master_permission");
const MasterLog = require("@databases/sequelize/models/master/master_log");

// Dismantler
const Dismantler = require("@databases/sequelize/models/dismantler/dismantler");
const DismantlerSetting = require("@databases/sequelize/models/dismantler/dismantler_setting");
const DismantlerAddress = require("@databases/sequelize/models/dismantler/dismantler_address");
const DismantlerRecipient = require("@databases/sequelize/models/dismantler/dismantler_recipient");
const DismanterMedia = require("@databases/sequelize/models/dismantler/dismantler_media");

const DismantlerServiceSubscription = require("@databases/sequelize/models/dismantler/dismantler_service_subscription");
const DismantlerServiceSetting = require("@databases/sequelize/models/dismantler/dismantler_service_setting");
const DismantlerServiceSubscriptionRenewal = require("@databases/sequelize/models/dismantler/dismantler_service_subscription_renewal");
const DismantlerServiceSubscriptionUsage = require("@databases/sequelize/models/dismantler/dismantler_service_subscription_usage");
// END Dismantler

// Access
const Access = require("@databases/sequelize/models/access/access");
const AccessPermission = require("@databases/sequelize/models/access/access_permission");
const AccessLog = require("@databases/sequelize/models/access/access_log");
// END Access

// Component
const Component = require("@databases/sequelize/models/component/component");
const ComponentMedia = require("@databases/sequelize/models/component/component_media");
const ComponentTag = require("@databases/sequelize/models/component/component_tag");
const ComponentScannerCode = require("@databases/sequelize/models/component/component_scanner_code");

const ComponentMetafieldValue = require("@databases/sequelize/models/component/component_metafield_value");

const ComponentOrderItem = require("@databases/sequelize/models/component/component_order_item");
const ComponentReservationItem = require("@databases/sequelize/models/component/component_reservation_item");

const ComponentSEO = require("@databases/sequelize/models/component/component_seo");

const ComponentFulltext = require("@databases/sequelize/models/component/component_fulltext");
// END Component

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

const VehicleMetafieldValue = require("@databases/sequelize/models/vehicle/vehicle_metafield_value");

const VehicleOrderItem = require("@databases/sequelize/models/vehicle/vehicle_order_item");
const VehicleReservationItem = require("@databases/sequelize/models/vehicle/vehicle_reservation_item");
// END Vehicle

// Tyre
const Tyre = require("@databases/sequelize/models/tyre/tyre");
const TyreMedia = require("@databases/sequelize/models/tyre/tyre_media");
const TyreScannerCode = require("@databases/sequelize/models/tyre/tyre_scanner_code");

const TyreMetafieldValue = require("@databases/sequelize/models/tyre/tyre_metafield_value");

const TyreOrderItem = require("@databases/sequelize/models/tyre/tyre_order_item");
const TyreReservationItem = require("@databases/sequelize/models/tyre/tyre_reservation_item");
// END Tyre

// Wheel
const Wheel = require("@databases/sequelize/models/wheel/wheel");
const WheelMedia = require("@databases/sequelize/models/wheel/wheel_media");
const WheelScannerCode = require("@databases/sequelize/models/wheel/wheel_scanner_code");

const WheelMetafieldValue = require("@databases/sequelize/models/wheel/wheel_metafield_value");

const WheelOrderItem = require("@databases/sequelize/models/wheel/wheel_order_item");
const WheelReservationItem = require("@databases/sequelize/models/wheel/wheel_reservation_item");
// END Wheel

// Client
const Client = require("@databases/sequelize/models/client/client");
const ClientBilling = require("@databases/sequelize/models/client/client_billing");

const ClientAddress = require("@databases/sequelize/models/client/client_address");
const ClientPermission = require("@databases/sequelize/models/client/client_permission");
// END Client

// Warehouse
const Warehouse = require("@databases/sequelize/models/warehouse/warehouse");
const WarehouseAddress = require("@databases/sequelize/models/warehouse/warehouse_address");
const WarehouseFloor = require("@databases/sequelize/models/warehouse/warehouse_floor");
const WarehouseLane = require("@databases/sequelize/models/warehouse/warehouse_lane");
const WarehouseRack = require("@databases/sequelize/models/warehouse/warehouse_rack");
const WarehouseShelf = require("@databases/sequelize/models/warehouse/warehouse_shelf");

const WarehouseBin = require("@databases/sequelize/models/warehouse/warehouse_bin");
const WarehouseBinCode = require("@databases/sequelize/models/warehouse/warehouse_bin_code");
// END Warehouse

// Deposit
const Deposit = require("@databases/sequelize/models/deposit/deposit");
const DepositAddress = require("@databases/sequelize/models/deposit/deposit_address");
const DepositLot = require("@databases/sequelize/models/deposit/deposit_lot");
const DepositLane = require("@databases/sequelize/models/deposit/deposit_lane");
const DepositPlacement = require("@databases/sequelize/models/deposit/deposit_placement");
const DepositFloor = require("@databases/sequelize/models/deposit/deposit_floor");

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

// Manufacturer
const Manufacturer = require("@databases/sequelize/models/manufacturer");
const SystemManufacturer = require("@databases/sequelize/models/system/system_manufacturer");

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

const DismantlerManufacturer = require("@databases/sequelize/models/dismantler/dismantler_manufacturer");
// END Entry, Type, Brand, Model, Version

// Order
const Order = require("@databases/sequelize/models/order/order");
const OrderDiscount = require("@databases/sequelize/models/order/order_discount");
const OrderBuyer = require("@databases/sequelize/models/order/order_buyer");
const OrderBilling = require("@databases/sequelize/models/order/order_billing");
const OrderShipping = require("@databases/sequelize/models/order/order_shipping");

const OrderItem = require("@databases/sequelize/models/order/order_item");
// END Order

// Reservation
const Reservation = require("@databases/sequelize/models/reservation/reservation");
const ReservationDiscount = require("@databases/sequelize/models/reservation/reservation_discount");
const ReservationReservee = require("@databases/sequelize/models/reservation/reservation_reservee");
const ReservationBilling = require("@databases/sequelize/models/reservation/reservation_billing");
const ReservationShipping = require("@databases/sequelize/models/reservation/reservation_shipping");

const ReservationItem = require("@databases/sequelize/models/reservation/reservation_item");
// END Reservation

// OEM Code
const OEMCode = require("@databases/sequelize/models/oem_code/oem_code");
const OEMCodeVersion = require("@databases/sequelize/models/oem_code/oem_code_version");

// Metafield
const Metafield = require("@databases/sequelize/models/metafield/metafield");
const MetafieldInput = require("@databases/sequelize/models/metafield/metafield_input");
const MetafieldInputRule = require("@databases/sequelize/models/metafield/metafield_input_rule");

const ServiceMetafield = require("@databases/sequelize/models/service/service_metafield");
const DismantlerMetafield = require("@databases/sequelize/models/dismantler/dismantler_metafield");
const EntryMetafield = require("@databases/sequelize/models/entry_metafield");

// Service
const Service = require("@databases/sequelize/models/service/service");
const ServiceRenewal = require("@databases/sequelize/models/service/service_renewal");

// END Database Models

// Master
function master() {
  // Master - MasterPermission
  Master.hasMany(MasterPermission, {
    foreignKey: {
      name: "master_id",
      unique: "master_permission_composite_index",
      allowNull: false,
    },
  });
  MasterPermission.belongsTo(Master, {
    foreignKey: {
      name: "master_id",
      unique: "master_permission_composite_index",
      allowNull: false,
    },
  });

  // Master - MasterLog
  Master.hasMany(MasterLog, {
    foreignKey: {
      name: "master_id",
      allowNull: false,
    },
  });
  MasterLog.belongsTo(Master, {
    foreignKey: {
      name: "master_id",
      allowNull: false,
    },
  });
}

// Dismantler
function dismantler() {
  // Dismantler - DismantlerSetting
  Dismantler.hasMany(DismantlerSetting, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_setting_composite_index",
      allowNull: false,
    },
  });
  DismantlerSetting.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_setting_composite_index",
      allowNull: false,
    },
  });

  // Dismantler - DismantlerAddress
  Dismantler.hasOne(DismantlerAddress, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerAddress.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Dismantler - DismantlerRecipient
  Dismantler.hasOne(DismantlerRecipient, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerRecipient.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Dismantler - Client TODO maybe move to client
  Dismantler.hasMany(Client, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Client.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Dismantler - DismantlerMedia
  Dismantler.hasMany(DismanterMedia, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismanterMedia.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Dismantler - DismantlerServiceSubscription
  Dismantler.hasMany(DismantlerServiceSubscription, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_service_subscription_composite_index",
      allowNull: false,
    },
  });
  DismantlerServiceSubscription.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_service_subscription_composite_index",
      allowNull: false,
    },
  });

  // DismantlerServiceSubscription - DismantlerServiceSetting
  DismantlerServiceSubscription.hasMany(DismantlerServiceSetting, {
    foreignKey: {
      name: "dismantler_service_subscription_id",
      unique: "dismantler_service_setting_composite_index",
      allowNull: false,
    },
  });
  DismantlerServiceSetting.belongsTo(DismantlerServiceSubscription, {
    foreignKey: {
      name: "dismantler_service_subscription_id",
      unique: "dismantler_service_setting_composite_index",
      allowNull: false,
    },
  });

  // DismantlerServiceSubscription - DismantlerServiceSubscriptionRenewal
  DismantlerServiceSubscription.hasMany(DismantlerServiceSubscriptionRenewal, {
    foreignKey: {
      name: "dismantler_service_subscription_id",
      allowNull: false,
    },
  });
  DismantlerServiceSubscriptionRenewal.belongsTo(
    DismantlerServiceSubscription,
    {
      foreignKey: {
        name: "dismantler_service_subscription_id",
        allowNull: false,
      },
    }
  );

  // DismantlerServiceSubscription - DismantlerServiceSubscriptionUsage
  DismantlerServiceSubscription.hasMany(DismantlerServiceSubscriptionUsage, {
    foreignKey: {
      name: "dismantler_service_subscription_id",
      allowNull: false,
    },
  });
  DismantlerServiceSubscriptionUsage.belongsTo(DismantlerServiceSubscription, {
    foreignKey: {
      name: "dismantler_service_subscription_id",
      allowNull: false,
    },
  });
}

// Access
function access() {
  // Access - Dismantler
  Dismantler.hasMany(Access, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Access.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Access - AccessPermission
  Access.hasMany(AccessPermission, {
    foreignKey: {
      name: "access_id",
      unique: "access_permission_composite_index",
      allowNull: false,
    },
  });
  AccessPermission.belongsTo(Access, {
    foreignKey: {
      name: "access_id",
      unique: "access_permission_composite_index",
      allowNull: false,
    },
  });

  // Access - AccessLog
  Access.hasMany(AccessLog, {
    foreignKey: {
      name: "access_id",
      allowNull: false,
    },
  });
  AccessLog.belongsTo(Access, {
    foreignKey: {
      name: "access_id",
      allowNull: false,
    },
  });
}

// Vehicle
function vehicle() {
  // Vehicle - Dismantler
  Dismantler.hasMany(Vehicle, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Vehicle.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Vehicle - Version
  Version.hasMany(Vehicle, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });
  Vehicle.belongsTo(Version, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });

  // Vehicle - DepositFloor
  DepositFloor.hasMany(Vehicle, {
    foreignKey: {
      name: "deposit_floor_id",
      allowNull: true,
    },
  });
  Vehicle.belongsTo(DepositFloor, {
    foreignKey: {
      name: "deposit_floor_id",
      allowNull: true,
    },
  });

  // Vehicle - VehicleAcceptance
  Vehicle.hasOne(VehicleAcceptance, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleAcceptance.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleDrainage
  Vehicle.hasOne(VehicleDrainage, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleDrainage.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleBody
  Vehicle.hasOne(VehicleBody, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleBody.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleEngine
  Vehicle.hasOne(VehicleEngine, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleEngine.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleTransmission
  Vehicle.hasOne(VehicleTransmission, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleTransmission.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleMedia
  Vehicle.hasMany(VehicleMedia, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleMedia.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleScannerCode
  Vehicle.hasMany(VehicleScannerCode, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleScannerCode.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleHeadlight
  Vehicle.hasMany(VehicleHeadlight, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleHeadlight.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleTaillight
  Vehicle.hasMany(VehicleTaillight, {
    foreignKey: {
      name: "vehicle_id",
      unique: "vehicle_taillight_composite_index",
      allowNull: false,
    },
  });
  VehicleTaillight.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      unique: "vehicle_taillight_composite_index",
      allowNull: false,
    },
  });

  // Vehicle - VehicleRearViewMirror
  Vehicle.hasMany(VehicleRearViewMirror, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleRearViewMirror.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleEntertainment
  Vehicle.hasOne(VehicleEntertainment, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleEntertainment.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleDashboard
  Vehicle.hasOne(VehicleDashboard, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleDashboard.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleMetafieldValue
  Vehicle.hasMany(VehicleMetafieldValue, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });
  VehicleMetafieldValue.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: false,
    },
  });

  // Vehicle - VehicleOrderItem
  Vehicle.hasOne(VehicleOrderItem, {
    foreignKey: {
      name: "vehicle_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  VehicleOrderItem.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Vehicle - VehicleReservationItem
  Vehicle.hasOne(VehicleReservationItem, {
    foreignKey: {
      name: "vehicle_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  VehicleReservationItem.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
}

// Component
function component() {
  // Component - Dismantler
  Dismantler.hasMany(Component, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Component.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Component - Entry
  Entry.hasMany(Component, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });
  Component.belongsTo(Entry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });

  // Component - Version
  Version.hasMany(Component, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });
  Component.belongsTo(Version, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });

  // Component - Vehicle
  Vehicle.hasMany(Component, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: true,
    },
  });
  Component.belongsTo(Vehicle, {
    foreignKey: {
      name: "vehicle_id",
      allowNull: true,
    },
  });

  // Component - Manufacturer
  Manufacturer.hasMany(Component, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: true,
    },
  });
  Component.belongsTo(Manufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: true,
    },
  });

  // Component - WarehouseBin
  WarehouseBin.hasMany(Component, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: true,
    },
  });
  Component.belongsTo(WarehouseBin, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: true,
    },
  });

  // Component - ComponentMedia
  Component.hasMany(ComponentMedia, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
    },
  });
  ComponentMedia.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
    },
  });

  // Component - ComponentTag
  Component.hasMany(ComponentTag, {
    foreignKey: {
      name: "component_id",
      unique: "component_tag_composite_index",
      allowNull: false,
    },
  });
  ComponentTag.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      unique: "component_tag_composite_index",
      allowNull: false,
    },
  });

  // Component - ComponentScannerCode
  Component.hasMany(ComponentScannerCode, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
    },
  });
  ComponentScannerCode.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
    },
  });

  // Component - ComponentMetafieldValue
  Component.hasMany(ComponentMetafieldValue, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
    },
  });
  ComponentMetafieldValue.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
    },
  });

  // Component - ComponentOrderItem
  Component.hasOne(ComponentOrderItem, {
    foreignKey: {
      name: "component_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  ComponentOrderItem.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Component - ComponentReservationItem
  Component.hasOne(ComponentReservationItem, {
    foreignKey: {
      name: "component_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  ComponentReservationItem.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Component - ComponentSEO
  Component.hasOne(ComponentSEO, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ComponentSEO.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Component - ComponentFulltext
  Component.hasOne(ComponentFulltext, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ComponentFulltext.belongsTo(Component, {
    foreignKey: {
      name: "component_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
}

// Tyre
function tyre() {
  // Tyre - Dismantler
  Dismantler.hasMany(Tyre, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Tyre.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Tyre - Manufacturer
  Manufacturer.hasMany(Tyre, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: true,
    },
  });
  Tyre.belongsTo(Manufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: true,
    },
  });

  // Tyre - WarehouseBin
  WarehouseBin.hasMany(Tyre, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: true,
    },
  });
  Tyre.belongsTo(WarehouseBin, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: true,
    },
  });

  // Tyre - TyreMedia
  Tyre.hasMany(TyreMedia, {
    foreignKey: {
      name: "tyre_id",
      allowNull: false,
    },
  });
  TyreMedia.belongsTo(Tyre, {
    foreignKey: {
      name: "tyre_id",
      allowNull: false,
    },
  });

  // Tyre - TyreScannerCode
  Tyre.hasMany(TyreScannerCode, {
    foreignKey: {
      name: "tyre_id",
      allowNull: false,
    },
  });
  TyreScannerCode.belongsTo(Tyre, {
    foreignKey: {
      name: "tyre_id",
      allowNull: false,
    },
  });

  // Tyre - TyreMetafieldValue
  Tyre.hasMany(TyreMetafieldValue, {
    foreignKey: {
      name: "tyre_id",
      allowNull: false,
    },
  });
  TyreMetafieldValue.belongsTo(Tyre, {
    foreignKey: {
      name: "tyre_id",
      allowNull: false,
    },
  });

  // Tyre - TyreOrderItem
  Tyre.hasOne(TyreOrderItem, {
    foreignKey: {
      name: "tyre_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  TyreOrderItem.belongsTo(Tyre, {
    foreignKey: {
      name: "tyre_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Tyre - TyreReservationItem
  Tyre.hasOne(TyreReservationItem, {
    foreignKey: {
      name: "tyre_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  TyreReservationItem.belongsTo(Tyre, {
    foreignKey: {
      name: "tyre_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
}

// Wheel
function wheel() {
  // Tyre - Dismantler
  Dismantler.hasMany(Wheel, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Wheel.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Wheel - Version
  Version.hasMany(Wheel, {
    foreignKey: {
      name: "version_id",
      allowNull: true,
    },
  });
  Wheel.belongsTo(Version, {
    foreignKey: {
      name: "version_id",
      allowNull: true,
    },
  });

  // Wheel - Manufacturer
  Manufacturer.hasMany(Wheel, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: true,
    },
  });
  Wheel.belongsTo(Manufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: true,
    },
  });

  // Wheel - WarehouseBin
  WarehouseBin.hasMany(Wheel, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: true,
    },
  });
  Wheel.belongsTo(WarehouseBin, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: true,
    },
  });

  // Wheel - WheelMedia
  Wheel.hasMany(WheelMedia, {
    foreignKey: {
      name: "wheel_id",
      allowNull: false,
    },
  });
  WheelMedia.belongsTo(Wheel, {
    foreignKey: {
      name: "wheel_id",
      allowNull: false,
    },
  });

  // Wheel - WheelScannerCode
  Wheel.hasMany(WheelScannerCode, {
    foreignKey: {
      name: "wheel_id",
      allowNull: false,
    },
  });
  WheelScannerCode.belongsTo(Wheel, {
    foreignKey: {
      name: "wheel_id",
      allowNull: false,
    },
  });

  // Wheel - WheelMetafieldValue
  Wheel.hasMany(WheelMetafieldValue, {
    foreignKey: {
      name: "wheel_id",
      allowNull: false,
    },
  });
  WheelMetafieldValue.belongsTo(Wheel, {
    foreignKey: {
      name: "wheel_id",
      allowNull: false,
    },
  });

  // Wheel - WheelOrderItem
  Wheel.hasOne(WheelOrderItem, {
    foreignKey: {
      name: "wheel_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  WheelOrderItem.belongsTo(Wheel, {
    foreignKey: {
      name: "wheel_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Wheel - WheelReservationItem
  Wheel.hasOne(WheelReservationItem, {
    foreignKey: {
      name: "wheel_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  WheelReservationItem.belongsTo(Wheel, {
    foreignKey: {
      name: "wheel_id",
      unique: true,
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
}

// Client
function client() {
  // Client - ClientBilling
  Client.hasOne(ClientBilling, {
    foreignKey: {
      name: "client_id",
      allowNull: false,
    },
  });
  ClientBilling.belongsTo(Client, {
    foreignKey: {
      name: "client_id",
      allowNull: false,
    },
  });

  // Client - ClientAddress
  Client.hasMany(ClientAddress, {
    foreignKey: {
      name: "client_id",
      allowNull: false,
    },
  });
  ClientAddress.belongsTo(Client, {
    foreignKey: {
      name: "client_id",
      allowNull: false,
    },
  });

  // Client - ClientPermission
  Client.hasMany(ClientPermission, {
    foreignKey: {
      name: "client_id",
      unique: "client_permission_composite_index",
      allowNull: false,
    },
  });
  ClientPermission.belongsTo(Client, {
    foreignKey: {
      name: "client_id",
      unique: "client_permission_composite_index",
      allowNull: false,
    },
  });
}

// Warehouse
function warehouse() {
  // Warehouse - Dismanter
  Dismantler.hasMany(Warehouse, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Warehouse.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Warehouse - WarehouseAddress
  Warehouse.hasOne(WarehouseAddress, {
    foreignKey: {
      name: "warehouse_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  WarehouseAddress.belongsTo(Warehouse, {
    foreignKey: {
      name: "warehouse_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Warehouse - WarehouseFloor
  Warehouse.hasMany(WarehouseFloor, {
    foreignKey: {
      name: "warehouse_id",
      allowNull: false,
    },
  });
  WarehouseFloor.belongsTo(Warehouse, {
    foreignKey: {
      name: "warehouse_id",
      allowNull: false,
    },
  });

  // WarehouseFloor - WarehouseLane
  WarehouseFloor.hasMany(WarehouseLane, {
    foreignKey: {
      name: "warehouse_floor_id",
      allowNull: false,
    },
  });
  WarehouseLane.belongsTo(WarehouseFloor, {
    foreignKey: {
      name: "warehouse_floor_id",
      allowNull: false,
    },
  });

  // WarehouseLane - WarehouseRack
  WarehouseLane.hasMany(WarehouseRack, {
    foreignKey: {
      name: "warehouse_lane_id",
      allowNull: false,
    },
  });
  WarehouseRack.belongsTo(WarehouseLane, {
    foreignKey: {
      name: "warehouse_lane_id",
      allowNull: false,
    },
  });

  // WarehouseRack - WarehouseShelf
  WarehouseRack.hasMany(WarehouseShelf, {
    foreignKey: {
      name: "warehouse_rack_id",
      allowNull: false,
    },
  });
  WarehouseShelf.belongsTo(WarehouseRack, {
    foreignKey: {
      name: "warehouse_rack_id",
      allowNull: false,
    },
  });

  // WarehouseShelf - WarehouseBin
  WarehouseShelf.hasMany(WarehouseBin, {
    foreignKey: {
      name: "warehouse_shelf_id",
      allowNull: false,
    },
  });
  WarehouseBin.belongsTo(WarehouseShelf, {
    foreignKey: {
      name: "warehouse_shelf_id",
      allowNull: false,
    },
  });

  // WarehouseBin - WarehouseBinCode
  WarehouseBin.hasMany(WarehouseBinCode, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: false,
    },
  });
  WarehouseBinCode.belongsTo(WarehouseBin, {
    foreignKey: {
      name: "warehouse_bin_id",
      allowNull: false,
    },
  });
}

// Deposit
function deposit() {
  // Deposit - Dismanter
  Dismantler.hasMany(Deposit, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  Deposit.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Deposit - DepositAddress
  Deposit.hasOne(DepositAddress, {
    foreignKey: {
      name: "deposit_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  DepositAddress.belongsTo(Deposit, {
    foreignKey: {
      name: "deposit_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Deposit - DepositLot
  Deposit.hasMany(DepositLot, {
    foreignKey: {
      name: "deposit_id",
      allowNull: false,
    },
  });
  DepositLot.belongsTo(Deposit, {
    foreignKey: {
      name: "deposit_id",
      allowNull: false,
    },
  });

  // DepositLot - DepositLane
  DepositLot.hasMany(DepositLane, {
    foreignKey: {
      name: "deposit_lot_id",
      allowNull: false,
    },
  });
  DepositLane.belongsTo(DepositLot, {
    foreignKey: {
      name: "deposit_lot_id",
      allowNull: false,
    },
  });

  // DepositLane - DepositPlacement
  DepositLane.hasMany(DepositPlacement, {
    foreignKey: {
      name: "deposit_lane_id",
      allowNull: false,
    },
  });
  DepositPlacement.belongsTo(DepositLane, {
    foreignKey: {
      name: "deposit_lane_id",
      allowNull: false,
    },
  });

  // DepositPlacement - DepositFloor
  DepositPlacement.hasMany(DepositFloor, {
    foreignKey: {
      name: "deposit_placement_id",
      allowNull: false,
    },
  });
  DepositFloor.belongsTo(DepositPlacement, {
    foreignKey: {
      name: "deposit_placement_id",
      allowNull: false,
    },
  });
}

// Group, Entry, Type, Brand, Model, Version
function group() {
  // Group - AniaGroup
  Group.hasOne(AniaGroup, {
    foreignKey: {
      name: "group_id",
      allowNull: false,
    },
  });
  AniaGroup.belongsTo(Group, {
    foreignKey: {
      name: "group_id",
      allowNull: false,
    },
  });

  // Group - DismantlerGroup
  Group.hasOne(DismantlerGroup, {
    foreignKey: {
      name: "group_id",
      allowNull: false,
    },
  });
  DismantlerGroup.belongsTo(Group, {
    foreignKey: {
      name: "group_id",
      allowNull: false,
    },
  });

  // DismantlerGroup - Dismanter
  Dismantler.hasMany(DismantlerGroup, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerGroup.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // TypeEntryGroup - Group
  Group.hasMany(TypeEntryGroup, {
    foreignKey: {
      name: "group_id",
      allowNull: false,
    },
  });
  TypeEntryGroup.belongsTo(Group, {
    foreignKey: {
      name: "group_id",
      allowNull: false,
    },
  });
}

function entry() {
  // Entry - AniaEntry
  Entry.hasOne(AniaEntry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });
  AniaEntry.belongsTo(Entry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });

  // DismanterAniaEntry - Dismantler
  Dismantler.hasMany(DismantlerAniaEntry, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntry.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_composite_index",
      allowNull: false,
    },
  });

  // DismanterAniaEntry - AniaEntry
  AniaEntry.hasMany(DismantlerAniaEntry, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntry.belongsTo(AniaEntry, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_composite_index",
      allowNull: false,
    },
  });

  // Entry - DismantlerEntry
  Entry.hasOne(DismantlerEntry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });
  DismantlerEntry.belongsTo(Entry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });

  // DismantlerEntry - Dismanter
  Dismantler.hasMany(DismantlerEntry, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerEntry.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // TypeEntryGroup - Group
  Entry.hasMany(TypeEntryGroup, {
    foreignKey: {
      name: "entry_id",
      unique: "type_entry_composite_index",
      allowNull: false,
    },
  });
  TypeEntryGroup.belongsTo(Entry, {
    foreignKey: {
      name: "entry_id",
      unique: "type_entry_composite_index",
      allowNull: false,
    },
  });
}

function deck() {
  // Dismantler - Deck
  Dismantler.hasMany(Deck, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  Deck.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Deck - DeckEntry
  Deck.hasMany(DeckEntry, {
    foreignKey: {
      name: "deck_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  DeckEntry.belongsTo(Deck, {
    foreignKey: {
      name: "deck_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Entry - DeckEntry
  Entry.hasMany(DeckEntry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  DeckEntry.belongsTo(Entry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
}

function type() {
  // Type - AniaType
  Type.hasOne(AniaType, {
    foreignKey: {
      name: "type_id",
      allowNull: false,
    },
  });
  AniaType.belongsTo(Type, {
    foreignKey: {
      name: "type_id",
      allowNull: false,
    },
  });

  // Type - DismantlerType
  Type.hasOne(DismantlerType, {
    foreignKey: {
      name: "type_id",
      allowNull: false,
    },
  });
  DismantlerType.belongsTo(Type, {
    foreignKey: {
      name: "type_id",
      allowNull: false,
    },
  });

  // DismantlerType - Dismanter
  Dismantler.hasMany(DismantlerType, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerType.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Type - Brand
  Type.hasMany(Brand, {
    foreignKey: {
      name: "type_id",
      allowNull: false,
    },
  });
  Brand.belongsTo(Type, {
    foreignKey: {
      name: "type_id",
      allowNull: false,
    },
  });

  // TypeEntryGroup - Group
  Type.hasMany(TypeEntryGroup, {
    foreignKey: {
      name: "type_id",
      unique: "type_entry_composite_index",
      allowNull: false,
    },
  });
  TypeEntryGroup.belongsTo(Type, {
    foreignKey: {
      name: "type_id",
      unique: "type_entry_composite_index",
      allowNull: false,
    },
  });
}

function brand() {
  // Brand - AniaBrand
  Brand.hasOne(AniaBrand, {
    foreignKey: {
      name: "brand_id",
      allowNull: false,
    },
  });
  AniaBrand.belongsTo(Brand, {
    foreignKey: {
      name: "brand_id",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaBrand - Dismanter
  Dismantler.hasMany(DismantlerAniaEntryAniaBrand, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_ania_brand_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaBrand.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_ania_brand_composite_index",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaBrand - AniaEntry
  AniaEntry.hasMany(DismantlerAniaEntryAniaBrand, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_ania_brand_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaBrand.belongsTo(AniaEntry, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_ania_brand_composite_index",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaBrand - AniaBrand
  AniaBrand.hasMany(DismantlerAniaEntryAniaBrand, {
    foreignKey: {
      name: "brand_id",
      unique: "dismantler_ania_entry_ania_brand_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaBrand.belongsTo(AniaBrand, {
    foreignKey: {
      name: "brand_id",
      unique: "dismantler_ania_entry_ania_brand_composite_index",
      allowNull: false,
    },
  });

  // Brand - DismantlerBrand
  Brand.hasOne(DismantlerBrand, {
    foreignKey: {
      name: "brand_id",
      allowNull: false,
    },
  });
  DismantlerBrand.belongsTo(Brand, {
    foreignKey: {
      name: "brand_id",
      allowNull: false,
    },
  });

  // DismantlerBrand - Dismanter
  Dismantler.hasMany(DismantlerBrand, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerBrand.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Brand - Model
  Brand.hasMany(Model, {
    foreignKey: {
      name: "brand_id",
      allowNull: false,
    },
  });
  Model.belongsTo(Brand, {
    foreignKey: {
      name: "brand_id",
      allowNull: false,
    },
  });
}

function model() {
  // Model - AniaModel
  Model.hasOne(AniaModel, {
    foreignKey: {
      name: "model_id",
      allowNull: false,
    },
  });
  AniaModel.belongsTo(Model, {
    foreignKey: {
      name: "model_id",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaModel - Dismanter
  Dismantler.hasMany(DismantlerAniaEntryAniaModel, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_ania_model_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaModel.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_ania_model_composite_index",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaModel - AniaEntry
  AniaEntry.hasMany(DismantlerAniaEntryAniaModel, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_ania_model_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaModel.belongsTo(AniaEntry, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_ania_model_composite_index",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaModel - AniaModel
  AniaModel.hasMany(DismantlerAniaEntryAniaModel, {
    foreignKey: {
      name: "model_id",
      unique: "dismantler_ania_entry_ania_model_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaModel.belongsTo(AniaModel, {
    foreignKey: {
      name: "model_id",
      unique: "dismantler_ania_entry_ania_model_composite_index",
      allowNull: false,
    },
  });

  // Model - DismantlerModel
  Model.hasOne(DismantlerModel, {
    foreignKey: {
      name: "model_id",
      allowNull: false,
    },
  });
  DismantlerModel.belongsTo(Model, {
    foreignKey: {
      name: "model_id",
      allowNull: false,
    },
  });

  // DismantlerModel - Dismanter
  Dismantler.hasMany(DismantlerModel, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerModel.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Model - Version
  Model.hasMany(Version, {
    foreignKey: {
      name: "model_id",
      allowNull: false,
    },
  });
  Version.belongsTo(Model, {
    foreignKey: {
      name: "model_id",
      allowNull: false,
    },
  });
}

function version() {
  // Version - AniaVersion
  Version.hasOne(AniaVersion, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });
  AniaVersion.belongsTo(Version, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaVersion - Dismanter
  Dismantler.hasMany(DismantlerAniaEntryAniaVersion, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_ania_version_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaVersion.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      unique: "dismantler_ania_entry_ania_version_composite_index",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaVersion - AniaEntry
  AniaEntry.hasMany(DismantlerAniaEntryAniaVersion, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_ania_version_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaVersion.belongsTo(AniaEntry, {
    foreignKey: {
      name: "entry_id",
      unique: "dismantler_ania_entry_ania_version_composite_index",
      allowNull: false,
    },
  });

  // DismantlerAniaEntryAniaVersion - AniaVersion
  AniaVersion.hasMany(DismantlerAniaEntryAniaVersion, {
    foreignKey: {
      name: "version_id",
      unique: "dismantler_ania_entry_ania_version_composite_index",
      allowNull: false,
    },
  });
  DismantlerAniaEntryAniaVersion.belongsTo(AniaVersion, {
    foreignKey: {
      name: "version_id",
      unique: "dismantler_ania_entry_ania_version_composite_index",
      allowNull: false,
    },
  });

  // Version - DismantlerVersion
  Version.hasOne(DismantlerVersion, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });
  DismantlerVersion.belongsTo(Version, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
    },
  });

  // DismantlerVersion - Dismanter
  Dismantler.hasMany(DismantlerVersion, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerVersion.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
}
// END Group, Entry, Type, Brand, Model, Version

// Order
function order() {
  // Order - Dismantler
  Dismantler.hasMany(Order, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  Order.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Order - Access
  Access.hasMany(Order, {
    foreignKey: {
      name: "access_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  Order.belongsTo(Access, {
    foreignKey: {
      name: "access_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Order - Client
  Client.hasMany(Order, {
    foreignKey: {
      name: "client_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  Order.belongsTo(Client, {
    foreignKey: {
      name: "client_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Order - Service
  Service.hasMany(Order, {
    foreignKey: {
      name: "service_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  Order.belongsTo(Service, {
    foreignKey: {
      name: "service_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Order - OrderDiscount
  Order.hasOne(OrderDiscount, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  OrderDiscount.belongsTo(Order, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Order - OrderBuyer
  Order.hasOne(OrderBuyer, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  OrderBuyer.belongsTo(Order, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Order - OrderBilling
  Order.hasOne(OrderBilling, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  OrderBilling.belongsTo(Order, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Order - OrderShipping
  Order.hasOne(OrderShipping, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  OrderShipping.belongsTo(Order, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Order - OrderItem
  Order.hasMany(OrderItem, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  OrderItem.belongsTo(Order, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // OrderItem - ComponentOrderItem
  OrderItem.hasOne(ComponentOrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ComponentOrderItem.belongsTo(OrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // OrderItem - VehicleOrderItem
  OrderItem.hasOne(VehicleOrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  VehicleOrderItem.belongsTo(OrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // OrderItem - TyreOrderItem
  OrderItem.hasOne(TyreOrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  TyreOrderItem.belongsTo(OrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // OrderItem - WheelOrderItem
  OrderItem.hasOne(WheelOrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  WheelOrderItem.belongsTo(OrderItem, {
    foreignKey: {
      name: "order_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
}

// Reservation
function reservation() {
  // Reservation - Dismantler
  Dismantler.hasMany(Reservation, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  Reservation.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Reservation - Access
  Access.hasMany(Reservation, {
    foreignKey: {
      name: "access_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  Reservation.belongsTo(Access, {
    foreignKey: {
      name: "access_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Reservation - Client
  Client.hasMany(Reservation, {
    foreignKey: {
      name: "client_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });
  Reservation.belongsTo(Client, {
    foreignKey: {
      name: "client_id",
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  // Reservation - ReservationDiscount
  Reservation.hasOne(ReservationDiscount, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ReservationDiscount.belongsTo(Reservation, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Reservation - ReservationReservee
  Reservation.hasOne(ReservationReservee, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ReservationReservee.belongsTo(Reservation, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Reservation - ReservationBilling
  Reservation.hasOne(ReservationBilling, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ReservationBilling.belongsTo(Reservation, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Reservation - ReservationShipping
  Reservation.hasOne(ReservationShipping, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ReservationShipping.belongsTo(Reservation, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // Reservation - ReservationItem
  Reservation.hasMany(ReservationItem, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ReservationItem.belongsTo(Reservation, {
    foreignKey: {
      name: "reservation_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // ReservationItem - ComponentReservationItem
  ReservationItem.hasOne(ComponentReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  ComponentReservationItem.belongsTo(ReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // ReservationItem - VehicleReservationItem
  ReservationItem.hasOne(VehicleReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  VehicleReservationItem.belongsTo(ReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // ReservationItem - TyreReservationItem
  ReservationItem.hasOne(TyreReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  TyreReservationItem.belongsTo(ReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });

  // ReservationItem - WheelReservationItem
  ReservationItem.hasOne(WheelReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
  WheelReservationItem.belongsTo(ReservationItem, {
    foreignKey: {
      name: "reservation_item_id",
      allowNull: false,
      onDelete: "CASCADE",
    },
  });
}

// Manufacturer
function manufacturer() {
  // Manufacturer - SystemManufacturer
  Manufacturer.hasOne(SystemManufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: false,
    },
  });
  SystemManufacturer.belongsTo(Manufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: false,
    },
  });

  // Manufacturer - DismantlerManufacturer
  Manufacturer.hasOne(DismantlerManufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: false,
    },
  });
  DismantlerManufacturer.belongsTo(Manufacturer, {
    foreignKey: {
      name: "manufacturer_id",
      allowNull: false,
    },
  });

  // DismantlerManufacturer - Dismanter
  Dismantler.hasMany(DismantlerManufacturer, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerManufacturer.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
}

// OEM Code
function oem_code() {
  // OEM Code - OEM Code Version
  OEMCode.hasMany(OEMCodeVersion, {
    foreignKey: {
      name: "oem_code_id",
      allowNull: false,
      unique: "oem_code_version_composite_index",
    },
  });
  OEMCodeVersion.belongsTo(OEMCode, {
    foreignKey: {
      name: "oem_code_id",
      allowNull: false,
      unique: "oem_code_version_composite_index",
    },
  });

  // OEM Code - ANIA Entry
  AniaEntry.hasMany(OEMCode, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
      unique: "oem_code_composite_index",
    },
  });
  OEMCode.belongsTo(AniaEntry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
      unique: "oem_code_composite_index",
    },
  });

  // OEM Code Version - ANIA Version
  AniaVersion.hasMany(OEMCodeVersion, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
      unique: "oem_code_version_composite_index",
    },
  });
  OEMCodeVersion.belongsTo(AniaVersion, {
    foreignKey: {
      name: "version_id",
      allowNull: false,
      unique: "oem_code_version_composite_index",
    },
  });
}

// Metafield
function metafield() {
  // Metafield - MetafieldInput
  Metafield.hasOne(MetafieldInput, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  MetafieldInput.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // MetafieldInput - MetafieldInputRule
  MetafieldInput.hasMany(MetafieldInputRule, {
    foreignKey: {
      name: "metafield_id",
      unique: "metafield_input_rule_composite_index",
      allowNull: false,
    },
  });
  MetafieldInputRule.belongsTo(MetafieldInput, {
    foreignKey: {
      name: "metafield_id",
      unique: "metafield_input_rule_composite_index",
      allowNull: false,
    },
  });

  // Metafield - DismantlerMetafield
  Metafield.hasOne(DismantlerMetafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  DismantlerMetafield.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // DismantlerMetafield - Dismanter
  Dismantler.hasMany(DismantlerMetafield, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });
  DismantlerMetafield.belongsTo(Dismantler, {
    foreignKey: {
      name: "dismantler_id",
      allowNull: false,
    },
  });

  // Metafield - ServiceMetafield
  Metafield.hasOne(ServiceMetafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  ServiceMetafield.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // ServiceMetafield - Service
  Service.hasMany(ServiceMetafield, {
    foreignKey: {
      name: "service_id",
      allowNull: false,
    },
  });
  ServiceMetafield.belongsTo(Service, {
    foreignKey: {
      name: "service_id",
      allowNull: false,
    },
  });

  // Metafield - EntryMetafield
  Metafield.hasOne(EntryMetafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  EntryMetafield.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // EntryMetafield - Entry
  Entry.hasMany(EntryMetafield, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });
  EntryMetafield.belongsTo(Entry, {
    foreignKey: {
      name: "entry_id",
      allowNull: false,
    },
  });

  // Metafield - ComponentMetafieldValue
  Metafield.hasMany(ComponentMetafieldValue, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  ComponentMetafieldValue.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // Metafield - VehicleMetafieldValue
  Metafield.hasMany(VehicleMetafieldValue, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  VehicleMetafieldValue.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // Metafield - TyreMetafieldValue
  Metafield.hasMany(TyreMetafieldValue, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  TyreMetafieldValue.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });

  // Metafield - WheelMetafieldValue
  Metafield.hasMany(WheelMetafieldValue, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
  WheelMetafieldValue.belongsTo(Metafield, {
    foreignKey: {
      name: "metafield_id",
      allowNull: false,
    },
  });
}

// Service
function service() {
  // Service - DismantlerServiceSubscription
  Service.hasMany(DismantlerServiceSubscription, {
    foreignKey: {
      name: "service_id",
      unique: "dismantler_service_subscription_composite_index",
      allowNull: false,
    },
  });
  DismantlerServiceSubscription.belongsTo(Service, {
    foreignKey: {
      name: "service_id",
      unique: "dismantler_service_subscription_composite_index",
      allowNull: false,
    },
  });

  // Service - ServiceRenewal
  Service.hasOne(ServiceRenewal, {
    foreignKey: {
      name: "service_id",
      allowNull: false,
    },
  });
  ServiceRenewal.belongsTo(Service, {
    foreignKey: {
      name: "service_id",
      allowNull: false,
    },
  });
}

// Associate
const associate = function () {
  // MASTER
  master();
  // END MASTER

  // DISMANTLER
  dismantler();
  // END DISMANTLER

  // ACCESS
  access();
  // END ACCESS

  // COMPONENT
  component();
  // END COMPONENT

  // VEHICLE
  vehicle();
  // END VEHICLE

  // TYRE
  tyre();
  // END TYRE

  // WHEEL
  wheel();
  // END WHEEL

  // CLIENT
  client();
  // END CLIENT

  // WAREHOUSE
  warehouse();
  // END WAREHOUSE

  // DEPOSIT
  deposit();
  // END DEPOSIT

  // GROUP, ENTRY, TYPE, BRAND, MODEL, VERSION
  // GROUP
  group();
  // END GROUP

  // ENTRY
  entry();
  // END ENTRY

  // DECK
  deck();
  // END DECK

  // TYPE
  type();
  // END TYPE

  // BRAND
  brand();
  // END BRAND

  // MODEL
  model();
  // END MODEL

  // VERSION
  version();
  // END VERSION
  // END GROUP, ENTRY, TYPE, BRAND, MODEL, VERSION

  // ORDER
  order();
  // END ORDER

  // RESERVATION
  reservation();
  // END RESERVATION

  // MANUFACTURER
  manufacturer();
  // END MANUFACTURER

  // OEM CODE
  oem_code();
  // END OEM CODE

  // METAFIELD
  metafield();
  // END METAFIELD

  // SERVICE
  service();
  // END SERVICE
};

module.exports = associate;
