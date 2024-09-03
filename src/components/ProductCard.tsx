"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageZoom from "./ImageZoom";

const ProductCard = ({
  product_id,
  discount,
  product_url,
  product_name,
  product_discrpt,
  actual_pr,
  discount_pr,
}: {
  product_id: string;
  discount: number;
  product_url: string;
  product_name: string;
  product_discrpt: string;
  actual_pr: number;
  discount_pr: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const images = product_url.split(',');
  return (
    <div className=" bg-[#FFFF] rounded-lg mt-7 shadow-xl p-4">
      <div className=" flex justify-end">
        <div className="bg-[#D6F7FF] z-40 h-[39px] w-[39px] flex justify-center items-center rounded-full">
          <Image
            src="/assets/hearticon.svg"
            alt="icon"
            height={25}
            width={25}
          />
        </div>
      </div>
      <div className="relative w-[96%] mt-[-16px] h-[226px] rounded-lg ">
      <Carousel showThumbs={true} showStatus={true}>
          {images.map((url, index) => (
            <div key={index} className="h-[226px]">
           
           <ImageZoom imageUrl={url}>
            {/* <Image
              src={url}
              className="object-cover rounded-lg"
              fill
              alt={`Product image ${index + 1}`}
            /> */}
          </ImageZoom>
            </div>
          ))}
        </Carousel>
      </div>
      {/* <div className="text-[#0BA3C8] relative mt-[-32px] z-30  w-[100px] flex justify-center items-center bg-[#FFFFFF] py-2 rounded-full">
        {discount}% Off
      </div> */}
      <div
        onClick={toggleExpand}
        style={{ cursor: "pointer", whiteSpace: "pre-wrap" }}
        className={
          isExpanded
            ? "text-[20px] mt-2 font-[600] text-[#000000]"
            : " line-clam text-[20px] mt-2 font-[600] text-[#000000]"
        }
      >
        {product_name}
      </div>
      <div
        onClick={toggleExpand}
        style={{ cursor: "pointer", whiteSpace: "pre-wrap" }}
        className={isExpanded ? "" : "line-clamp"}
      >
        {product_discrpt}
      </div>
      {/* <div className=""><HoverRating /></div> */}
      <div className="flex gap-3 justify-between items-center my-3 ">
        <div>
          <div className="text-[18px] font-[600]  text-[#0BA3C8]">
           {actual_pr.toFixed(2)}€
          </div>
        </div>
        <Link
          href={`/product-detail/${product_id}`}
          className="bg-[#0BA3C8] textsize w-full text-center rounded-full gap-2  flex justify-center items-center text-[12px] font-[700] text-[#ffff] px-4 py-2"
        >
          <Image src="/assets/buckit.svg" height={20} width={20} alt="djf" />
          <div>Achetez maintenant</div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
