import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-[#000000]">
      <div className="w-full bg-[#000000]">
        <div className="grid xs:mx-8 md:grid-cols-3 grid-cols-1 xs:grid-cols-2 gap-8 px-4 py-8 ">
          <div>
            {/* <Link className="" href="/">
              <Image
                src="/assets/hilmalogoo.png"
                alt="logoipsum"
                width={120}
                height={50}
              />
            </Link> */}
            {/* <h2 className="mb-3 text-[24px] font-[500] text-[#ffff]">logo</h2> */}
            <div className="text-[#A8A29E] mt-3 text-[16px] font-[400]">
            Le laboratoire Hilma Biocare a été fondé en 2003. Il est connu pour sa spécialisation dans les stéroïdes anabolisants, l’hormone de croissance (HGH) et les peptides, offrant des produits de haute qualité aux sportifs de haut niveau et aux amateurs.
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {/* <div className="mb-6 text-[18px] font-[500] text-[#FFFFFF]  ">
              Numéro de téléphone
            </div> */}
            <ul className=" text-[#A8A29E] font-[400] text-[16px]">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Livraison et retour
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Termes et conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-[18px] font-[500] text-[#FFFFFF]">
              Contact
            </h2>
            <ul className="text-[#A8A29E] text-[16px]  font-[400] overflow-hidden">
              <li className="mb-4">
                <a href="#" className="hover:underline text-blue-800">
                info@hilma-biocare.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-b border-[#27272A]"></div>
        <div className="px-10 py-6  flex items-center justify-between">
          <span className="text-sm text-[#A8A29E]  sm:text-center">
            @2024 Hilma Biocare – Tous droits réservés.
          </span>
          {/* <div className="flex mt-4 gap-5 text-[#A8A29E]   ">
            <div>politique de confidentialité</div>
            <div>Conditions d&apos;utilisation</div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
