// Amazon Web Service
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} = require("@aws-sdk/client-s3");

// Sharp
const sharp = require("sharp");

// Configure S3
const s3 = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "fra1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Local storage
const fs = require("fs");
const path = require("path");

// #region Models
// Component
const Component = require("@databases/sequelize/models/component/component");
const ComponentMedia = require("@databases/sequelize/models/component/component_media");

// Vehicle
const Vehicle = require("@databases/sequelize/models/vehicle/vehicle");
const VehicleMedia = require("@databases/sequelize/models/vehicle/vehicle_media");
// #endregion Models

module.exports = {
  media_from_url: async function (job) {
    if (job.data.media_type === "image") {

      console.log('Fake creating image placeholder', job.data.url.split("/").pop())
      // // Get file content from URL
      // const response = await fetch(job.data.url);


      // //Get the image original name from url
      // const original_name = job.data.url.split("/").pop();
      // original_name.replaceAll(" ", "");

      // if (!response.ok) {
      //   return {
      //     code: "NOT_FETCHED"
      //   };
      // }

      // // Process image with sharp
      // const compressed_buffer = await sharp(await response.arrayBuffer())
      //   .resize(1080, 1080, {
      //     fit: "inside",
      //     withoutEnlargement: true
      //   })
      //   .webp()
      //   .toBuffer();

      //     const filename = original_name.split(".");
      //     if (filename.length > 1) filename.pop();

      // const keys = {
      //   component: "components",
      //   vehicle: "vehicles",
      //   tyre: "tyres",
      //   wheel: "wheels"
      // };

      //     const key =
      //       keys[job.data.entity] +
      //       "/img/" +
      //       new Date().toISOString() +
      //       "-" +
      //       filename.join("").replace(/\s/g, "") +
      //       ".webp";

      // Upload to S3
      // await s3.send(
      //   new PutObjectCommand({
      //     Bucket: "twice-parts",
      //     Key: key,
      //     Body: compressed_buffer,
      //     ContentType: "image/webp",
      //     ACL: "public-read"
      //   })
      // );

      //     if (job.data.entity === "component") {
      //       // Existing
      //       const existing_component = await Component.findOne({
      //         where: {
      //           component_id: job.data.entity_id,

      //     dismantler_id: job.data.dismantler_id
      //   }
      // });

      //       if (!existing_component) {
      //         return { code: "ENTITY_NOT_FOUND" };
      //       }

      //   // Save to database
      //   await ComponentMedia.create({
      //     media_type: job.data.media_type,
      //     media: JSON.stringify({
      //       filename: key.replace(keys[job.data.entity] + "/img/", ""),
      //       mimetype: "image/webp",
      //       filesize: compressed_buffer.length
      //     }),
      //     position: job.data.position,

      //     component_id: existing_component.component_id
      //   });

      //   return {
      //     code: "UPLOADED",
      //     filename: key.replace(keys[job.data.entity] + "/img/", "")
      //   };
      // } else if (job.data.entity === "vehicle") {
      //   // Existing
      //   const existing_vehicle = await Vehicle.findOne({
      //     where: {
      //       vehicle_id: job.data.entity_id,

      //       dismantler_id: job.data.dismantler_id
      //     }
      //   });

      //   //       if (!existing_vehicle) {
      //   //         return { code: "ENTITY_NOT_FOUND" };
      //   //       }

      //   // Save to database
      //   await VehicleMedia.create({
      //     media_type: job.data.media_type,
      //     media: JSON.stringify({
      //       filename: key.replace(keys[job.data.entity] + "/img/", ""),
      //       mimetype: "image/webp",
      //       filesize: compressed_buffer.length
      //     }),
      //     position: job.data.position,

      //     vehicle_id: existing_vehicle.vehicle_id
      //   });

      //   return {
      //     code: "UPLOADED",
      //     filename: key.replace(keys[job.data.entity] + "/img/", "")
      //   };
      // } else {
      //   return { code: "INVALID_ENTITY" };
      // }
      //     }
      //   },
      // media_resize: async function (job) {
      //   // S3
      //   const params = {
      //     Bucket: "twice-parts",
      //     Key: job.data.key
      //   };

      //   const command = new GetObjectCommand(params);
      //   const file = await s3.send(command);

      //   // Resize the image using Sharp
      //   const resizedImageBuffer = await sharp(
      //     await file.Body.transformToByteArray()
      //   )
      //     .resize(job.data.width, job.data.height, {
      //       fit: job.data.fit || "inside",
      //       withoutEnlargement: true
      //     })
      //     .toBuffer();

      //   // Upload to S3
      //   await s3.send(
      //     new PutObjectCommand({
      //       Bucket: "twice-parts",
      //       Key: job.data.key,
      //       Body: resizedImageBuffer,
      //       ContentType: "image/webp",
      //       ACL: "public-read"
      //     })
      //   );
      // }
    };
