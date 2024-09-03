import Link from "next/link";
const Pagination = async () => {
  const response = await fetch(`${process.env.HOST_URL}/api/category`, {
    next: { tags: ["products"] },
  });
  let categoryData;
  if (response.ok) {
    categoryData = await response?.json();
  }
  const categories = categoryData?.category;
  return (
    <nav id="bridcrums" className="flex gap-3 pb-2 justify-start items-center hide-scrollbar overflow-x-scroll overflow-y-hidden">
      <ul className="flex items-center h-8 text-sm gap-3 mt-5">
        <li className="">
          <Link
            scroll={false}
            href="/home"
            className={`text-[#ffff] hover:bg-[#0BA3C8] focus:bg-[#0BA3C8]  flex justify-center items-center flex-grow px-4 py-3 border border-[#ffff] rounded-full border-[#0BA3C8]`}
          >
            Maison
          </Link>
        </li>
      </ul>
      <ul className="flex h-8 items-center text-sm gap-3 mt-5">
        {categories?.map((category: any, index: number) => (
          <li key={index}>
            <Link
              href={`/home/?categoryId=${category.id}`}
              className={`text-[#ffff] min-w-max focus:bg-[#0BA3C8] hover:bg-[#0BA3C8] flex justify-center items-center px-4 py-3 border border-[#ffff] rounded-full }`}
              scroll={false}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
