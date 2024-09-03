
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { CiShoppingCart } from "react-icons/ci";

const CartIcon = ({objectCount}:{objectCount:number}) => {
  return (
    <Link href="/cart" passHref>
      <div className="border relative border-[#000000] p-2 rounded-full flex justify-center items-center">
      <CiShoppingCart className='font-bold text-[20px] w-[20px] h-[20px]' />
      </div>
      <div className="absolute h-4 w-4 bg-[#000000] rounded-full flex justify-center items-center text-center text-blue-700 top-[19px] right-[48px]">
        {objectCount}
      </div>
    </Link>
  );
};

export default CartIcon;
