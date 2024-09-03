"use client";
import React, { useState, useEffect } from "react";
import CounterCart from "./CounterCart";
import Image from "next/image";
import { SetCookies } from "@/app/(server)/action/SetCookies";
import { RemoveCookieByProductId } from "@/app/(server)/action/RemoveCookies"; //
import Link from "next/link";

const ProductRow = ({ product, updateSubtotal }: any) => {
  const productId = product?.product?.id;
  const [count, setCount] = useState<number>(product.count);
  useEffect(() => {
    const subtotal = product?.product?.price * count;
    updateSubtotal(subtotal);
  }, [count]);

  const updateCookie = (newCount: number) => {
    const values = { productId, count: newCount };
    SetCookies(values);
  };
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCookie(newCount);
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateCookie(newCount);
    }
  };

  const removeProductFromCart = () => {
    RemoveCookieByProductId(productId);
  };

  return (
    <>
      <tr className="bg-white table-flex border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4 gap-2 flex justify-start items-center">
          <div className="relative h-[100px] w-[100px]">
            <Image src={product?.product?.img} fill alt="Apple Watch" />
          </div>
          <div className="">
            <Link
              href={`/product-detail/${product?.product?.id}`}
              className="text-[16px] min-w-max font-[700] text-[#0E0E0E]"
            >
              {product?.product?.title}
            </Link>
            <div className="block md:hidden text-[16px] font-[700] text-[#0E0E0E] dark:text-white">
              ${product?.product?.price}
            </div>
          </div>
        </td>
        <td className="px-6 hidden md:table-cell py-4 text-[16px] font-[700] text-[#0E0E0E] dark:text-white">
          ${product?.product?.price}
        </td>

        <td className="px-6 py-4 hidden md:table-cell">
          <CounterCart
            count={count}
            increment={increment}
            decrement={decrement}
          />
        </td>
        <td className="px-6 py-4 hidden md:table-cell">
          <div className="flex gap-3">
            <div className="text-[16px] font-[700] text-[#0E0E0E]">
            €{ (product?.product?.price * count).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) }
            </div>
            <Image
              src="/assets/removeicon.svg"
              height={20}
              width={20}
              alt="Remove Product"
              onClick={removeProductFromCart}
            />
          </div>
        </td>

        <td className="block md:hidden ">
          <div className="flex  justify-between items-center px-4">
            <div>
              <div>Quentite</div>
              <CounterCart
                count={count}
                increment={increment}
                decrement={decrement}
              />
            </div>
            <div>
              <div>subtotal</div>
              <div className="text-[16px] font-[700] flex justify-center gap-2 text-[#0E0E0E]">
                ${product?.product?.price * count}
                <Image
                  src="/assets/removeicon.svg"
                  height={20}
                  width={20}
                  alt="Remove Product"
                  onClick={removeProductFromCart}
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductRow;
