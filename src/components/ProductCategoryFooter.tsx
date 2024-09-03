import React from "react";
import Image from "next/image";
import Link from "next/link";
import ImageZoom from "./ImageZoom";
const ProductCategoryFooter = ({
  imageUrl,
  categoryText,
  cat
}: {
  imageUrl: string;
  categoryText: string;
  cat:string
}) => {
  return (
    <div className="p-6 w-full bg-gradient-to-b from-transparent to-gray-400 rounded-lg">
      <div className="flex justify-end">
        <Link
          href={`/products?categoryId=${cat}`}
          className="bg-[#0BA3C8]  h-[30px] w-[30px] rounded-full flex justify-center items-center"
        >
          <Image
            src="/assets/upleftarrow.svg"
            height={20}
            width={20}
            alt="image"
          />
        </Link>
      </div>
      <div className="relative h-[232px] w-[200px] mx-auto">
        <ImageZoom imageUrl={imageUrl} />
      </div>
      <div className="mt-3 md:text-[20px] text-[16px] flex justify-start font-[700] text-[#ffff]">
        {categoryText}
      </div>
      <Link
        href="/products"
        className="md:text-[16px] text-[14px] flex justify-start font-[400] text-[#ffff]"
      >
        Acheter maintenant
      </Link>
    </div>
  );
};

export default ProductCategoryFooter;
