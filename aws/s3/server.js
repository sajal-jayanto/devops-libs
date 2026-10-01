import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_ACCESS = process.env.AWS_ACCESS_KEY_ID;
const AWS_SERECT = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SERECT,
  },
});

const getImageUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket : "aws-s3-testing-14785",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

const getUploadUrl = async (key, contentType) => {
  const command = new PutObjectCommand({
    Bucket : "aws-s3-testing-14785",
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return url;
}

const uploadImage = async (filePath, key = path.basename(filePath)) => {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;

  const command = new PutObjectCommand({
    Bucket : "aws-s3-testing-14785",
    Key: key,
    Body: await readFile(filePath),
    ContentType: contentType,
  });

  await s3Client.send(command);
  return key;
}

console.log(await getUploadUrl(`uploads/image-${Date.now()}.png`, "image/png"))
console.log(await getImageUrl('img.png'))


