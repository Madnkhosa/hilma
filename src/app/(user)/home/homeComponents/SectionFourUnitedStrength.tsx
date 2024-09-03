import React from "react";
import Image from "next/image";
import Link from "next/link";
const SectionFourUnitedStrength = () => {
  return (
    <div className="relative w-full md:h-[697px] h-[500px] rounded-lg">
      <Image
        src="/assets/builder_bg-imag.svg"
        className="object-cover rounded-lg"
        alt="icon"
        fill
      />
      <div className="absolute md:py-20 md:px-10 py-4 px-3 flex flex-col h-full w-full justify-between">
        <div className="lg:text-[44px] md:text-[30px] text-[16px] lg:pr-[200px] md:pr-[100px] font-[700] text-[#ffff]">
        Communauté Hilma Biocare : Unis pour un physique et une santé améliorés
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#FFFFFF] md:text-[18px] text-[12px] w-[60%] font-[400]">
          Hilma Biocare est le leader du marché pour la supplémentation hormonale chez les sportifs de haut niveau. Le laboratoire a été fondée en 2003 mettant en œuvre des procédures de fabrication conformes aux normes les plus élevées de l&apos;industrie pharmaceutique, garantissant ainsi la pureté, la sécurité et l&apos;efficacité de chacun de leurs produits.
          </div>
          <Link
            href="/products"
            className="md:px-6 xs:px-4 xs:py-2 xs:text-[14px] px-2 py-1 text-center text-[#0C0A09] md:text-[18px] text-[12px] font-[700] bg-[#ffff] rounded-full flex justify-center items-center "
          >
            Achetez nos produits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionFourUnitedStrength;
