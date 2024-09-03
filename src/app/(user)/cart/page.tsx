import React from "react";
import CartTodo from "./components/CartTodo";
import { cookies } from "next/headers";
const Cart = async () => {
  const cookie = cookies();
  const cookieValues = cookie.get("values");
  let parsedValues = [];
  if (cookieValues) {
    try {
      parsedValues = JSON.parse(cookieValues.value);
    } catch (error) {
      console.error("Failed to parse cookie values:", error);
    }
  }
  const products = await Promise.all(
    parsedValues.map(async (item: any) => {
      const response = await fetch(
        `${process.env.HOST_URL}/api/product/${item.productId}`
      );
      const productData = await response.json();
      return { ...productData, count: parseInt(item.count, 10) };
    })
  );
 
  return (
    <>
      <div className="pt-16 pb-12 bg-[#2B343B]">
        <div className="flex justify-center items-center pt-14 text-[#FFFFFF] font-[700] text-[44px]">
        Panier
        </div>
        <div className="flex justify-center items-center pt-3 text-[#FFFFFF] font-[400] text-[18px]">
        Accueil &gt; Panier
        </div>
      </div>
      <div className="bg-[white] pt-10 sx:px-10 px-4 pb-16 ">
        <CartTodo productData={products} />
      </div>
    </>
  );
};

export default Cart;
