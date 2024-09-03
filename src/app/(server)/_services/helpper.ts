import { tmpdir } from "os";
import path from "path";
import uploadFile from "./uploadFile";
import fs from "fs";

export const uploadFileOnDigitalOcean = async (file: File) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = await createTempFile(buffer);
    return await uploadFile({
      path: filePath,
      originalname: file.name,
      mimetype: file.type,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; 
  }
};

async function createTempFile(buffer: Buffer) {
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.tmp`; 
  const tempFilePath = path.join(tmpdir(), filename); 
  try {
    await fs.promises.writeFile(tempFilePath, buffer); 
    
    return tempFilePath;
  } catch (error) {
    console.error("Error creating temporary file:", error);
    throw error; 
  }
}
