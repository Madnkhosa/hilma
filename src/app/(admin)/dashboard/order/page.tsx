import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiViewTable } from "react-icons/ci";
import ChangeOrderStatus from "./[orderId]/ChangeOrderStatus";
const Order = async () => {
  const columns = ["Sr.NO", "UserName", "Address", "Price","status" ,"View"];
  let customerData: any[] | undefined;

  try {
    const res = await fetch(`${process.env.HOST_URL}/api/order?type=all`, {
      next: { tags: ["product"] },
    });
    const result = await res?.json();
    customerData = result?.orders;
    console.log("cuttomer data",customerData)
  } catch (error) {
    console.log("Error", error);
  }
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="bg-[#F9F9F9]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customerData?.map((data: any, index: number) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
                {index + 1}
              </td>
              <td className="p-4 gap-2 flex justify-start items-center">
                <div className="text-[16px] font-[700] text-[#0E0E0E]">
                  <span className="mr-2">{data.firstName}</span>
                  {data.lastName}
                </div>
              </td>
              <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
                {data.streetNameAndAddress}
              </td>
              <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
              €{data.price}
              </td>
              <ChangeOrderStatus status={data.status} orderid={data.id}/>
              <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-3">
                  <Link
                    href={`/dashboard/order/${data.id}`}
                    className="font-[800] text-[20px] text-blue-600"
                  >
                    <CiViewTable />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
