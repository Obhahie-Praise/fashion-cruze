"use server";

import { getCurrentUser } from "@/lib/server-utils";
import { NotificationService } from "@/services/notification.service";

/**
 * Server Action: Get unread notification count
 */
export async function getUnreadNotificationCount() {
  const user = await getCurrentUser();
  if (!user) {
    return 0;
  }
  
  return NotificationService.getUnreadCount(user.id);
}

/**
 * Server Action: Get recent notifications
 */
export async function getRecentNotifications(limit = 20) {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  
  return NotificationService.getRecentNotifications(user.id, limit);
}

/**
 * Server Action: Mark a single notification as read
 */
export async function markNotificationAsRead(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  await NotificationService.markAsRead(id, user.id);
  return { success: true };
}

/**
 * Server Action: Mark all notifications as read
 */
export async function markAllNotificationsAsRead() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  await NotificationService.markAllAsRead(user.id);
  return { success: true };
}
