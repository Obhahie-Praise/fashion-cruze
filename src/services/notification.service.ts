import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class NotificationService {
  /**
   * Create a new notification for a user
   */
  static async createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        metadata: data.metadata,
        read: false,
      },
    });
  }

  /**
   * Get unread notifications count for a user
   */
  static async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });
  }

  /**
   * Get recent notifications for a user
   */
  static async getRecentNotifications(userId: string, limit = 20) {
    return prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  /**
   * Mark a specific notification as read
   */
  static async markAsRead(id: string, userId: string) {
    return prisma.notification.update({
      where: {
        id,
        userId, // Ensures users can only mark their own notifications
      },
      data: {
        read: true,
      },
    });
  }

  /**
   * Mark all notifications as read for a user
   */
  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }
}
