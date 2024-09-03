"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type DropDownProps = {
  data: string[];
  // showDropDown: boolean;
  toggleDropDown: Function;
  dataSelection: Function;
};

const DropDowns: React.FC<DropDownProps> = ({
  data,
  dataSelection,
  toggleDropDown,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onClickHandler = (city: string): void => {
    dataSelection(city);
    toggleDropDown();
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div
        className={
          showDropDown
            ? "absolute top-38 z-50 left-0 border border-black bg-white p-0 text-black  rounded-md w-max"
            : "absolute z-50 top-38 left-0 border border-black bg-white p-5 text-black  rounded-md active w-max"
        }
      >
        {data.map((city: string, index: number): JSX.Element => {
          return (
            <Link
              href={`/products?sort=${city}`}
              className="hover:bg-blue-300 p-2 flex justify-center items-center text-center border-b text-black border-gray-300 min-w-140"
              key={index}
              onClick={(): void => {
                onClickHandler(city);
              }}
            >
              {city}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DropDowns;
