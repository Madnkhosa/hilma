import ProductCard from "@/components/ProductCard";
import React from "react";
const RelatedProduct = async ({ productId }: { productId: any }) => {
  let productData: any[] | undefined;

  try {
    const res = await fetch(
      productId
        ? `${process.env.HOST_URL}/api/product?categoryId=${productId}`
        : `${process.env.HOST_URL}/api/product`
    );
    const result = await res?.json();
    productData = result?.products;
  } catch (error) {
    console.log("Error", error);
  }
  return (
    <div className="">
      <div className="xs:text-[25px] text-[18px] flex mt-4 gap-2 justify-center items-center font-[700]">
        <span className=" text-[#0BA3C8]">Nos produits</span>{" "}
        <span className="text-red-500"> similaires</span>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3  pb-10">
        {productData?.map((product: any, index: any) => (
          <ProductCard
            key={index}
            discount={50}
            product_url={product.img}
            product_name={product.title}
            product_discrpt={product.description}
            actual_pr={product.price}
            discount_pr={3938}
            product_id={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
