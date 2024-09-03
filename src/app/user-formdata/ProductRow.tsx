import React from "react";

const ProductRow = ({ product ,shippinGPrice}: any) => {
  const shipPrice = Number(shippinGPrice)
  const totalPrice = product?.product?.price * product.count;
  const shippingPrice = totalPrice < 300 ? shipPrice : 0;
  const finalTotalPrice = totalPrice + shippingPrice;

  return (
    <>
      <tr className="border-b text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
        <td className="w-1/3 py-2 px-4"> {product?.product?.title}</td>
        <td className="w-2/3 py-2 px-4">{product?.product?.price}</td>
      </tr>
      <tr className="border-b text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
        <td className="w-1/3 py-2 px-4">Total Item</td>
        <td className="w-2/3 py-2 px-4">{product?.count}</td>
      </tr>
      <tr className="border-b text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
        <td className="w-1/3 py-2 px-4">Shipping</td>
        <td className="w-2/3 py-2 px-4">{shippingPrice}</td>
      </tr>
      <tr className=" text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
        <td className="w-1/3 py-2 px-4">Total Price</td>
        <td className="w-2/3 py-2 px-4">{finalTotalPrice}</td>
      </tr>
    </>
  );
};

export default ProductRow;
