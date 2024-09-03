import {
  deleteCategory,
  getCategorybyId,
  updateCategory,
} from "@/app/(server)/_repository/category.repository";
import prisma from "@/utils/prisma_client";
import { STATUS } from "@/utils/STATUS";
import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { categorId: string } }
) {
  try {
    const id = params.categorId;
    const category = await getCategorybyId(id);

    if (!category) {
      return Response.json(
        { error: "Category not found!" },
        {
          status: STATUS.NOT_FOUNT,
        }
      );
    }
    return Response.json(
      { category: category },
      {
        status: STATUS.SUCCESS,
      }
    );
  } catch (error) {
    return Response.json(
      { error: "Internal server error", err: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { categorId: string } }
) {
  try {
    const id = params.categorId;
    const body = await request.json();
    const category = await getCategorybyId(id);
    if (!category) {
      return Response.json(
        { error: "Category not found!" },
        {
          status: STATUS.NOT_FOUNT,
        }
      );
    }
    const updatedcategory = await updateCategory(id, body.name);
    revalidateTag("category");
    revalidateTag("products");
    revalidateTag("product");
    return Response.json({ message: "success", updatedcategory });
  } catch (error) {
   
    return Response.json(
      { message: "Inter server error", error: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: { categorId: string } }
) => {
  try {
    const id = params.categorId;
    const category = await getCategorybyId(id);

    if (!category) {
      return Response.json(
        { message: "category not found!" },
        {
          status: STATUS.NOT_FOUNT,
        }
      );
    }
    await prisma.product.deleteMany({
      where: {
        categoryId: id,
      },
    });

    await deleteCategory(id);
    revalidateTag("category");
    revalidateTag("products");
    revalidateTag("product");
    return Response.json(
      { message: "Category deleted successfully", category },
      {
        status: STATUS.SUCCESS,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
};
