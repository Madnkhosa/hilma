import Link from "next/link";
import React from "react";

const Livraison = () => {
  return (
    <div className=" px-28 pt-[116px] bg-white text-gray-800 w-full">
      <h1 className="text-3xl font-bold mb-4">Livraison et retour</h1>
      <div className="text-[16px] font-semibold my-7">Frais d’expédition</div>
      <ul className="list-disc list-inside mb-4">
        <li>Livraison standard, GARANTIE, (4-15 jours MONDIAL) – 34.90 EUR</li>
      </ul>
      <div className="text-[16px] font-semibold my-5">
        Quelle méthode sera utilisée pour l’expédition ?
      </div>
      <p className="">
        Le fournisseur et le type d’expédition seront déterminés par notre
        service de livraison. Le type dépend de la taille du colis et du pays de
        livraison. Pour plus de détails, veuillez nous contacter à l’adresse
        suivante : info@hilma-biocare.fr
      </p>
      <div className="text-[16px] font-semibold my-5">
        Livraison standard (garantie)
      </div>
      <p>
        Le délai de livraison standard est de 4 à 15 jours ouvrables dans le
        monde entier. Pour plus de détails, veuillez nous contacter. Une fois le
        colis envoyé, vous recevrez un numéro de suivi. Si les marchandises sont
        perdues ou saisies à la douane lors de la première livraison, nous
        offrons la possibilité d’envoyer une deuxième livraison gratuitement.
        (Offre valable uniquement dans la zone européenne de Schengen, à
        l’exclusion des pays scandinaves et de la Finlande)*. Si les
        marchandises sont perdues ou retenues à la douane lors de la 2 e
        livraison, nous offrons la possibilité d’envoyer une nouvelle livraison
        lors de la 3 e livraison à moitié prix. (Offre valable uniquement dans
        la zone européenne de Schengen) Nous nous efforçons de livrer vos
        marchandises dans un délai de 4 à 15 jours, mais les retards de
        livraison sont parfois indépendants de notre volonté. Veuillez noter que
        la réexpédition se fera 45 jours après la première expédition. (Offre
        valable uniquement dans la zone européenne de Schengen) Tous les colis
        sont expédiés avec une grande discrétion. Les produits sont emballés en
        toute sécurité avec le maximum de soin et de précaution. Il n’y a jamais
        d’utilisation du nom des produits ou du nom de l’organisation pour une
        livraison réussie. *S’applique uniquement aux commandes au détail. Les
        colis sont toujours expédiés avec le poids et la taille nécessaires pour
        une livraison en toute sécurité. Les envois peuvent provenir de
        différents pays afin d’accélérer le processus d’expédition.
      </p>
      <div className="text-[16px] font-semibold my-5">
        Combien de temps faut-il pour envoyer mon colis ?
      </div>
      <p>
        Une fois le paiement reçu, votre commande sera envoyée dans les 2-3
        jours ouvrables. Le délai de livraison est de 4 à 15 jours ouvrables
        dans le monde entier. Le délai de livraison dépend des formalités
        douanières, du transit international, des jours fériés, etc. Nous nous
        efforçons de livrer vos marchandises dans un délai de 4 à 15 jours
        ouvrables, mais les retards de livraison sont parfois indépendants de
        notre volonté.
      </p>
      <div className="text-[16px] font-semibold my-5">
        Est-il légal d’acheter ce type de produits ?
      </div>
      <p>
        Les lois étant différentes d’un pays à l’autre, nous vous recommandons
        de contacter la FDA locale ou le bureau des douanes pour connaître les
        réglementations et les restrictions en vigueur dans votre pays.
      </p>
      <div className="text-[16px] font-semibold my-5">
        Comment les produits sont-ils expédiés ?
      </div>
      <p>
        Le taux de réussite est de 99,99 % pour les États-Unis, de 99,9 % pour
        l’Union européenne et d’environ le même pourcentage pour le reste du
        monde. Nous expédions nos produits par livraison standard dans ces pays
        afin de garantir une expédition discrète et un taux de réussite élevé.
      </p>
      <div className="text-[16px] font-semibold my-5">
        Comment les commandes volumineuses sont-elles livrées ?
      </div>
      <p>
        Dans le cas de commandes volumineuses, votre commande sera divisée en
        plusieurs colis et vous recevrez tous les numéros de suivi afin de
        pouvoir suivre chaque colis. Quelle que soit la taille de votre
        commande, nous la diviserons en une quantité exacte de colis afin de
        nous assurer que les colis seront livrés à l’adresse indiquée.
      </p>
      <div className="Une signature est-elle nécessaire pour recevoir le colis ?">
        Une signature est-elle nécessaire pour recevoir le colis ?
      </div>
      <p>
        Il n’est pas nécessaire d’apposer une signature pour recevoir le colis.
        Selon votre pays d’origine, le service postal peut parfois l’exiger et
        si vous n’êtes pas chez vous, le service postal laissera une carte pour
        vous avertir de retirer le colis à votre bureau de poste local.
      </p>
      <div className="text-[16px] font-semibold my-5">
        Dans quels pays expédiez-vous vos produits ?
      </div>
      <p>Nous livrons dans les pays suivants avec une garantie:</p>
      <p className="mt-4">
        Autriche, Belgique, Chypre, Allemagne, Estonie, Espagne, Grèce, Croatie,
        Hongrie, France, Irlande, Italie, Lituanie, Luxembourg, Lettonie, Malte,
        Pays-Bas, Pologne, Portugal, Roumanie, Slovénie, Slovaquie, Canada,
        États-Unis, Angleterre, Danemark, Finlande, Norvège, Suède, et Russie.
      </p>
      <p className="mt-4">Nous livrons dans les pays suivants sans garantie:</p>
      <p className="mt-4">
        Émirats arabes unis, Albanie, Australie, Chine, Gibraltar, Hong Kong,
        Japon, Corée, Monaco, Nouvelle-Zélande, Singapour, Suisse, Thaïlande,
        Turquie et Taïwan.
      </p>
      <p className="mt-4">Envoi en point relais</p>
      <p className="mt-4">
        Veuillez simplement nous mentionner l’adresse du point relais en
        question.
      </p>
      <p className="mt-4">
        Nous vous demandons cependant de vérifier au préalable avec le
        fournisseur du point relais que l’adresse est bien correcte afin
        d’éviter que le colis ne se perde.
      </p>
      <p className="mt-4">
        Veuillez noter qu’en cas de perte dû à une adresse incorrecte, nous ne
        réexpédierons pas le colis.
      </p>
      <div className="text-[16px] font-semibold my-5">
        Détails de la politique de retour
      </div>
      <p>
        En cas de réception de produits erronés, les produits corrects seront
        réexpédiés gratuitement, à condition que les produits erronés soient
        renvoyés sans avoir été ouverts et dans un état permettant la revente.
        Si les produits arrivent endommagés en raison d’un mauvais emballage par
        Hilma-biocare.fr, les produits seront réexpédiés gratuitement sur
        présentation d’une réclamation et d’une preuve de mauvais emballage. Les
        retours ne sont acceptés que s’il est prouvé que les produits sont
        inutilisables. Veuillez nous contacter pour obtenir l’adresse de retour
        et les détails concernant l’emballage des produits AVANT de les
        renvoyer. Les produits doivent être retournés dans les 30 jours suivant
        la date de livraison. Hilma-biocare.fr se réserve le droit de demander à
        l’acheteur de payer les frais de retour.
      </p>
      <div className="text-[16px] font-semibold my-5">Moyens de paiement</div>
      <p>
        Nous acceptons les paiements en crypto-monnaies ainsi que par cartes
        bancaires moyennant des frais de 10%.
      </p>

      <div className="grid place-items-end mt-12 px-20">
        <div className="text-center flex flex-col">
          <Link href="/propos" className="text-blue-600 underline ">
            À propos
          </Link>
          <Link href="/livraison" className="text-blue-600 mt-2  underline">
            Livraison et retour
          </Link>
          <Link href="/termes -and-condition" className="text-blue-600 mt-2 underline">
            Termes et conditions
          </Link>
          <p className="text-center my-8 text-gray-600">
            ©2022 Hilma Biocare – Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Livraison;
