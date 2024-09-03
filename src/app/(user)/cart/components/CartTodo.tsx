"use client";
import React, { useEffect, useState } from "react";
import ProductRow from "./ProductRow";
import TotalPrice from "./TotalPrice";
import Link from "next/link";

const CartTodo = ({ productData }: { productData: any }) => {
  const [error, setError] = useState<string | null>(null);
 
  const [subtotals, setSubtotals] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const updateSubtotal = (index: number, subtotal: number) => {
    setSubtotals((prevSubtotals) => {
      const newSubtotals = [...prevSubtotals];
      newSubtotals[index] = subtotal;
      return newSubtotals;
    });
  };
  useEffect(() => {
    const newTotal = subtotals.reduce((acc, curr) => acc + curr, 0);
    setTotal(newTotal);
  }, [subtotals]);


  const handlePaymentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if ( (!productData.some((p: any) => p.count >= 2)) && ( productData.length < 2 )) {
      e.preventDefault();
      setError("Product length or count value must be at least 2.");
    } else {
      setError(null);
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" bg-[#F9F9F9]  hidden md:table-header-group ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                Produit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                Prix
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                Quantité
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product: any, index: number) => (
              <ProductRow
                key={product?.product?.id}
                product={product}
                updateSubtotal={(subtotal: number) =>
                  updateSubtotal(index, subtotal)
                }
              />
            ))}
          </tbody>
        </table>
        <TotalPrice total={total} />
      </div>
      {error && (
          <div className="text-red-500 flex justify-end text-center w-full md:w-[70%]">
            {error}
          </div>
        )}
      <div className="flex justify-between flex-col md:flex-row gap-y-3 md:gap-x-[90px] lg:gap-x-[140px] items-center mt-12">
        
        <div className="bg-[#E5E5E5] w-full md:max-w-none gap-28 flex text-[#71717A] px-4 py-2 justify-between items-center  border rounded-full border-[#F6F5F1]">
          
          <div className="">Code promotionnel</div>
          <div className="bg-[#2B343B] text-[#ffff] px-4 py-2 border rounded-full">
            Appliquer Coupon
          </div>
        </div>
   
          <Link
          onClick={handlePaymentClick}
            href={`/user-formdata?price=${Number(total.toFixed(3))}`}
            className="bg-[#2B343B] w-full md:w-[70%] text-center text-[#ffff] px-4 py-2 border rounded-full"
          >
            Passer au paiement
          </Link>
        
      </div>
    </>
  );
};

export default CartTodo;
