import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

/**
 * UploadThing File Router
 *
 * Upload endpoints are defined here.
 * Individual route handlers will be added as features are implemented.
 *
 * @see https://docs.uploadthing.com/api-reference/server#createuploadthing
 */
export const ourFileRouter = {
  // Upload endpoints will be added during feature implementation
  // Example endpoints (to be implemented):
  // - productImage: image upload for product thumbnails
  // - productGallery: multiple images for product gallery
  // - userAvatar: user profile picture
  // - promotionBanner: promotional banner images
  // - brandAsset: brand logos and assets
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
