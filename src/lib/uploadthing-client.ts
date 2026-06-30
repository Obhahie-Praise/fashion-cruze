import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

/**
 * UploadThing React helpers
 *
 * Use these hooks and utilities in Client Components to interact with UploadThing.
 *
 * @see https://docs.uploadthing.com/api-reference/react
 */
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
