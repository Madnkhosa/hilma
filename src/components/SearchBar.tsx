'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { IoMdSearch } from "react-icons/io";
import { useRouter } from 'next/navigation';

const SearchBar = ({ objectCount, categoryData }: { objectCount: number, categoryData: any }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTextVisible, setIsTextVisible] = useState(false);
  const router=useRouter()

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (searchQuery) {
    router.push(`/products?search=${searchQuery}`)
    }
  }, [searchQuery]);

  return (
    <>
      <div className="flex gap-3">
        {showSearchBar ? (
          <form onSubmit={handleSearch}>
            <Link href="#" className="hidden sm:flex justify-center items-center rounded-full">
              <input
                type="text"
                placeholder="Search..."
                className="px-2 bg-transparent text-[#000000] py-1 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Link>
          </form>
        ) : (
          <div className="border hidden sm:flex border-[#000000] p-2 rounded-full justify-center items-center" onClick={toggleSearchBar}>
            <IoMdSearch className='w-[20px] h-[20px]' />
          </div>
        )}
        <CartIcon objectCount={objectCount} />
        <button
          className="sm:hidden justify-start items-center text-black text-[30px] focus:outline-none"
          onClick={toggleTextVisibility}
        >
          ☰
        </button>
        {isTextVisible && (
          <div className='absolute top-20 right-3 bg-slate-400 p-4 rounded-lg'>
            {categoryData &&
              categoryData?.category
                .slice(0, 5)
                .map((category: any, index: number) => {
                  return (
                    <Link className='flex gap-3 text-[15px] border-b py-2' key={index} href={`/products?categoryId=${category.id}`}>
                      {category.name}
                    </Link>
                  );
                })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
