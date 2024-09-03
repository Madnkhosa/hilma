import prisma from "@/utils/prisma_client";

export const getAllCategory = async () => {
  return await prisma.category.findMany({
    include: {
      products: true,
    },
  });
};

export const createCategory = async (category: any) => {
  return await prisma.category.create({
    data: category,
  });
};

export const getCategorybyId = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const updateCategory = (id: string, name: string) => {
  return prisma.category.update({
    where: { id },
    data: {
      name: name,
    },
  });
};

export const deleteCategory = (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};
