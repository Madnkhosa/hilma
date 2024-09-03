import React from "react";
import Image from "next/image";
const ProductList = ({ img }: { img: string }) => {
  return (
    <div className="border border-black relative h-[100px] w-[100px] mb-2 rounded-lg">
      <Image src={img} fill alt="jdg" />
    </div>
  );
};

export default ProductList;
