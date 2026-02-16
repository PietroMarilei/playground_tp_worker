// #region Services
// ANIA
const {
  loginAnia,
  getAniaCompatibilityByOemCode,
} = require("@services/ania/queries.js");
// #endregion Services

// #region Models
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

// OEM Codes
const OEMCode = require("@databases/sequelize/models/oem_code/oem_code");
const OEMCodeVersion = require("@databases/sequelize/models/oem_code/oem_code_version");
// #endregion Models

module.exports = {
  populate_oem_code_compatible_versions: async function (job) {
    const oem_code = await OEMCode.findOne({
      where: {
        oem_code: job.data.oem_code,
        entry_id: job.data.entry_id,
      },
      include: [
        {
          model: OEMCodeVersion,
          required: false,
        },
      ],
    });

    if (!oem_code) {
      return {
        code: "NOT_FOUND",
      };
    }

    if (oem_code.oem_code_versions.length > 0) {
      return {
        code: "ALREADY_POPULATED",
      };
    }

    await loginAnia();

    const compatibilities = await getAniaCompatibilityByOemCode(
      oem_code.oem_code
    );

    const version_ids = [];
    if (
      compatibilities &&
      compatibilities !== null &&
      compatibilities.data.length > 0
    ) {
      // Loop
      for (let i = 0; i < compatibilities.data.length; i++) {
        const compatibility = compatibilities.data[i];

        // Find version
        const version = await Version.findOne({
          include: [
            {
              model: AniaVersion,
              required: true,
              where: { ania_id: compatibility.IDVER },
            },
            {
              model: Model,
              required: true,
              include: [
                {
                  model: AniaModel,
                  required: true,
                  where: { ania_id: compatibility.IDMOD },
                },
                {
                  model: Brand,
                  required: true,
                  include: [
                    {
                      model: AniaBrand,
                      required: true,
                      where: { ania_id: compatibility.IDMAR },
                    },
                    {
                      model: Type,
                      required: true,
                      include: [{ model: AniaType, required: true }],
                    },
                  ],
                },
              ],
            },
          ],
        });

        if (version) {
          // Existing
          const existing_version = await OEMCodeVersion.findOne({
            where: {
              oem_code_id: oem_code.oem_code_id,
              version_id: version.version_id,
            },
          });

          if (!existing_version) {
            // Create
            await OEMCodeVersion.create({
              oem_code_id: oem_code.oem_code_id,
              version_id: version.version_id,
            });

            // Push
            version_ids.push(version.version_id);
          }
        }
      }
    }

    // Set updated_at
    oem_code.changed("updated_at", true);
    await oem_code.update({
      updated_at: new Date(),
    });

    return {
      code: "POPULATED",
      version_ids: version_ids,
    };
  },
  update_oem_code_compatible_versions: async function (job) {
    const oem_code = await OEMCode.findOne({
      where: {
        oem_code: job.data.oem_code,
        entry_id: job.data.entry_id,
      },
      include: [
        {
          model: OEMCodeVersion,
          required: false,
        },
      ],
    });

    if (!oem_code) {
      return {
        code: "NOT_FOUND",
      };
    }

    await loginAnia();

    const compatibilities = await getAniaCompatibilityByOemCode(
      oem_code.oem_code
    );

    const version_ids = [];
    if (
      compatibilities &&
      compatibilities !== null &&
      compatibilities.data.length > 0
    ) {
      // Remove existing versions
      await OEMCodeVersion.destroy({
        where: {
          oem_code_id: oem_code.oem_code_id,
        },
      });

      // Loop
      for (let i = 0; i < compatibilities.data.length; i++) {
        const compatibility = compatibilities.data[i];

        // Find version
        const version = await Version.findOne({
          include: [
            {
              model: AniaVersion,
              required: true,
              where: { ania_id: compatibility.IDVER },
            },
            {
              model: Model,
              required: true,
              include: [
                {
                  model: AniaModel,
                  required: true,
                  where: { ania_id: compatibility.IDMOD },
                },
                {
                  model: Brand,
                  required: true,
                  include: [
                    {
                      model: AniaBrand,
                      required: true,
                      where: { ania_id: compatibility.IDMAR },
                    },
                    {
                      model: Type,
                      required: true,
                      include: [{ model: AniaType, required: true }],
                    },
                  ],
                },
              ],
            },
          ],
        });

        if (version) {
          // Existing
          const existing_version = await OEMCodeVersion.findOne({
            where: {
              oem_code_id: oem_code.oem_code_id,
              version_id: version.version_id,
            },
          });

          if (!existing_version) {
            // Create
            await OEMCodeVersion.create({
              oem_code_id: oem_code.oem_code_id,
              version_id: version.version_id,
            });

            // Push
            version_ids.push(version.version_id);
          }
        }
      }
    }

    // Set updated_at
    oem_code.changed("updated_at", true);
    await oem_code.update({
      updated_at: new Date(),
    });

    return {
      code: "UPDATED",
      version_ids: version_ids,
    };
  },
};
