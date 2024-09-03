import React from "react";
import Edit from "./EditForm";
import { unstable_noStore as noStore } from 'next/cache';
const EditProduct = async ({ params }: { params: { productId: string } }) => {
  const pId = params.productId;
  let product: any[] | undefined;
  let categoryData: any[] | undefined;
  noStore();
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/category`, {
      next: { tags: ["product","category"] },
    });
    const result = await res?.json();
    categoryData = result;
     
  } catch (error) {
   console.log("Error" , error)
  }
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/product/${pId}`, {
      next: { tags: ["product","category","products"] },
    });
    const result = await res?.json();
    product = result;
  } catch (error) {
    console.log("Error" , error)
  }
  if (!product) {
    return <div>Produit non trouvé</div>;
  }
  return <Edit pro={product} productId={pId} categoryData={categoryData} />;
};
export default EditProduct;
