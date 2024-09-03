import {
  deleteProduct,
  getProductByID,
  updateProduct,
} from "@/app/(server)/_repository/product.repository";
import { uploadFileOnDigitalOcean } from "@/app/(server)/_services/helpper";
import { STATUS } from "@/utils/STATUS";
import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const id = params.productId;
    const product = await getProductByID(id);
    if (!product) {
      return Response.json(
        { error: "Product not found!" },
        {
          status: STATUS.NOT_FOUNT,
        }
      );
    }
    revalidateTag("product");
    revalidateTag("products");
    return Response.json(
      { product: product },
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
  { params }: { params: { productId: string } }
) {
  try {
    const id = params.productId;
    const body = await request.formData();
    const title = body.get("title");
    const usg = body.get("usg");
    const pr = body.get("price") as string;
    const costPr = body.get("costPrice") as string;
    const description = body.get("description");
    const categoryId = body.get("categoryId");
    const files: (File | string)[] = [];
    const file1: File | string | any = body.get("img1") as unknown as (File | string);
    const file2: File | string | any = body.get("img2") as unknown as (File | string);
    if (file1) files.push(file1);
    if (file2) files.push(file2);
    const price = parseFloat(pr);
    const costPrice = parseFloat(costPr);
    const imgURLs: string[] = [];
    
    for (const file of files) {
      if (typeof file === "string") {
        imgURLs.push(file);
      } else {
        const imgURL = await uploadFileOnDigitalOcean(file);
        if (imgURL) imgURLs.push(imgURL);
      }
    }

    const imgURLString = imgURLs.join(',');

    const data: any = {
      title,
      usg,
      description,
      price,
      costPrice,
      categoryId,
      img: imgURLString,
    };

    const updatedProduct = await updateProduct(id, data);

    revalidateTag("product");
    revalidateTag("category");
    revalidateTag("products");
    return Response.json({ message: "success", updatedProduct });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Internal server error", error: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}



export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const id = params.productId;
    const product = await getProductByID(id);
    if (!product) {
      return Response.json(
        { error: "Product not found!" },
        {
          status: STATUS.NOT_FOUNT,
        }
      );
    }

    deleteProduct(id);
    revalidateTag("product");
    revalidateTag("products");
    return Response.json(
      { Message: "Product deleted successfully" },
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
