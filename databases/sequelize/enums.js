module.exports = {
  // Dismantler
  dismantler_media_enums: {
    media_type: ["image", "video", "document", "external_video"],
  },
  // END Dismantler

  // Component
  component_enums: {
    status: {
      available: ["Disponibile"],
      sold: ["Venduto"],
      unprocessed: ["Da lavorare"],
      reserved: ["Prenotato"],
      discontinued: ["Dismesso"],
      lost: ["Disperso"],
    },
    is_disassembled: {
      0: ["Non smontato", "No"],
      1: ["Smontato", "Si", "Sì"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      decent: ["Discreto"],
      sufficient: ["Sufficiente"],
      barely_sufficient: ["Appena sufficiente"],
      insufficient: ["Insufficiente"],
      faulty: ["Difettoso"],
      to_check: ["Da verificare"],
    },
  },

  component_tag_enums: {
    color: [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "neutral",
    ],
  },

  component_media_enums: {
    media_type: ["image", "video", "document", "external_video"],
  },
  // END Component

  // Vehicle
  vehicle_enums: {
    status: {
      available: ["Disponibile"],
      sold: ["Venduto"],
      unprocessed: ["Da lavorare"],
      reserved: ["Prenotato"],
      pressed: ["Pressato"],
      lost: ["Disperso"],
    },
  },

  vehicle_transmission_enums: {
    type: {
      manual: ["Manuale"],
      automatic: ["Automatica", "Automatico"],
      semi_automatic: [
        "Semi automatica",
        "Semi automatico",
        "Semiautomatica",
        "Semiautomatico",
      ],
    },
    drive: {
      fwd: ["Anteriore"],
      rwd: ["Posteriore"],
      awd: ["Integrale"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      decent: ["Discreto"],
      sufficient: ["Sufficiente"],
      barely_sufficient: ["Appena sufficiente"],
      insufficient: ["Insufficiente"],
      faulty: ["Difettoso"],
      to_check: ["Da verificare"],
    },
    has_reverse: {
      0: ["No"],
      1: ["Si", "Sì"],
    },
  },

  vehicle_engine_enums: {
    propulsion: {
      petrol: ["Benzina"],
      petrol_ethanol: ["Benzina + Etanolo"],
      petrol_gpl: ["Benzina + GPL"],
      petrol_methane: ["Benzina + Metano"],
      diesel: ["Diesel"],
      electric: ["Elettrico"],
      electric_extender: ["Elettrico + Extender"],
      hybrid_petrol: ["Ibrido Benzina"],
      hybrid_diesel: ["Ibrido Diesel"],
      hydrogen: ["Idrogeno"],
      methane: ["Metano"],
      mild_hybrid_petrol: ["Mild Hybrid Benzina"],
      mild_hybrid_diesel: ["Mild Hybrid Diesel"],
      plug_in_hybrid_petrol: ["Plug-in Hybrid Benzina"],
      plug_in_hybrid_diesel: ["Plug-in Hybrid Diesel"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      decent: ["Discreto"],
      sufficient: ["Sufficiente"],
      barely_sufficient: ["Appena sufficiente"],
      insufficient: ["Insufficiente"],
      faulty: ["Difettoso"],
      to_check: ["Da verificare"],
    },
  },

  vehicle_body_enums: {
    finish: {
      metallic: ["Metallizzato"],
      micaceous: ["Micalizzato"],
      matt: ["Opacizzato"],
      satin: ["Satinato"],
    },
  },

  vehicle_media_enums: {
    media_type: ["image", "video", "document", "external_video"],
  },

  vehicle_headlight_enums: {
    type: {
      halogen: ["Alogeno"],
      xenon: ["Xeno"],
      led: ["LED"],
      xenon_led: ["Xeno + LED"],
      matrix_led: ["Matrix LED"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      broken_hooks: ["Agganci rotti"],
      minor_scratches: ["Graffi lievi"],
      deep_scratches: ["Graffi marcati"],
      transparent_matt: ["Trasparente opacizzato"],
      transparent_cracked: ["Trasparente crepato"],
      poor: ["Scadente"],
      missing: ["Mancante"],
    },
    functionality: {
      working: ["Funzionante"],
      not_working: ["Non funzionante"],
      to_check: ["Da verificare"],
    },
  },

  vehicle_taillight_enums: {
    type: {
      halogen: ["Alogeno"],
      led: ["LED"],
      halogen_led: ["Alogeno + LED"],
    },
    segment: {
      inner: ["Interno"],
      outer: ["Esterno"],
      upper: ["Superiore"],
      lower: ["Inferiore"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      broken_hooks: ["Agganci rotti"],
      minor_scratches: ["Graffi lievi"],
      deep_scratches: ["Graffi marcati"],
      transparent_matt: ["Trasparente opacizzato"],
      transparent_cracked: ["Trasparente crepato"],
      poor: ["Scadente"],
      missing: ["Mancante"],
    },
    functionality: {
      working: ["Funzionante"],
      not_working: ["Non funzionante"],
      to_check: ["Da verificare"],
    },
  },

  vehicle_rear_view_mirror_enums: {
    type: {
      manual: ["Regolazione manuale"],
      assisted: ["Regolazione elettrica + Chiusura manuale"],
      electric: ["Regolazione elettrica + Chiusura elettrica"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      poor: ["Scadente"],
      missing: ["Mancante"],
    },
    functionality: {
      working: ["Funzionante"],
      not_working: ["Non funzionante"],
      to_check: ["Da verificare"],
    },
  },

  vehicle_entertainment_enums: {
    type: {
      radio: ["Autoradio"],
      radio_navigator: ["Autoradio + Navigatore"],
      navigator: ["Navigatore"],
      monitor: ["Monitor"],
    },
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      poor: ["Scadente"],
      missing: ["Mancante"],
    },
    functionality: {
      working: ["Funzionante"],
      not_working: ["Non funzionante"],
      to_check: ["Da verificare"],
    },
    lockability: {
      lockable: ["Si + Disponibile"],
      blocked: ["Si + Non disponibile"],
      unlocked: ["No"],
      to_check: ["Da verificare"],
    },
  },

  vehicle_dashboard_enums: {
    condition: {
      excellent: ["Ottimo"],
      very_good: ["Molto buono"],
      good: ["Buono"],
      decent: ["Discreto"],
      sufficient: ["Sufficiente"],
      barely_sufficient: ["Appena sufficiente"],
      insufficient: ["Insufficiente"],
      faulty: ["Difettoso"],
      to_check: ["Da verificare"],
    },
    material: {
      plastic: ["Plastica"],
      leather: ["Pelle"],
      alcantara: ["Alcantara"],
      fabric: ["Tessuto"],
      wood: ["Legno"],
      metal: ["Metallo"],
      carbon: ["Carbonio"],
      other: ["Altro"],
    },
  },
  // END Vehicle

  // Tyre
  tyre_enums: {
    status: {
      available: ["Disponibile"],
      sold: ["Venduto"],
      unprocessed: ["Da lavorare"],
      reserved: ["Prenotato"],
      discontinued: ["Dismesso"],
      lost: ["Disperso"],
    },
    construction: {
      radial: ["Radiale"],
      bias_belted: ["Bias-Belted"],
      cross_ply: ["Cross-Ply"],
    },
    season: {
      summer: ["Estiva"],
      winter: ["Invernale"],
      all_season: ["Quattro Stagioni"],
    },
  },

  tyre_media_enums: {
    media_type: ["image", "video", "document", "external_video"],
  },
  // END Tyre

  // Wheel
  wheel_enums: {
    status: {
      available: ["Disponibile"],
      sold: ["Venduto"],
      unprocessed: ["Da lavorare"],
      reserved: ["Prenotato"],
      discontinued: ["Dismesso"],
      lost: ["Disperso"],
    },
    material: {
      steel: ["Acciaio"],
      alloy: ["Lega"],
      aluminium: ["Alluminio"],
      magnesium: ["Magnesio"],
      carbon: ["Carbonio"],
      titanium: ["Titanio"],
      cast_iron: ["Ghisa"],
    },
    finish: {
      polished: ["Lucido"],
      satin: ["Satinato"],
      painted: ["Verniciato"],
      anodized: ["Anodizzato"],
      chromed: ["Cromato"],
      brushed: ["Spazzolato"],
      powder_coated: ["Verniciatura a polvere"],
    },
  },

  wheel_media_enums: {
    media_type: ["image", "video", "document", "external_video"],
  },
  // END Wheel

  // Client
  client_billing_enums: {
    billing: {
      private: ["Privata"],
      business: ["Aziendale"],
    },
  },
  // END Client

  // Group, Deck, Entry, Type, Brand, Model, Version
  // Group
  group_enums: {
    group_type: ["ania_group", "dismantler_group"],
  },

  // Deck
  deck_enums: {
    is_active: {
      0: ["Inattivo"],
      1: ["Attivo"],
    },
  },

  // Entry
  entry_enums: {
    entry_type: ["ania_entry", "dismantler_entry"],
  },
  dismantler_ania_entry_enums: {
    is_safety: {
      0: ["No"],
      1: ["Si"],
    },
  },
  dismantler_entry_enums: {
    is_safety: {
      0: ["No"],
      1: ["Si"],
    },
  },

  // Type
  type_enums: {
    type_type: ["dismantler_type", "ania_type"],
  },

  // Brand
  brand_enums: {
    brand_type: ["dismantler_brand", "ania_brand"],
  },

  // Model
  model_enums: {
    model_type: ["dismantler_model", "ania_model"],
  },

  // Version
  version_enums: {
    version_type: ["dismantler_version", "ania_version"],
  },
  // END Type, Brand, Model, Version

  // Order
  order_item_enums: {
    order_item_type: {
      component_order_item: ["Componente"],
      vehicle_order_item: ["Veicolo"],
      wheel_order_item: ["Cerchio"],
      tyre_order_item: ["Pneumatico"],
    },
  },
  // END Order

  // Reservation
  reservation_item_enums: {
    reservation_item_type: {
      component_reservation_item: ["Componente"],
      vehicle_reservation_item: ["Veicolo"],
      wheel_reservation_item: ["Cerchio"],
      tyre_reservation_item: ["Pneumatico"],
    },
  },
  // END Reservation

  // Manufacturer
  manufacturer_enums: {
    manufacturer_type: ["dismantler_manufacturer", "system_manufacturer"],
  },

  // Metafield
  metafield_enums: {
    metafield_type: [
      "dismantler_metafield",
      "service_metafield",
      "entry_metafield",
    ],
    entity: {
      component: ["Componente"],
      vehicle: ["Veicolo"],
      tyre: ["Pneumatico"],
      wheel: ["Cerchio"],
      client: ["Cliente"],
      warehouse: ["Magazzino"],
      deposit: ["Deposito"],
    },
  },

  metafield_input_enums: {
    type: {
      string: ["Testo (riga singola)"],
      text: ["Testo (riga multipla)"],
      integer: ["Numero intero"],
      decimal: ["Numero decimale"],
      boolean: ["Booleano"],
      date: ["Data"],
      time: ["Ora"],
      datetime: ["Data e ora"],
      color: ["Colore"],
      email: ["Email"],
      range: ["Intervallo"],
      url: ["URL"],
      checkbox: ["Casella di controllo"],
      radio: ["Pulsante di opzione"],
      select: ["Menu a tendina"],
    },
  },

  metafield_input_rule_enums: {
    rule: {
      required: ["Obbligatorio"],
      min_length: ["Lunghezza minima"],
      max_length: ["Lunghezza massima"],
      min_value: ["Valore minimo"],
      max_value: ["Valore massimo"],
      regex: ["Espressione regolare"],
    },
  },
  // END Metafield

  // General
  is_tested_enums: {
    0: ["Non testato", "Non testata", "No"],
    1: ["Testato", "Testata", "Si", "Sì"],
  },

  is_available_enums: {
    0: ["Assente", "No"],
    1: ["Presente", "Si", "Sì"],
  },

  side_enums: {
    left: ["Sinistro", "Sinistra"],
    right: ["Destro", "Destra"],
  },

  country_enums: [
    "AF",
    "AX",
    "AL",
    "DZ",
    "AS",
    "AD",
    "AO",
    "AI",
    "AQ",
    "AG",
    "AR",
    "AM",
    "AW",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BH",
    "BD",
    "BB",
    "BY",
    "BE",
    "BZ",
    "BJ",
    "BM",
    "BT",
    "BO",
    "BQ",
    "BA",
    "BW",
    "BV",
    "BR",
    "IO",
    "BN",
    "BG",
    "BF",
    "BI",
    "KH",
    "CM",
    "CA",
    "CV",
    "KY",
    "CF",
    "TD",
    "CL",
    "CN",
    "CX",
    "CC",
    "CO",
    "KM",
    "CG",
    "CD",
    "CK",
    "CR",
    "CI",
    "HR",
    "CU",
    "CW",
    "CY",
    "CZ",
    "DK",
    "DJ",
    "DM",
    "DO",
    "EC",
    "EG",
    "SV",
    "GQ",
    "ER",
    "EE",
    "ET",
    "FK",
    "FO",
    "FJ",
    "FI",
    "FR",
    "GF",
    "PF",
    "TF",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GI",
    "GR",
    "GL",
    "GD",
    "GP",
    "GU",
    "GT",
    "GG",
    "GN",
    "GW",
    "GY",
    "HT",
    "HM",
    "VA",
    "HN",
    "HK",
    "HU",
    "IS",
    "IN",
    "ID",
    "IR",
    "IQ",
    "IE",
    "IM",
    "IL",
    "IT",
    "JM",
    "JP",
    "JE",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KP",
    "KR",
    "KW",
    "KG",
    "LA",
    "LV",
    "LB",
    "LS",
    "LR",
    "LY",
    "LI",
    "LT",
    "LU",
    "MO",
    "MK",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MQ",
    "MR",
    "MU",
    "YT",
    "MX",
    "FM",
    "MD",
    "MC",
    "MN",
    "ME",
    "MS",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "NC",
    "NZ",
    "NI",
    "NE",
    "NG",
    "NU",
    "NF",
    "MP",
    "NO",
    "OM",
    "PK",
    "PW",
    "PS",
    "PA",
    "PG",
    "PY",
    "PE",
    "PH",
    "PN",
    "PL",
    "PT",
    "PR",
    "QA",
    "RE",
    "RO",
    "RU",
    "RW",
    "BL",
    "SH",
    "KN",
    "LC",
    "MF",
    "PM",
    "VC",
    "WS",
    "SM",
    "ST",
    "SA",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SX",
    "SK",
    "SI",
    "SB",
    "SO",
    "ZA",
    "GS",
    "SS",
    "ES",
    "LK",
    "SD",
    "SR",
    "SJ",
    "SZ",
    "SE",
    "CH",
    "SY",
    "TW",
    "TJ",
    "TZ",
    "TH",
    "TL",
    "TG",
    "TK",
    "TO",
    "TT",
    "TN",
    "TR",
    "TM",
    "TC",
    "TV",
    "UG",
    "UA",
    "AE",
    "GB",
    "US",
    "UM",
    "UY",
    "UZ",
    "VU",
    "VE",
    "VN",
    "VG",
    "VI",
    "WF",
    "EH",
    "YE",
    "ZM",
    "ZW",
  ],

  action_enums: [
    "create",
    "read",
    "update",
    "archive",
    "unarchive",
    "press",
    "delete",
    "restore",
    "load",
    "export",
    "import",
  ],

  channel_enums: {
    ebay: ["eBay"],
    amazon: ["Amazon"],
    ovoko: ["Ovoko"],
    neryus: ["Neryus"],
    opisto: ["Opisto"],
    bparts: ["B-Parts"],
    uwp: ["Used World Parts"],
    subito: ["Subito"],

    counter: ["Banco"],
    e_commerce: ["E-commerce"],
  },

  discount_enums: {
    type: {
      percentage: ["Percentuale"],
      fixed: ["Importo fisso"],
    },
  },
  // END General

  // Find enum key by value
  findEnumKeyByValue: (path, value) => {
    path = path.split(".");

    let enums = module.exports;

    for (let i = 0; i < path.length; i++) {
      enums = enums[path[i]];
    }

    let enumKey = null;
    for (const key in enums) {
      if (enums[key].includes(value)) {
        enumKey = key;
        break;
      }
    }

    return enumKey;
  },

  // List
  listEnumOptions: (path) => {
    path = path.split(".");

    let enums = module.exports;

    let options = [];
    for (let i = 0; i < path.length; i++) {
      enums = enums[path[i]];
    }

    for (const key in enums) {
      if (!isNaN(key)) {
        options.push(enums[key]);
      } else {
        options.push(enums[key][0]);
      }
    }

    return options;
  },
};
