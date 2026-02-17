// Sequelize
const { Op, Sequelize, EmptyResultError } = require("sequelize");

// Sequelize models
const ConstructionDocument = require("../../models/construction_document");
const EmployeeDocument = require("../../models/employee_document");
const VehicleDocument = require("../../models/vehicle_document");
const CompanyDocument = require("../../models/company_document");

// Amazon Web Service
const aws = require("aws-sdk");

// Configure AWS
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint("ams3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// Exports
// exports.employeeDocument = async (req, res, next) => {
//   // Authorization
//   if (!req.authorized) {
//     const error = new Error("Not authorized");
//     error.code = 401;
//     return next(error);
//   }

//   // Making the query
//   const document = await EmployeeDocument.findByPk(req.params.idDocument);

//   // Checking if construction is set
//   if (!document) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Get the object from S3
//   const file = await s3
//     .getObject({
//       Bucket: "legise",
//       Key: "documents/employees/" + document.filename,
//     })
//     .promise();

//   if (!file) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Response (blob)
//   return res.status(200).type("application/octet-stream").send(file.Body);
// };

exports.employeeDocument = async (req, res, next) => {
  // Authorization
  if (!req.authorized) {
    const error = new Error("Not authorized");
    error.code = 401;
    return next(error);
  }

  // Fields
  const file = JSON.parse(req.body.file);

  // Making the query
  const document = await EmployeeDocument.findByPk(file.idDocument);

  // Checking if employee is set
  if (!document) {
    const error = new Error("No element found.");
    error.status = 404;
    return next(error);
  }

  var presignedURL = s3.getSignedUrl("getObject", {
    Bucket: "legise",
    Key: "documents/employees/" + document.filename,
    Expires: 2 * 60,
  });

  if (!presignedURL) {
    const error = new Error("No file found.");
    error.status = 404;
    return next(error);
  }

  // Response
  return res
    .status(200)
    .type("application/json")
    .send(JSON.stringify({ presignedURL: presignedURL }));
};

// exports.vehicleDocument = async (req, res, next) => {
//   // Authorization
//   if (!req.authorized) {
//     const error = new Error("Not authorized");
//     error.code = 401;
//     return next(error);
//   }

//   // Making the query
//   const document = await VehicleDocument.findByPk(req.params.idDocument);

//   // Checking if construction is set
//   if (!document) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Get the object from S3
//   const file = await s3
//     .getObject({
//       Bucket: "legise",
//       Key: "documents/vehicles/" + document.filename,
//     })
//     .promise();

//   if (!file) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Response (blob)
//   return res.status(200).type("application/octet-stream").send(file.Body);
// };

exports.vehicleDocument = async (req, res, next) => {
  // Authorization
  if (!req.authorized) {
    const error = new Error("Not authorized");
    error.code = 401;
    return next(error);
  }

  // Fields
  const file = JSON.parse(req.body.file);

  // Making the query
  const document = await VehicleDocument.findByPk(file.idDocument);

  // Checking if vehicle is set
  if (!document) {
    const error = new Error("No element found.");
    error.status = 404;
    return next(error);
  }

  var presignedURL = s3.getSignedUrl("getObject", {
    Bucket: "legise",
    Key: "documents/vehicles/" + document.filename,
    Expires: 2 * 60,
  });

  if (!presignedURL) {
    const error = new Error("No file found.");
    error.status = 404;
    return next(error);
  }

  // Response
  return res
    .status(200)
    .type("application/json")
    .send(JSON.stringify({ presignedURL: presignedURL }));
};

// exports.companyDocument = async (req, res, next) => {
//   // Authorization
//   if (!req.authorized) {
//     const error = new Error("Not authorized");
//     error.code = 401;
//     return next(error);
//   }

//   // Making the query
//   const document = await CompanyDocument.findByPk(req.params.idDocument);

//   // Checking if construction is set
//   if (!document) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Get the object from S3
//   const file = await s3
//     .getObject({
//       Bucket: "legise",
//       Key: "documents/company/" + document.filename,
//     })
//     .promise();

//   if (!file) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Response (blob)
//   return res.status(200).type("application/octet-stream").send(file.Body);
// };

exports.companyDocument = async (req, res, next) => {
  // Authorization
  if (!req.authorized) {
    const error = new Error("Not authorized");
    error.code = 401;
    return next(error);
  }

  // Fields
  const file = JSON.parse(req.body.file);

  // Making the query
  const document = await CompanyDocument.findByPk(file.idDocument);

  // Checking if construction is set
  if (!document) {
    const error = new Error("No element found.");
    error.status = 404;
    return next(error);
  }

  var presignedURL = s3.getSignedUrl("getObject", {
    Bucket: "legise",
    Key: "documents/company/" + document.filename,
    Expires: 2 * 60,
  });

  if (!presignedURL) {
    const error = new Error("No file found.");
    error.status = 404;
    return next(error);
  }

  // Response
  return res
    .status(200)
    .type("application/json")
    .send(JSON.stringify({ presignedURL: presignedURL }));
};

// exports.constructionDocument = async (req, res, next) => {
//   // Authorization
//   if (!req.authorized) {
//     const error = new Error("Not authorized");
//     error.code = 401;
//     return next(error);
//   }

//   // Making the query
//   const document = await ConstructionDocument.findByPk(req.params.idDocument);

//   // Checking if construction is set
//   if (!document) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Get the object from S3
//   const file = await s3
//     .getObject({
//       Bucket: "legise",
//       Key: "documents/constructions/" + document.filename,
//     })
//     .promise();

//   if (!file) {
//     const error = new Error("No element found.");
//     error.status = 404;
//     return next(error);
//   }

//   // Response (blob)
//   return res.status(200).type("application/octet-stream").send(file.Body);
// };

exports.constructionDocument = async (req, res, next) => {
  // Authorization
  if (!req.authorized) {
    const error = new Error("Not authorized");
    error.code = 401;
    return next(error);
  }

  // Fields
  const file = JSON.parse(req.body.file);

  // Making the query
  const document = await ConstructionDocument.findByPk(file.idDocument);

  // Checking if construction is set
  if (!document) {
    const error = new Error("No element found.");
    error.status = 404;
    return next(error);
  }

  var presignedURL = s3.getSignedUrl("getObject", {
    Bucket: "legise",
    Key: "documents/constructions/" + document.filename,
    Expires: 2 * 60,
  });

  if (!presignedURL) {
    const error = new Error("No file found.");
    error.status = 404;
    return next(error);
  }

  // Response
  return res
    .status(200)
    .type("application/json")
    .send(JSON.stringify({ presignedURL: presignedURL }));
};
