import React from "react";
import Image from "next/image";
import Link from "next/link";
const FitnessLife = () => {
  return (
    <div className="bg-gradient-to-t pb-32 md:pb-0 from-transparent object-cover flex-col flex justify-center items-center to-gray-900 mx-10 mt-5">
      <Image
        className=""
        src="/assets/bodyBulder.svg"
        alt="Background Image"
        height={1000}
        width={1000}
        objectFit="cover"
      />
      <div className="absolute md:text-[100px] xs:text-[50px] sm:text-[70px] text-[30px] font-bold flex flex-col text-center md:leading-[90px] xs:leading-[60px] leading-[30px]">
        <div className="text-[#ffff]">CE N&apos;EST PAS</div>
        <div className="flex justify-center items-center ">
          <div className="text-[#ffff]">APTITUDE</div>
          <Link
            href="/products"
            className="bg-[#0BA3C8] text-[12px] rounded-full md:leading-5  leading-3 flex text-center xs:px-4 xs:py-3 px-3 py-2  md:px-6 md:py-5 justify-center  items-center text-[#ffff]"
          >
            Hilma <br />
            Des produits
          </Link>
        </div>
        <div className="text-[#0BA3C8] ">
          C&apos;EST <span className="text-[#ffff]">VIE</span>
        </div>
      </div>
      <Link
        href="/products"
        className="relative top-11 bg-[#FFFFFF] py-2 xs: text-[12px] md:text-[16px] font-[700] px-3 rounded-full text-black"
      >
        Acheter des produits maintenant{" "}
      </Link>
    </div>
  );
};

export default FitnessLife;
