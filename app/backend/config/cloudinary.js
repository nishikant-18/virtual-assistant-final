import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Best practice: Configure Cloudinary once outside the function
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath, options = {}) => {
  try {
    if (!filePath) return null; // Safety check in case no path is provided

    const uploadResult = await cloudinary.uploader.upload(filePath, options);

    // Delete the local file after successful upload
    fs.unlinkSync(filePath);

    return uploadResult.secure_url;
  } catch (error) {
    // Check if file exists before trying to delete to avoid further errors
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary upload failed:", error.message);

    // Return null so your controller knows the upload failed
    return null;
  }
};

export default uploadOnCloudinary;
