/**
 * Get URL from ImgBB image object/string
 */
const getImageUrl = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    return value.url || value.display_url || value.displayUrl || "";
  }

  return "";
};

/**
 * Upload image to ImgBB
 */
const uploadToImgBB = async (imageBuffer, filename, options = {}) => {
  try {
    // Validate image
    if (!imageBuffer) {
      throw new Error("Image buffer is required");
    }

    // Validate API key
    if (!process.env.IMGBB_API_KEY) {
      throw new Error("ImgBB API key is not configured");
    }

    // Validate API URL
    if (!process.env.IMGBB_API_URL) {
      throw new Error("ImgBB API URL is not configured");
    }

    // Prepare form data
    const formData = new URLSearchParams();

    formData.set("key", process.env.IMGBB_API_KEY);

    formData.set("image", imageBuffer.toString("base64"));

    formData.set("name", options.name || filename || "image");

    // Optional expiration
    if (options.expiration) {
      formData.set("expiration", options.expiration);
    }

    // Upload to ImgBB
    const response = await fetch(process.env.IMGBB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const responseData = await response.json();

    // Validate response
    if (!response.ok || !responseData?.success || !responseData?.data) {
      throw new Error("ImgBB upload failed: " + JSON.stringify(responseData));
    }

    const img = responseData.data;

    // Normalize response
    const normalizedData = {
      url: getImageUrl(img.url),

      displayUrl:
        getImageUrl(img.display_url) ||
        getImageUrl(img.displayUrl) ||
        getImageUrl(img.url),

      deleteUrl: getImageUrl(img.delete_url) || getImageUrl(img.deleteUrl),

      thumb: getImageUrl(img.thumb),

      medium: getImageUrl(img.medium),

      small: getImageUrl(img.small) || getImageUrl(img.thumb),

      filename: img.image?.filename || img.filename || filename || "",

      size: typeof img.size === "number" ? img.size : undefined,

      width: typeof img.width === "number" ? img.width : undefined,

      height: typeof img.height === "number" ? img.height : undefined,

      expiration: img.expiration || null,

      id: img.id || "",

      title: img.title || "",

      description: img.description || "",
    };

    return {
      success: true,
      data: normalizedData,
    };
  } catch (error) {
    console.error("ImgBB Upload Error:", error.message);

    throw new Error(error.message || "Failed to upload image to ImgBB");
  }
};

/**
 * Delete image from ImgBB
 */
const deleteFromImgBB = async (deleteUrl) => {
  try {
    if (!deleteUrl) {
      console.warn("No delete URL provided");
      return false;
    }

    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("ImgBB Delete Error:", error.message);

    return false;
  }
};

module.exports = {
  uploadToImgBB,
  deleteFromImgBB,
};
