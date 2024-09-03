import React from "react";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import ProductCategoryFooter from "@/components/ProductCategoryFooter";

const ProductCategory = async ({envUrl}:{envUrl:any}) => {
  const response = await fetch(`${envUrl}/api/category`, {
    next: { tags: ["products"] },
  });
  let categoryData;
  if (response.ok) {
    categoryData = await response?.json();
  }

  interface Product {
    id: string;
    title: string;
    img: string;
    description: string;
    price: number;
    usg: string;
    categoryId: string;
  }

  interface Category {
    id: string;
    name: string;
    products: Product[];
  }
  return (
    <div className="text-center w-full px-4 justify-center items-center pb-11 flex flex-col">
      <div className="text-[12px] mt-8 font-[500] text-[#0C0A09]">
      Laboratoire official Hilma Biocare
      </div>
      <div className="text-[#1C1917] md:text-[44px] text-[24px]  font-[700]">
      Nos catégories
      </div>
      <div className="text-[#44403C] text-[18px] font-[400] xs:px-[10%] md:px-[10%] lg:px-[20%]">
      Nous proposons une large sélection de produits. Nous mettons en œuvre des procédures de fabrication conformes aux normes les plus élevées de l&apos;industrie pharmaceutique, garantissant ainsi la pureté, la sécurité et l&apos;efficacité de chacun de nos produits.
      </div>
      <div className="gap-6 lg:gap-12 lg:w-[94%] xs:grid w-full grid-cols-1 xs:grid-cols-2 md:grid-cols-3 hidden">
        {categoryData?.category.slice(0, 3).map((category: Category) => {
          const firstProductImage =
            category?.products.length > 0
              ? category.products[0].img
              : "/assets/product.svg";
          return (
            <ProductCategoryCard
              key={category.id}
              categoryText={category.name}
              imageUrl={firstProductImage}
              cat={category.id}
            />
          );
        })}
      </div>
      <div className="carousel rounded-box w-full gap-8 xs:hidden ">
        {categoryData?.category.slice(0, 5).map((category: Category) => {
          const firstProductImage =
            category?.products.length > 0
              ? category.products[0].img
              : "/assets/product.svg";
          return (
            <ProductCategoryFooter
              key={category.id}
              categoryText={category.name}
              imageUrl={firstProductImage}
              cat={category.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategory;
