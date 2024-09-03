import { STATUS } from "@/utils/STATUS";
import { productSchema } from "@/utils/validation";
import { uploadFileOnDigitalOcean } from "../../_services/helpper";
import { revalidateTag } from "next/cache";
import {
  createProduct,
  getAllproducts,
} from "../../_repository/product.repository";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchparam = request.nextUrl.searchParams;
    const queryParams:any={}
    if(searchparam.has("categoryId")){
      queryParams.categoryId=searchparam.get("categoryId")
    }
    if(searchparam.has("search")){
      queryParams.search=searchparam.get("search")
    }
    if(searchparam.has("sort")){
      queryParams.sort=searchparam.get("sort")
    }

    if(searchparam.has("filter")){
      queryParams.filter=searchparam.get("filter")
    }

    const products = await getAllproducts(queryParams);
    if (!products) {
      return Response.json({ error: "Product not found!", status: 400 });
    }
   
    revalidateTag("product");
    revalidateTag("category");
    revalidateTag("products");
    return Response.json({ products: products, status: STATUS.SUCCESS });
  } catch (error) {
    return Response.json(
      { error: "Internal server error", err: error },
      { status: 500 }
    );
  }
}

//\/////////////post api/////////////////

export async function POST(request: Request) {
  try {
    const productData = await request.formData();
    const title = productData.get("title");
    const usg = productData.get("usg");
    const pr = productData.get("price") as string;
    const costPr = productData.get("costPrice") as string;
    const description = productData.get("description");
    const categoryId = productData.get("categoryId");
    const files: File[] = [];
    const file1: File | any = productData.get("img1") as unknown as File;
    const file2: File | any = productData.get("img2") as unknown as File;
    if (file1) files.push(file1);
    if (file2) files.push(file2);
    const price = parseFloat(pr);
    const  costPrice=parseFloat(costPr)
    const imgURLs: string[] = [];
    for (const file of files) {
      const imgURL = await uploadFileOnDigitalOcean(file);
      if (imgURL) imgURLs.push(imgURL);
    }
    const imgURLString = imgURLs.join(',');
    const data: any = {
      title,
      usg,
      description,
      categoryId,
      price,
      costPrice,
      img: imgURLString,
    };
    
    const result = productSchema.safeParse(data);
    if (result.error) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    const product = await createProduct(data);

    if (!product) {
      return Response.json(
        { message: "Product not created" },
        { status: STATUS.INTERNEL_SERVER_ERROR }
      );
    }
    revalidateTag("product");
    revalidateTag("category");
    revalidateTag("products");
    return Response.json({ data: product }, { status: STATUS.SUCCESS });
  } catch (error) {
    return Response.json(
      { message: "Inter server error", error: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}
