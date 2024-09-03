"use client";
import React, { useState } from "react";
import DropDowns from "./DropDowns";
import Image from "next/image";
interface MenusProps {
  data: string[];
  title: string;
}

const Menus: React.FC<MenusProps> = ({ data, title }): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<string>("");

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    // if (event.currentTarget === event.target) {
    //   setShowDropDown(false);
    // }
  };

  const dataSelection = (city: string): void => {
    setSelectData(city);
  };

  return (
    <>
      <button
        className={`relative text-black ${showDropDown ? "active" : ""}`}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>
          {selectData ? (
            <div className="flex w-full gap-3 px-5 py-3 bg-[#F4F4F5] rounded-full">
              <span>{selectData} </span>
              <Image
                width={15}
                height={15}
                alt="img"
                src="/assets/downarrow.svg"
              />
            </div>
          ) : (
            <div className="flex gap-3 px-5 py-3 bg-[#F4F4F5] rounded-full">
              <span>{title} </span>
              <Image
                width={15}
                height={15}
                alt="img"
                src="/assets/downarrow.svg"
              />
            </div>
          )}
        </div>
        {showDropDown && (
          <DropDowns
            data={data}
            toggleDropDown={toggleDropDown}
            dataSelection={dataSelection}
          />
        )}
      </button>
    </>
  );
};

export default Menus;
