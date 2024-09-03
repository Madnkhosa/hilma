import React from "react";
import Pagination from "./Pagination";
import ProductCard from "@/components/ProductCard";
const SectionThreeExploreRange = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  let productData: any[] | undefined;
  try {
    const url = categoryId
      ? `${process.env.HOST_URL}/api/product?categoryId=${categoryId}`
      : `${process.env.HOST_URL}/api/product`;
    const res = await fetch(url, {
      next: { tags: ["product"] },
    });
    const result = await res?.json();
    productData = result?.products;
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <div className="pb-8">
      <div className="lg:text-[44px] md:text-[30px] text-[24px] font-[700] mt-4 text-[#ffff]">
        Explorez notre <span className="text-[#0BA3C8]">Gamme</span> de produits
      </div>
      <div className="md:text-[18px] text-[14px] font-[400] text-[#A8A29E]">
      Obtenez des gains supérieurs grâce à Hilma Biocare
      </div>
      <div className="mt-2 flex relative z-10">
        <Pagination />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3   gap-3">
        {productData &&
          productData
            ?.slice(0, 8)
            .map((product: any, index: any) => (
              <ProductCard
                key={index}
                discount={50}
                product_url={product.img}
                product_name={product.title}
                product_discrpt={product.description}
                actual_pr={product.price}
                discount_pr={1730.99}
                product_id={product.id}
              />
            ))}
      </div>
    </div>
  );
};

export default SectionThreeExploreRange;
