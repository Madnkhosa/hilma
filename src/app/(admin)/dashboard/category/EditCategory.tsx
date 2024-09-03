"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProductContext } from "../ProductContext";
import Button from "@/components/ToggleCrossButton";

type Inputs = {
  name: string;
};

type Category = {
  name: string;
};

const EditCategory = ({
  toggleEditCategoryModal,
  categoryid,
}: {
  toggleEditCategoryModal: () => void;
  categoryid: string;
}) => {
 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [categore, setCategore] = useState<Category | null>(null);
  const { loading, startLoading, stopLoading } = useProductContext();

 
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/category/${categoryid}`,{
          next: { tags: ["product","category"] },
        });
        if (response.ok) {
          const category = await response.json();
          setCategore(category.category);
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

  const handleFormSubmit = async (formData: Inputs) => {
    startLoading();
    try {
      const response = await fetch(`/api/category/${categoryid}`, {
        next: { tags: ["product","category"] },
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toggleEditCategoryModal();
        stopLoading();
        window.location.reload()
        router.push("/dashboard/category");
      } else {
        console.error("Failed to update category:", response.statusText);
      }
    } catch (error) {
      alert(`Error ${error}`)
    }
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div className="flex gap-4">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          Modifier la catégorie
          </h2>
          <Button onClick={toggleEditCategoryModal} />
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
              Modifier la catégorie
              </label>
              <input
                defaultValue={categore?.name}
                {...register("name", {
                  required: "Category name is required",
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Type category name"
              />
              <p className="text-red-500 text-sm mt-2">
                {errors.name?.message}
              </p>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            <span role="status">
              {loading ? "Loading..." : "  Edit category"}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
