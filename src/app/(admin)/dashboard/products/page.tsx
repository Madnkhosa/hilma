import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";
import { CiViewTable } from "react-icons/ci";
import Link from "next/link";
import ProductImage from "./(component)/ProductImage";
import { unstable_noStore as noStore } from 'next/cache';
type Product = {
  id: string;
  title: string;
  img: string;
  description: string;
  price: number;
  usg: string;
  categoryId: string;
  category: category;
};

type category = {
  id: string;
  name: string;
};

const Products = async () => {
  noStore();
  const columns = [
    "Sr.NO",
    "Product",
    "Price",
    "Category",
    "Pro_Edit/Del/View",
  ];

  let productData: any[] | undefined;

  try {
    const res = await fetch(`${process.env.HOST_URL}/api/product`, {
      next: { tags: ["product","category"] },
      
    });
    const result = await res?.json();
    productData = result?.products;
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
  }

  return (
    <>
      <div className="w-full flex pb-2 justify-end">
        <Link
          href="/dashboard/products/create"
          className="flex justify-end mt-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          type="button"
        >
      Ajouter un produit
        </Link>
      </div>
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
            {productData &&
              productData?.map((product: Product, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
                    {index + 1}
                  </td>
                  <td className="p-4 gap-2 flex justify-start items-center">
                    <div className="relative z-0 h-[72px] w-[76px] rounded-lg">
                      <Image
                        src={product.img}
                        className="rounded-lg"
                        fill
                        alt="Product Image"
                      />
                    </div>
                    <div className="text-[16px] font-[700] text-[#0E0E0E]">
                      {product.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
                  €{product.price}
                  </td>
                  <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="font-[800] text-[20px] text-blue-600"
                      >
                        <BsPencilSquare />
                      </Link>
                      <Link
                        href={`/product-detail/${product.id}`}
                        className="font-[800] text-[20px] text-blue-600"
                      >
                        <CiViewTable />
                      </Link>
                      <ProductImage productId={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
