"use client"
import React, { useState } from "react";
import UserForm from "./UserForm";
import Cart from "./Cart";

const Controlar = ({
 hilmaUrl,
  products,
  productbyidArr,
  productId,
  shippingPrice
}: {
  hilmaUrl: any;
  products: any;
  productbyidArr: any;
  productId: any;
  shippingPrice:any
}) => {
    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    const handleRadioChange = (value: string) => {
      setSelectedRadio(value);
    };

  return (
    <>
      <div className="w-[50%]">
        {productId ? (
          <UserForm productData={productbyidArr} shippinGPrice={shippingPrice} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}  hilmaUrl={hilmaUrl} selectedRadio={selectedRadio} />
        ) : (
          <UserForm productData={products} shippinGPrice={shippingPrice} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} hilmaUrl={hilmaUrl} selectedRadio={selectedRadio}/>
        )}
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        {productId ? (
          <Cart productData={productbyidArr} shippinGPrice={shippingPrice} selectedCountry={selectedCountry}  selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange} />
        ) : (
          <Cart productData={products}  shippinGPrice={shippingPrice} selectedCountry={selectedCountry} selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange} />
        )}
      </div>
    </>
  );
};

export default Controlar;
