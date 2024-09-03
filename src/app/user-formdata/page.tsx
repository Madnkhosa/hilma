import React from "react";
import { cookies } from "next/headers";
import Cart from "./Cart";
import UserForm from "./UserForm";
import Controlar from "./Controlar";
const FormUserData: React.FC = async ({
  searchParams,
}: {
  searchParams?: {
    quantity?: number;
    productId?: string;
    price?: string;
  };
}) => {
  const productId = searchParams?.productId;
  const quantity = searchParams?.quantity;

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
  const hilmaUrl = process.env.HILMA_URL;
  const shippingPrice =process.env.SHIPPING_PRICE
  const response = await fetch(
    `${process.env.HOST_URL}/api/product/${productId}`
  );
  let productBYID = await response.json();

  const count = Number(quantity);
  productBYID = { ...productBYID, count };
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
    <div className="flex w-full h-screen ">
      <Controlar productId={productId} shippingPrice={shippingPrice}  productbyidArr={[productBYID]} products={products} hilmaUrl={hilmaUrl}/>
      {/* <div className="w-[50%]">
        {productId ? (
          <UserForm productData={[productBYID]} hilmaUrl={hilmaUrl} />
        ) : (
          <UserForm productData={products} hilmaUrl={hilmaUrl} />
        )}
      </div> */}
      {/* <div className="w-[50%] h-full flex justify-center items-center">
        {productId ? (
          <Cart productData={[productBYID]} />
        ) : (
          <Cart productData={products} />
        )}
      </div> */}
    </div>
  );
};

export default FormUserData;
