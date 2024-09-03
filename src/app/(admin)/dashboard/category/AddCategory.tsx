"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProductContext } from "../ProductContext";
import Button from "@/components/ToggleCrossButton";

type Inputs = {
  name: string;
};
const AddCategory = ({
  toggleAddCategoryModal,
}: {
  toggleAddCategoryModal: () => void;
}) => {
  const { loading, startLoading, stopLoading } = useProductContext();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const handleFormSubmit = async (formData: Inputs) => {
    startLoading();
    try {
      const response = await fetch(`/api/category`, {
        next: { tags: ["product","category"] },
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       window.location.reload()
        toggleAddCategoryModal();
        stopLoading();
      }
    } catch (error) {
      alert(`Error ${error}`)
    }
  };
  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div className="flex gap-4">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Add a new categry
          </h2>

          <Button onClick={toggleAddCategoryModal} />
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Add Category
              </label>
              <input
                {...register("name", { required: "title required" })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Type category name"
              />
              <p>{errors.name?.message}</p>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 "
          >
            <span role="status">
              {loading ? "Loading..." : " Add category"}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddCategory;
