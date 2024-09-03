import React from "react";
import Link from "next/link";
import Image from "next/image";
const SectionTwoForCoach = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 pb-6 gap-5">
      <div className="">
        <div className="text-[12px] font-[500] text-[#ffff] uppercase ">
          Pour les athlètes
        </div>
        <div className="lg:text-[44px] md:text-[24px] text-[24px] font-[700] text-[#ffff] mt-3 leading-tight">
          Une gamme <span className="text-[#0BA3C8]"> Premium </span>pour des
          performances exceptionnelles
        </div>
        <div className="md:text-[18px] text-[13px] font-[400] text-[#E2E2E2] mt-3">
          Hilma Biocare est spécialisé dans les médicaments de haute qualité
          tels que les stéroïdes anabolisants, l’HGH et les peptides. Exigeant
          en matière de normes pharmaceutiques, nous concevons nos produits pour
          soutenir les athlètes et les amateurs dans l’atteinte de leurs
          objectifs de performance. Nous sécurisons tous nos produits grâce à un
          code unique apposé sur chacune de nos fioles pour éviter toute
          contrefaçon et ainsi vous garantir la pureté de nos produits .
        </div>
        <Link
          href="/products"
          className="md:text-[14px] text-[13px]  text-[#1C1917] flex justify-center items-center w-[135px] py-2 text-center font-[700] mt-3 rounded-full bg-[#ffff] "
        >
          Découvrir les produits
        </Link>
      </div>
      <div className="relative w-full md:h-full h-[200px] sm:h-[300px] rounded-lg">
        <Image
          src="/assets/bodyBuilder (2).svg"
          fill
          className="rounded-lg object-cover md:object-fill"
          alt="image"
        />
      </div>
    </div>
  );
};

export default SectionTwoForCoach;
