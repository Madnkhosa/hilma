import React from "react";

const ProductDiscript = ({ productData }: { productData: string }) => {
  return (
    <>
      <div className="mt-4 text-[#0E2222] text-[18px] sm:text-[25px] font-[500]">
      Description du produit
      </div>
      <div className="mt-2 text-[#52525B] sm:text-[16px] text-[14px] font-[400]">
        {productData}
      </div>
    </>
  );
};

export default ProductDiscript;
