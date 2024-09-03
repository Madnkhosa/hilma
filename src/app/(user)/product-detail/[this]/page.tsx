import React from "react";
import Wishlistbutton from "../component/Wishlistbutton";
import ProductImgAndTitle from "../component/ProductImgAndTitle";
import KeyPoint from "../component/KeyPoint";
import ProductDiscript from "../component/ProductDiscript";
import RelatedProduct from "../component/RelatedProduct";
const ProductDetail = async ({ params }: { params: { this: string } }) => {
  let productData;
  const productId = params.this;
  const response = await fetch(
    `${process.env.HOST_URL}/api/product/${productId}`,{
      next:{ tags: ["product"] }
    }
    
  );
  if (response.ok) {
    productData = await response.json();
  }
  console.log("product data",productData)
  return (
    <>
      <div className="pt-16 bg-[#2B343B] pb-6"></div>
      <div className="bg-white px-4 xs:px-10 pt-4 ">
        <Wishlistbutton name={productData?.product?.title} />
        <ProductImgAndTitle productData={productData} productId={productId} />
        <div className="overflow-x-scroll hide-scrollbar">
          <div className="flex justify-center mt-3 min-w-max ">
            <KeyPoint />
          </div>
        </div>
        <ProductDiscript productData={productData?.product?.description} />
        <RelatedProduct productId={productData?.product?.categoryId} />
      </div>
    </>
  );
};

export default ProductDetail;