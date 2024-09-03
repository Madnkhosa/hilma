import { STATUS } from "@/utils/STATUS";
import { categoreSchema } from "@/utils/validation";
import { revalidateTag } from "next/cache";
import {
  createCategory,
  getAllCategory,
} from "../../_repository/category.repository";

export async function GET() {
  try {
    const category = await getAllCategory();
    if (!category) {
      return Response.json({ error: "Product not found!", status: 400 });
    }
    revalidateTag("category");
    revalidateTag("products");
    revalidateTag("product");
    return Response.json({ category: category, status: STATUS.SUCCESS });
  } catch (error) {
    console.log(error)
    return Response.json(
      { error: "Internal server error", err: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const category = await request.json();
    const result = categoreSchema.safeParse(category);
    if (result.error) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    const categorydata = await createCategory(category);

    if (!categorydata) {
      return Response.json(
        { message: "Product not created" },
        { status: STATUS.INTERNEL_SERVER_ERROR }
      );
    }
    revalidateTag("category");
    revalidateTag("products");
    revalidateTag("product");
    return Response.json({ data: categorydata }, { status: STATUS.SUCCESS });
  } catch (error) {
    return Response.json(
      { message: "Inter server error", error: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}
