import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getCurrentUser } from "./server-utils";
import { prisma } from "@/lib/db";

const f = createUploadthing();

const authMiddleware = async () => {
  const user = await getCurrentUser();
  if (!user) throw new UploadThingError("Unauthorized");
  return { userId: user.id, role: user.role };
};

const adminMiddleware = async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") throw new UploadThingError("Unauthorized admin");
  return { userId: user.id, role: user.role };
};

/**
 * UploadThing File Router
 */
export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(adminMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.upload.create({
        data: {
          publicUrl: file.url,
          storageKey: file.key,
          name: file.name,
          fileSize: file.size,
          fileType: "productImage",
          userId: metadata.userId
        }
      });
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  categoryImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(adminMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.upload.create({
        data: {
          publicUrl: file.url,
          storageKey: file.key,
          name: file.name,
          fileSize: file.size,
          fileType: "categoryImage",
          userId: metadata.userId
        }
      });
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  promotionBanner: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(adminMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.upload.create({
        data: {
          publicUrl: file.url,
          storageKey: file.key,
          name: file.name,
          fileSize: file.size,
          fileType: "promotionBanner",
          userId: metadata.userId
        }
      });
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  userAvatar: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.upload.create({
        data: {
          publicUrl: file.url,
          storageKey: file.key,
          name: file.name,
          fileSize: file.size,
          fileType: "userAvatar",
          userId: metadata.userId
        }
      });
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  supportAttachment: f({ image: { maxFileSize: "4MB", maxFileCount: 3 }, pdf: { maxFileSize: "4MB", maxFileCount: 3 } })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.upload.create({
        data: {
          publicUrl: file.url,
          storageKey: file.key,
          name: file.name,
          fileSize: file.size,
          fileType: "supportAttachment",
          userId: metadata.userId
        }
      });
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  brandAsset: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(adminMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.upload.create({
        data: {
          publicUrl: file.url,
          storageKey: file.key,
          name: file.name,
          fileSize: file.size,
          fileType: "brandAsset",
          userId: metadata.userId
        }
      });
      return { uploadedBy: metadata.userId, url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
