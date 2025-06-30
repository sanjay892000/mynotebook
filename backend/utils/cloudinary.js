const fs = require("fs");
const cloudinary = require("./cloudinaryConfig");

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto", // Automatically determine the resource type
      folder: "mynotebook", // Specify the folder in Cloudinary
    });
    // Remove the local file after upload
    fs.unlinkSync(localfilepath);
    console.log("File uploaded successfully:", result.secure_url);
    return result.secure_url; // Use secure_url for HTTPS
  } catch (error) {
    fs.unlinkSync(localfilepath);
    console.error("Error in uploadOnCloudinary:", error);
    return null;
  }
}
module.exports = uploadOnCloudinary;