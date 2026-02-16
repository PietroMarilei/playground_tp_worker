// Parsers
module.exports = {
  // Union
  union_parse: function (union, type) {
    let result = {};

    const capitalized_type = type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    if (union[type + "_type"] === "ania_" + type) {
      result = union["ania_" + type];
      result.__typename = "Ania" + capitalized_type + "Type";
    }
    if (union[type + "_type"] === "system_" + type) {
      result = union["system_" + type];
      result.__typename = "System" + capitalized_type + "Type";
    }
    if (union[type + "_type"] === "dismantler_" + type) {
      result = union["dismantler_" + type];
      result.__typename = "Dismantler" + capitalized_type + "Type";
    }

    if (union[type + "_type"] === "entry_" + type) {
      result = union["entry_" + type];
      result.__typename = "Entry" + capitalized_type + "Type";
    }

    if (union[type + "_type"] === "component_" + type) {
      result = union["component_" + type];
      result.__typename = "Component" + capitalized_type + "Type";
    }

    if (union[type + "_type"] === "tyre_" + type) {
      result = union["tyre_" + type];
      result.__typename = "Tyre" + capitalized_type + "Type";
    }

    if (union[type + "_type"] === "wheel_" + type) {
      result = union["wheel_" + type];
      result.__typename = "Wheel" + capitalized_type + "Type";
    }

    return result;
  },

  // union_parse: function (union, type) {
  //   let result = {};

  //   if (union[type + "_type"] === "ania_" + type) {
  //     result = union["ania_" + type];
  //     result.__typename =
  //       "Ania" + type.charAt(0).toUpperCase() + type.slice(1) + "Type";
  //   }
  //   if (union[type + "_type"] === "system_" + type) {
  //     result = union["system_" + type];
  //     result.__typename =
  //       "System" + type.charAt(0).toUpperCase() + type.slice(1) + "Type";
  //   }
  //   if (union[type + "_type"] === "dismantler_" + type) {
  //     result = union["dismantler_" + type];
  //     result.__typename =
  //       "Dismantler" + type.charAt(0).toUpperCase() + type.slice(1) + "Type";
  //   }

  //   return result;
  // },

  // Media
  media_parse: function (media) {
    for (let i = 0; i < media.length; i++) {
      media[i].media = JSON.parse(media[i].media);
    }

    // Sort by position
    media.sort((a, b) => a.position - b.position);

    return media;
  },

  // Settings
  settings_parse(settings) {
    const parsedSettings = {};

    if (settings.length > 0) {
      // Loop
      for (let i = 0; i < settings.length; i++) {
        const setting = settings[i];

        // Parse
        switch (setting.type) {
          case "object":
            setting.value = JSON.parse(setting.value);
            break;
          case "int":
            setting.value = parseInt(setting.value);
            break;
          case "float":
            setting.value = parseFloat(setting.value);
            break;
          case "boolean":
            setting.value = setting.value === "true";
            break;
          default:
            break;
        }

        parsedSettings[setting.key] = setting.value;
      }
    }

    return parsedSettings;
  },
};
