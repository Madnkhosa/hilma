"use client";
import React, { useState } from "react";
import Menus from "./Menu";
import Pagination from "./Pagination";
import ProductCard from "@/components/ProductCard";

const CardCollection = ({ productData }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(productData?.length / itemsPerPage);
  const currentItems = productData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const data = ["Prix le plus bas", "Prix le plus élevé"];

  return (
    <div className="mx-8 pt-6 pb-10">
      <div className="flex flex-wrap justify-between gap-y-3 mb-4">
        <div className="flex flex-wrap gap-6">
          <Menus data={data} title="Prix" />
        </div>
        <div>{/* <Menus data={data3} title="Sort by" /> */}</div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {currentItems?.map((product: any, index: number) => (
          <div key={index} className="col-span-1">
            <ProductCard
              discount={20}
              product_url={product.img}
              product_name={product.title}
              product_discrpt={product.description}
              actual_pr={product.price}
              discount_pr={655}
              product_id={product.id}
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CardCollection;
