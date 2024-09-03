import React from "react";
import CardCollection from "./card-collection";

const HumanGrowthHormonePage = async ({
  searchParams,
}: {
  searchParams?: {
    categoryId?:string;
    search?: string
    sort?:string
  };
}) => {
  const categoryId = searchParams?.categoryId || "";
  const search = searchParams?.search|| "";
  const sort = searchParams?.sort && searchParams?.sort === "Prix le plus bas" ? "asc" : "desc";
  let productData: any[] | undefined;
  let categoryName: string = "";
  try { 
    let apiUrl = `${process.env.HOST_URL}/api/product`;

    if (categoryId) {
      apiUrl = `${process.env.HOST_URL}/api/product?categoryId=${categoryId}`;
    } else if (search) {
      apiUrl = `${process.env.HOST_URL}/api/product?search=${search}`;
    } else if (sort) {
      apiUrl = `${process.env.HOST_URL}/api/product?sort=${sort}`;
    } else{
      apiUrl = `${process.env.HOST_URL}/api/product`;
    }

    const res = await fetch(apiUrl,{
      next: { tags: ["product"] },
    });
    const result = await res.json();
    productData = result?.products;
    if (productData && productData.length > 0) {
      categoryName = productData[0]?.category?.name || "";
    }
  } catch (error) {
    console.log("Error", error);
  }
  return (
    <>
      <div className="pt-16 pb-11 flex justify-center items-center flex-col bg-[#2B343B]">
        <div className="xs:text-[44px] text-[20px] mt-10 text-center font-[700] text-[#FFFF]">
          {categoryId ? categoryName : "products"}
        </div>
        <div className="xs:text-[18px] text-[14px] font-[400] text-[#FFFFFF]">
        Produit &gt; {categoryId ? categoryName : "products"}
        </div>
      </div>
      <div className="bg-[#ede9e9]">
        <CardCollection productData={productData} />
      </div>
    </>
  );
};

export default HumanGrowthHormonePage;
