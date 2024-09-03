import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { cookies } from "next/headers";
const NavBar = async () => {
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

  let objectCount = 0;
  if (Array.isArray(parsedValues)) {
    objectCount = parsedValues.length;
  }
  const response = await fetch(`${process.env.HOST_URL}/api/category`, {
    next: { tags: ["products"] },
  });
  type Category = {
    name: string;
    id: string;
  };
  let categoryData;
  if (response.ok) {
    categoryData = await response?.json();
  }
  
  return (
    <div className="flex justify-between items-center py-6 px-4 md:px-10 bg-[#ffff]">
      <Link href="/">
        <Image
          src="/assets/hilmalogoo.png"
          alt="logoipsum"
          width={120}
          height={50}
        />
      </Link>
      <div className="hidden sm:flex justify-between items-center sm:gap-3 lg:gap-5 sm:text-[12px] lg:text-[14px] font-[400] text-[#000000]">
        {categoryData &&
          categoryData?.category
            .slice(0, 5)
            .map((category: Category, index: number) => {
              return (
                <Link className="text-[#000000]" key={index} href={`/products?categoryId=${category.id}`}>
                  {category.name}
                </Link>
              );
            })}
        {/* <Link href="/products">Récupération et protections</Link> */}
      </div>
      <SearchBar objectCount={objectCount}  categoryData={categoryData}/>
    </div>
  );
};

export default NavBar;
