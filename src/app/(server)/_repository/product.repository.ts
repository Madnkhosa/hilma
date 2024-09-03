import prisma from "@/utils/prisma_client";


const preprocessSearchTerm = (searchTerm: string) => {
  return searchTerm.replace(/\s+/g, '').toLowerCase();
};
export const getAllproducts = async (query?: any) => {
  const processedSearch = preprocessSearchTerm(query.search || '');
  return await prisma.product.findMany({
    where:{
      categoryId:{
        equals:query.categoryId
      },
      title:{
        contains: processedSearch,
        mode:"insensitive"
      }
    },
    orderBy:{
      price:query.sort
    },
    include:{
      category:true
    }
  });
};

export const createProduct = async (data: any) => {
  return await prisma.product.create({
    data: data,
  });
};

export const getProductByID = async (id: string) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    }
  });
};

export const updateProduct = async (id: string, data: any) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};
