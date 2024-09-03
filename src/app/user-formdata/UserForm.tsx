"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
const secretKey = "AsDf1234";
const formFields = [
  { name: "firstName", type: "text", label: "Prénom *" },
  { name: "lastName", type: "text", label: "Nom *" },
  {
    name: "streetNameAndAddress",
    type: "text",
    label: "Numéro et nom de rue *",
    placeholder:"Numéro de voie et nom de la rue"
  },
  { name: "annex", type: "text", label: "", placeholder:"Bâtiment, appartement, lot, etc. (facultatif)" },
  { name: "city", type: "text", label: "Ville *" },
  { name: "postalCode", type: "number", label: "Code postal *" },
  { name: "phoneNumber", type: "number", label: "Téléphone *" },
  { name: "email", type: "email", label: "E-mail *" },
  { name: "address", type: "text", label: "Nom de l’entreprise (facultatif) " },
  // { name: "mailAddress", type: "text", label: "mailAddress" },
];
const countriesWithMessage = [
  "Austria", "Belgium", "Cyprus", "Germany", "Estonia", "Spain", "Greece", "Croatia",
  "Hungary", "France", "Ireland", "Italy", "Lithuania", "Luxembourg", "Latvia", "Malta",
  "Netherlands", "Poland", "Portugal", "Romania", "Slovenia", "Slovakia", "Canada",
  "United States", "England", "Denmark", "Finland", "Norway", "Sweden", "Russia"
];

const countries = [
  "United Arab Emirates", "Albania", "Australia", "China", "Gibraltar",
  "Hong Kong", "Japan", "Korea", "Monaco", "New Zealand", "Singapore",
  "Switzerland", "Thailand", "Turkey", "Taiwan", ...countriesWithMessage
];
type FormData = {
  firstName: string;
  lastName: string;
  streetNameAndAddress: string;
  annex: string;
  city: string;
  postalCode: number;
  country: string;
  phoneNumber: number;
  email: string;
  address: string;
  // mailAddress: string;
  productDetails: { id: string; count: number }[];
};

const UserForm = ({
  productData,
  shippinGPrice,
  hilmaUrl,
  selectedRadio,
  selectedCountry,
  setSelectedCountry
}: {
  productData: any;
  hilmaUrl: any;
  shippinGPrice:number
  selectedRadio: any;
  selectedCountry:string
  setSelectedCountry:any
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [selectedCountry, setSelectedCountry] = useState<string>("");
  const productDetails = productData.map((item: any) => ({
    id: item?.product?.id,
    count: item?.count,
  }));
  const shipPrice=Number(shippinGPrice)
  const searchParams = useSearchParams();
  const pr = searchParams.get("price");
  const shippingPrice = Number(pr);
  let price =null
  if (shippingPrice < 300) {
    const totalPrice = (shippingPrice + shipPrice).toString();
     price=totalPrice 
  }
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    setErrorMessage(null); 

    if (!selectedRadio) {
      setErrorMessage("Please select a payment method.");
      return;
    }

    const formDataWithProducts = {
      ...data,
      productDetails,
    };

    try {
     
      if (selectedRadio === "paymentbystripe") {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(formDataWithProducts),
          secretKey
        ).toString(); 
        
        const encryptedPrice = CryptoJS.AES.encrypt(
          price ?? "0",
          secretKey
        ).toString();
         
        const paymentUrl = `${hilmaUrl}/payment?price=${encodeURIComponent(encryptedPrice)}&data=${encodeURIComponent(
          encryptedData
        )}`;
    
        window.location.href = paymentUrl;
      } else if (selectedRadio === "paymentthrowemail") {
        const formData = new FormData();
        formFields.forEach((field) => {
          formData.append(field.name, (data as any)[field.name]);
        });
        formData.append("productDetails", JSON.stringify(productDetails));
        formData.append("status", "pending");
        formData.append("country", data.country);
        const numericPrice = parseFloat(price || "0"); // Fallback to 0 if price is null
        const priceWithTax = numericPrice * 1.1;
        formData.append("price", priceWithTax.toFixed(2));

        const response = await fetch(`/api/order`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `Failed to post metadata to /api/order: ${errorResponse.error}`
          );
        }
        const responseData = await response.json();
      }
    } catch (error) {
      console.error("Error processing the form:", error);
    }
  };

  return (
    <div className="flex flex-col w-full pt-12 bg-[white] px-4 ">
      <div className="text-[20px] text-center py-6 text-black font-bold">
      Détails de facturation
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 ">
          {formFields.map((field, index) => (
            <div key={index} className="relative z-0 w-full mb-5 group">
               <label
                htmlFor={field.name}
                className=""
              >
                {field.label}
              </label>
              <input
                type={field.type}
                {...register(field.name as keyof FormData, {
                  required: `${field.label} is required`,
                })}
                className="block rounded-md px-3 py-2  w-full text-lg text-gray-900 bg-transparent border border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={field.placeholder}
              />
             
              {errors[field.name as keyof FormData] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name as keyof FormData]?.message}
                </p>
              )}
            </div>
          ))}
           <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="country" className="">
              Pays/région *
            </label>
            <select
               
              id="country"
              {...register("country", { required: "Country is required" })}
              className="block rounded-md px-3 py-2 w-full text-lg text-gray-900 bg-transparent border border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Sélectionner un pays</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>
       
        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Soumettre
        </button>
       
      </form>
    </div>
  );
};

export default UserForm;
