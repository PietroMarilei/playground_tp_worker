// Axios
const axios = require("axios");
// Tokens
const { setAniaTokens, getAniaTokens } = require("@services/ania/tokens.js");
const tokens = getAniaTokens();

module.exports = {
  loginAnia: async function () {
    const newTokens = {
      pfToken: "",
      wsToken: "",
    };

    const login = await axios({
      url: `${process.env.VIAN_LOGIN_URL}/api/${process.env.VIAN_API_VERSION}/auth`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        company: process.env.VIAN_COMPANY,
        username: process.env.VIAN_USERNAME,
        password: process.env.VIAN_PASSWORD,
      },
    });

    if (login) {
      newTokens.pfToken = login.data.data.token;
      newTokens.wsToken = login.data.data.wsToken;
    }

    setAniaTokens(newTokens);
  },

  getAniaGroups: async function () {
    if (!tokens) {
      return null;
    }

    // Get groups
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/groups`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaEntries: async function () {
    if (!tokens) {
      return null;
    }

    // Get entries
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/entries`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaTypes: async function () {
    if (!tokens) {
      return null;
    }

    // Get types
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaBrands: async function (ania_type_id) {
    if (!tokens) {
      return null;
    }

    // Get brands
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types/${ania_type_id}/brands`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaModels: async function (ania_type_id, ania_brand_id) {
    if (!tokens) {
      return null;
    }

    // Get models
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types/${ania_type_id}/brands/${ania_brand_id}/models`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaVersions: async function (ania_type_id, ania_brand_id, ania_model_id) {
    if (!tokens) {
      return null;
    }

    // Get versions
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types/${ania_type_id}/brands/${ania_brand_id}/models/${ania_model_id}/versions`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaVersion: async function (
    ania_type_id,
    ania_brand_id,
    ania_model_id,
    ania_version_id
  ) {
    if (!tokens) {
      return null;
    }

    // Get version
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types/${ania_type_id}/brands/${ania_brand_id}/models/${ania_model_id}/versions/${ania_version_id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaVersionParts: async function (
    ania_type_id,
    ania_brand_id,
    ania_model_id,
    ania_version_id
  ) {
    if (!tokens) {
      return null;
    }

    // Get parts
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types/${ania_type_id}/brands/${ania_brand_id}/models/${ania_model_id}/versions/${ania_version_id}/parts`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaVersionPartsPrices: async function (
    ania_type_id,
    ania_brand_id,
    ania_model_id,
    ania_version_id
  ) {
    if (!tokens) {
      return null;
    }

    // Get parts prices
    return await axios({
      url: `${process.env.VIAN_REST_URL}/ania/types/${ania_type_id}/brands/${ania_brand_id}/models/${ania_model_id}/versions/${ania_version_id}/prices`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.wsToken}`,
      },
    });
  },

  getAniaVersionByPlate: async function (plate) {
    if (!tokens) {
      return null;
    }

    // Get versions
    return await axios({
      url: `${process.env.VIAN_PLATE_URL}/api/${process.env.VIAN_API_VERSION}/plates/${plate}?q=pay`,
      method: "get",
      headers: {
        Authorization: `Bearer ${tokens.pfToken}`,
      },
    });
  },

  getAniaCompatibilityByOemCode: async function (oem_code) {
    if (!tokens) {
      return null;
    }

    try {
      const response = await axios({
        url: `${process.env.VIAN_REST_URL}/ania/parts/${oem_code}?offset=0&limit=500`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.wsToken}`,
        },
      });

      // Check if response is valid
      if (!response || !response.data) {
        return null;
      }

      // Get compatibilities
      return response;
    } catch (error) {
      console.error("Error fetching compatibility:", error.message);
      console.error("OEM Code:", oem_code);
      return null;
    }
  },
};
