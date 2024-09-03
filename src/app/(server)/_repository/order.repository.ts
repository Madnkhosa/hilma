import prisma from "@/utils/prisma_client";
import { subHours, subMinutes } from "date-fns";
export const getAllOrders = async () => {
  return await prisma.order.findMany();
};
export const getRecentOrders = async () => {
  const start = subHours (new Date(), 12);
  const end = new Date();
  return await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
};

export const updateOrderTrackingId = async (orderId: string, trackingId: string) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { trackingId: trackingId }
  });
};

export const createOrder = async (order:any) => {
  
  return await prisma.order.create({
    data: order,
  });
};

export const getOrderbyId = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
  });
};

export const updateOrder = async (id: string, status: any) => {
  return await prisma.order.update({
    where: { id },
    data: { status },
    
  });
};
