"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductContext } from "../../ProductContext";
import Button from "@/components/ToggleCrossButton";
import { useRouter } from "next/navigation";

type Inputs = {
  title: string;
  usg: string;
  price: string;
  costPrice: string;
  img: FileList;
  description: string;
};

const Create = ({ toggleCreateModal }: any) => {
  const { loading, categories, startLoading, stopLoading, createProduct } = useProductContext();
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  const handleFormSubmit = async (formData: Inputs) => {
    if (!selectedCategoryId) {
      setCategoryError(true);
      return; 
    }
    setCategoryError(false);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("usg", formData.usg);
    data.append("price", formData.price);
    data.append("costPrice", formData.costPrice);
    data.append("description", formData.description);
    data.append("categoryId", selectedCategoryId);

    uploadFiles.forEach((file, index) => {
      data.append(`img${index + 1}`, file);
    });

    createProduct(data, () => {
     
      setTimeout(() => {
        stopLoading();
        router.push("/dashboard")
        router.refresh()
      }, 3000);
   
    });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(event.target.value);
    setCategoryError(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 2) {
        alert("You can only upload a maximum of 2 files.");
        return; 
      }
        setUploadFiles(files);
    }
  };

  return (
    <section className="bg-white ">
      <ToastContainer />
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div className="flex">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Ajouter un nouveau produit
          </h2>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Titre du produit
              </label>
              <input
                {...register("title", { required: "Title required" })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title?.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-black">
                Cost Prix
              </label>
              <input
                step="0.01"
                type="number"
                {...register("costPrice", { required: "Cost price required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="€2999"
              />
              {errors.costPrice && (
                <p className="text-red-500 text-sm">{errors.costPrice?.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-black">
                Prix
              </label>
              <input
                step="0.01"
                type="number"
                {...register("price", { required: "Price required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="€2999"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price?.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                UGS
              </label>
              <input
                type="text"
                {...register("usg", { required: "UGS required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type Product UGS number"
              />
              {errors.usg && (
                <p className="text-red-500 text-sm">{errors.usg?.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Catégorie
              </label>
              <select
                onChange={handleCategoryChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="">Choisir une catégorie</option>
                {categories && categories.map((categors: any, index: any) => (
                  <option key={index} value={categors.id}>
                    {categors.name}
                  </option>
                ))}
              </select>
              {categoryError && (
                <p className="text-red-500 text-sm">Catégorie requise</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Télécharger des images
              </label>
              <input
                accept=".png, .svg, .jpeg, .jpg"
                type="file"
                multiple
                onChange={handleFileChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
              {uploadFiles.length === 0 && (
                <p className="text-red-500 text-sm">At least one image required</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your description here"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description?.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200"
            disabled={loading}
          >
            <span role="status">
              {loading ? "Loading..." : "Create Product"}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Create;
