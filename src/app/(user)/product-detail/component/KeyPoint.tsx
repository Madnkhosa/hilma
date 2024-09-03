import React from "react";
import Image from "next/image";
const KeyPoint = () => {
  return (
    <div className="bg-[#E5E5E5] text-[16px] text-[#000] rounded-full font-[300] flex justify-center items-center px-4 py-2 gap-3">
      <Image
        src="/assets/empty-wallet-add.svg"
        height={20}
        width={20}
        alt="cra"
      />
      <span>Economisez grâce à nos prix de laboratoire</span>
      <Image src="/assets/car.svg" height={20} width={20} alt="cra" />
      <span>Livraison gratuite dès 300€</span>
      <Image src="/assets/car.svg" height={20} width={20} alt="cra" />
      <span>Soyez sécurisés grâce à notre garantie de livraison</span>
    </div>
  );
};

export default KeyPoint;
