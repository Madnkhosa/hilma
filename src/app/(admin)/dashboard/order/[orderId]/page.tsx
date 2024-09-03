import Image from "next/image";
import React from "react";

const ViewOrderDetails = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const orderid = params?.orderId;
  let orderData;
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/order/${orderid}`, {
      next: { revalidate: 1 },
    });
    if (res.ok) {
      const result = await res.json();
      orderData = result.order;
    }
  } catch (error) {
    console.log("Error", error);
  }
  const productDtails = orderData.productDetails;
  const productDataPromises = productDtails.map(
    async (productDetail: { id: string; count: number }) => {
      const productRes = await fetch(
        `${process.env.HOST_URL}/api/product/${productDetail.id}`
      );
      const productResult = await productRes?.json();
      return {
        ...productResult,
        count: productDetail.count,
      };
    }
  );
  const fetchedProducts = await Promise.all(productDataPromises);
  fetchedProducts.map((product, index: number) =>
    console.log()
  );
  return (
    <div>
      <div className="h-20 text-[16px] p-5 font-[700] w-full bg-slate-200">
        Checkout
      </div>
      <div className="grid bg-white grid-cols-3 gap-4 p-4 ">
        {fetchedProducts.map((product, index: number) => (
          <div key={index} className="col-span-2 flex">
            <div className="relative w-[300px] h-[300px]">
              <Image src={product?.product?.img} alt="Product Image" fill />
            </div>
            <div className="w-2/3 flex flex-col justify-center pl-4">
              <div className="text-lg font-bold">{product?.product?.title}</div>
              <div className="text-sm text-gray-600">
                €{product?.product?.price}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-lg font-semibold text-black">
                  total item:{" "}
                </span>
                {product?.count}
              </div>
            </div>
          </div>
        ))}
        <div className="col-span-1 bg-gray-100 absolute p-4 right-[68px] rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="text-sm mb-2">
            <span className="font-semibold">Name: </span>
            {orderData.firstName} {orderData.lastName}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold">Email: </span>
            {orderData.email}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold">Address: </span>
            {orderData.streetNameAndAddress}, {orderData.city},{" "}
            {orderData.country}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold">ZIP Code: </span>
            {orderData.postalCode}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold">Phone Number: </span>
            {orderData.phoneNumber}
          </div>
          <div className="text-lg font-bold mt-4">
            <span className="font-semibold">Total Price: </span>
            {orderData.price / 100}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
