const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
  endpoint: process.env.DO_SPACES_ENDPOINT,
  forcePathStyle: true,
});

const uploadFile = async (file) => {
  try {
    const fileContent = fs.readFileSync(file.path);

    const uploadParams = {
      Bucket: process.env.DO_SPACES_NAME,
      Key: Date.now() + "-" + file.originalname,
      Body: fileContent,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log("progress");
    });

    const data = await parallelUploads3.done();
    fs.unlinkSync(file.path);

    return data.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

module.exports = uploadFile;
