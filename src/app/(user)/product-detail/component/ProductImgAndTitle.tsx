"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import Link from "next/link";
import { SetCookies } from "@/app/(server)/action/SetCookies";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductImgAndTitle = ({
  productData,
  productId,
}: {
  productData: any;
  productId: string;
}) => {
  const [count, setCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categore, setCategore] = useState<any | null>(null);
  const updateCookie = (newCount: number) => {
    const values = { productId, count: newCount };
    SetCookies(values);
  };
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCookie(newCount);
    if (newCount > 0) setErrorMessage("");
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateCookie(newCount);
      if (newCount === 0) setErrorMessage("Please add a count value.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue)) {
      setCount(inputValue);
      updateCookie(inputValue);
      if (inputValue > 0) setErrorMessage("");
      else setErrorMessage("Please add a count value.");
    }
  };

  const handleAddToCartClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (count ===0) {
      e.preventDefault();
      setErrorMessage("Veuillez ajouter une valeur de comptage.");
    }
  };
  const handleAddToCheckoutClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (count <=1) {
      e.preventDefault();
      setErrorMessage("Veuillez ajouter une valeur minimale de 2 comptes");
    }
  };
  const productImage = productData?.product?.img;
  const images = productImage.split(",");

  let categoryid = productData?.product?.categoryId;
  console.log(categoryid);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/category/${categoryid}`, {
        next: { tags: ["product", "category"] },
      });
      if (response.ok) {
        const category = await response.json();
        setCategore(category);
      } else {
        console.error("Failed to fetch category:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [categoryid]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="relative w-[96%] h-[409px] rounded-lg">
        <Carousel showThumbs={true} showStatus={true}>
          {images.map((url: string, index: number) => (
            <div key={index} className="h-[409px]">
              <Image
                src={url}
                className="object-contain rounded-lg"
                fill
                alt={`Product image ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="mt-5">
        <div className=" sm:text-[40px] text-[20px] text-[#0E2222] font-[500]">
          {productData?.product?.title}
        </div>
        <div className="text-[14px] font-[400] mt-3 text-[#475569]">
          {categore?.category?.name}
        </div>
        <div className="text-[25px] font-[700] mt-3 text-[#0E2222]">
          {productData?.product?.price}€
        </div>
        <div className="text-[14px] font-[600] text-[#52525B]">Quantité</div>
        <div className="flex mt-4">
          <Counter
            count={count}
            increment={increment}
            decrement={decrement}
            handleInputChange={handleInputChange}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
        {/* <div className="text-[14px] font-[600] text-[#A1A1AA] mt-3">
          Frais de port: €0.00
        </div> */}
        <div className="flex gap-3 xs:gap-6 mt-8">
          <Link
            onClick={handleAddToCheckoutClick}
            target="_blank"
            href={`/user-formdata?price=${
              productData?.product?.price * count
            }&quantity=${count}&productId=${productId}`}
            className="border flex hover:bg-[#0BA3C8] text-center justify-center items-center gap-2 sm:px-8  px-4 md:px-2 lg:px-4 sm:text-[12px] text-[12px] font-[600] sm:py-2 py-1 md:py-2 lg:py-3 xs:py-2 rounded-full border-[#E4E4E7] text-[#0E2222] "
          >
            Acheter maintenant
          </Link>
          <Link
            href={`/cart?quantity=${count}&productId=${productId}`}
            onClick={handleAddToCartClick}
            className="border flex hover:bg-[#0BA3C8] text-center justify-center items-center gap-2 sm:px-8  px-4 md:px-2 lg:px-4 sm:text-[12px] text-[12px] font-[600] sm:py-2 py-1 md:py-2 lg:py-3 xs:py-2 rounded-full border-[#E4E4E7] text-[#0E2222]"
          >
            <span>Ajouter au panier</span>
            <Image
              className="text-black"
              src="/assets/bukit22.svg"
              alt="fhf"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductImgAndTitle;
