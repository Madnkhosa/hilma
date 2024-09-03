"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { useProductContext } from "../ProductContext";
type Category = {
  id: string;
  name: string;
};
const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const { deleteCategory, categories } = useProductContext();

  const toggleAddCategoryModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleEditCategoryModal = () => {
    setIsOpen1(!isOpen1);
  };
  const handleEditClick = (categoryId: string) => {
    setSelectCategory(categoryId);
    toggleEditCategoryModal();
  };

  return (
    <>
      <div className="w-full flex mb-2 justify-end">
        <button
          className="flex justify-end mt-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={toggleAddCategoryModal}
          type="button"
        >
          ajouter une catégorie
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute top-10 blurred-background left-0 
                  right-0 flex items-center justify-center z-50 "
        >
          <div className="bg-white rounded-lg px-8 shadow-2xl  ">
            <AddCategory toggleAddCategoryModal={toggleAddCategoryModal} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="bg-[#F9F9F9]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                Sr. NON
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-[#3F3F46] text-[16px] font-[600]"
              >
                Catégorie
              </th>
              <th
                scope="col"
                className="px-6 py-3 flex justify-center text-[#3F3F46] text-[16px] font-[600]"
              >
                Pro_Edit/Suppr
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category: any, index: any) => (
                <tr key={index} className="bg-white border-b  hover:bg-gray-50">
                  <td className="px-4 py-4 text-[16px] font-[700] text-[#0E0E0E] ">
                    {index + 1}
                  </td>
                  <td className="p-4 gap-2 flex justify-start items-center">
                    <div className="text-[16px] font-[700] text-[#0E0E0E]">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <div
                        onClick={() => handleEditClick(category.id)}
                        className="font-[800] text-[20px] text-blue-600"
                      >
                        <BsPencilSquare />
                      </div>
                      {isOpen1 && (
                        <div className="absolute blurred-background top-10 left-0 right-0 flex shadow-2xl items-center justify-center z-50">
                          <div className="bg-white rounded-lg shadow-2xl px-8">
                            <EditCategory
                              toggleEditCategoryModal={toggleEditCategoryModal}
                              categoryid={selectCategory}
                            />
                          </div>
                        </div>
                      )}
                      <Image
                        onClick={() => deleteCategory(category.id)}
                        src="/assets/removeicon.svg"
                        height={25}
                        width={25}
                        alt="Remove Icon"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
