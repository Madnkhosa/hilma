"use client";
import { useState } from "react";
import ProductRow from "./ProductRow";
import { useSearchParams } from "next/navigation";

const Cart = ({
  productData,
  selectedRadio,
  shippinGPrice,
  selectedCountry,
  onRadioChange,
}: {
  productData: any;
  selectedRadio: string | null;
  selectedCountry: any;
  shippinGPrice: number;
  onRadioChange: (value: string) => void;
}) => {
  const countriesWithMessage = [
    "Austria",
    "Belgium",
    "Cyprus",
    "Germany",
    "Estonia",
    "Spain",
    "Greece",
    "Croatia",
    "Hungary",
    "France",
    "Ireland",
    "Italy",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovenia",
    "Slovakia",
    "Canada",
    "United States",
    "England",
    "Denmark",
    "Finland",
    "Norway",
    "Sweden",
    "Russia",
  ];
  const searchParams = useSearchParams();
  const pr = searchParams.get("price");
  const totalPrice = Number(pr);
  const totalCount = productData.reduce(
    (acc: number, p: any) => acc + p.count,
    0
  );

  const shippingPr = totalPrice < 300 ? shippinGPrice : 0;
  const shippingPrice= Number(shippingPr)
  const finalTotalPrice = totalPrice + shippingPrice;
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="bg-[#20344c] rounded-[8px] overflow-hidden border-0 p-4 w-full flex flex-col justify-center items-center ">
        <div className="font-rubik font-medium text-2xl text-white leading-[1.7em] mb-4">
          Your order
        </div>
        <table className="w-full overflow-hidden text-white">
          <thead>
            <tr className="border-[#3a5a7d] border-b ">
              <th className="w-1/3 py-3 px-4 text-left">Product</th>
              <th className="w-2/3 py-3 px-4 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
              <td className="w-1/3 py-2 px-4">Total Item</td>
              <td className="w-2/3 py-2 px-4">{totalCount}</td>
            </tr>
            <tr className="border-b text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
              <td className="w-1/3 py-2 px-4">Shipping</td>
              <td className="w-2/3 py-2 px-4">{shippingPrice}</td>
            </tr>
            <tr className=" text-[#8696a8] font-[800] text-[14px] border-[#3a5a7d]">
              <td className="w-1/3 py-2 px-4">Total Price</td>
              <td className="w-2/3 py-2 px-4">{finalTotalPrice}</td>
            </tr>
            {/* {productData.map((product: any, index: number) => (
              <ProductRow
                key={index}
                shippinGPrice={shippinGPrice}
                product={product}
              />
            ))} */}
          </tbody>
        </table>
      </div>
      {countriesWithMessage.includes(selectedCountry) && (
        <p className="text-white bg-[#20344c] rounded-lg p-4 font-semibold text-[16px] text-center mt-2">
          We send a second free parcel if the first one is seized or lost.
        </p>
      )}
      <div className="mt-5 bg-[#20344c] rounded-[8px] overflow-hidden border-0 p-4 w-full flex flex-col ">
        <label className="block mb-2 text-white">
          <input
            className="m-4"
            type="radio"
            name="textOption"
            value="paymentbystripe"
            checked={selectedRadio === "paymentbystripe"}
            onChange={() => onRadioChange("paymentbystripe")}
          />
          Carte bancaire +10% de frais (redirection)
        </label>
        <div className="text-white">
          {selectedRadio === "paymentbystripe" && (
            <p className="border text-[12px] p-5 ml-4">
              Effectuez le paiement par Carte bancaire incluant 10% de frais. Le
              paiement se fera grâce à une redirection sur un autre site web.
            </p>
          )}
        </div>
        <label className="block mb-2 text-white">
          <input
            className="m-4"
            type="radio"
            name="textOption"
            value="paymentthrowemail"
            checked={selectedRadio === "paymentthrowemail"}
            onChange={() => onRadioChange("paymentthrowemail")}
          />
          Virement bancaire (NE PAS MENTIONNER HILMA BIOCARE)
        </label>
        <div className="text-white">
          {selectedRadio === "paymentthrowemail" && (
            <p className="border text-[12px] p-5 ml-4">
              Merci d’ignorer la redirection vers le paiement par carte. Les
              informations de transfert vous seront transmis par mail. Merci de
              vérifier vos spams dans le cas où vous ne le recevriez pas. Votre
              commande ne sera pas expédiée tant que les fonds ne seront pas
              reçus. NE MENTIONNEZ SURTOUT PAS HILMA BIOCARE DANS LE
              DESTINATAIRE !.
            </p>
          )}
        </div>
        {/* <label className="block mb-2 text-white ">
          <input
            className="m-4"
            type="radio"
            name="textOption"
            value="text3"
            checked={selectedRadio === "text3"}
            onChange={() => onRadioChange("text3")}
          />
          Cryptomonnaies
        </label> */}
        {/* <div className="mt-4 text-white">
          {selectedRadio === "text3" && <p className="border text-[12px] p-5 ml-4">This is the text for option 3.</p>}
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
