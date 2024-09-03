import Link from "next/link";
import React from "react";

const Propos = () => {
  return (
    <>
   
      <div className="px-28 pt-[116px] bg-white text-gray-800 w-full">
        <h1 className="text-3xl font-bold mb-4">À propos</h1>
        <p className="mb-4">
          Hilma-biocare.fr est ce que nous aimerions représenter comme un magasin
          sûr pour acheter des stéroïdes anabolisants, des hormones de croissance
          humaines (Hgh) et des peptides de haute qualité dans le monde entier.
          Notre objectif principal est d&apos;offrir les prix bas, un service de
          qualité et des produits de qualité supérieure. Nous croyons que des
          suppléments de haute qualité aideront à améliorer les résultats des
          athlètes avec un maximum de bénéfices et un minimum d&apos;effets
          indésirables et c&apos;est quelque chose que tous les athlètes du monde
          entier recherchent. Notre équipe concentre ses capacités sur les
          médicaments génériques, domaine dans lequel nous souhaitons améliorer la
          disponibilité de nos produits de qualité (médicaments) et sensibiliser
          le monde aux économies réalisées en proposant des médicaments à la
          population générale. Hilma-biocare.fr prend toutes les responsabilités
          au cours de la coopération. Cela signifie que vous obtiendrez toujours
          vos produits ou votre argent en cas de problème.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Médicaments conformes aux normes GMP, ISO et USP.</li>
          <li>Utilisation de poudres et d&apos;ingrédients bruts certifiés</li>
          <li>
            Nous testons en laboratoire chaque lot de produits pour nous assurer
            que tous les produits ont un niveau de qualité élevé et que tous les
            athlètes obtiendront exactement ce qu&apos;ils demandent.
          </li>
          <li>
            Un environnement sûr et fiable pour l&apos;achat et l&apos;utilisation de
            stéroïdes anabolisants, de peptides et d&apos;hormones de croissance.
          </li>
          <li>
            Livraison dans un emballage très sûr. Nous prenons 100% de
            responsabilité pour la livraison (livraison garantie pour les pays de
            l&apos;UE).
          </li>
          <li>Expédition par Standard Post et UPS, DHL, DPD, TNT.</li>
          <li>
            Expédition en 1ère classe depuis différents pays de l&apos;UE (le pays
            d&apos;expédition dépend du pays de destination), ce qui signifie que vous
            recevrez votre matériel dans les plus brefs délais et avec un maximum
            de sécurité.
          </li>
        </ul>
        <p className="mb-4">
          Si vous avez des questions, n&apos;hésitez pas à nous contacter à l&apos;adresse{" "}
          <Link href="mailto:info@hilma-biocare.fr" className="">
            info@hilma-biocare.fr
          </Link>
          .
        </p>
        <div className="grid place-items-end mt-12 px-20">
          <div className="text-center flex flex-col">
            <Link href="/propos" className="text-blue-600 underline ">
              À propos
            </Link>
            <Link href="/livraison" className="text-blue-600 mt-2  underline">
              Livraison et retour
            </Link>
            <Link href="/termes-and-condition" className="text-blue-600 mt-2 underline">
              Termes et conditions
            </Link>
            <p className="text-center my-8 text-gray-600">
              ©2022 Hilma Biocare – Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Propos;
