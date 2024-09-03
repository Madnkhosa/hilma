"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductContext } from "../../ProductContext";
import Image from "next/image";

type Products = {
  title: string;
  usg: string;
  price: string;
  img: FileList;
  description: string;
  categoryId: string;
  costPrice: string;
};

const Edit = ({
  categoryData,
  pro,
  productId,
}: {
  productId: string;
  categoryData: any;
  pro: any;
}) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const { loading, startLoading, stopLoading } = useProductContext();
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  const router = useRouter();
 
  useEffect(() => {
    const productImages = pro.product?.img;
    if (productImages) {
      setExistingImages(productImages.split(','));
    }
  }, [pro.product?.img]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Products>();
console.log("first",pro.product?.categoryId)
  const handleFormSubmit = async (formData: Products) => {
    startLoading();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("usg", formData.usg);
    data.append("price", formData.price);
    data.append("costPrice", formData.costPrice);
    data.append("description", formData.description);
    data.append("categoryId", formData.categoryId);
    console.log("category id",formData.categoryId)
   
    if (uploadFiles.length === 0) {
      existingImages.forEach((img, index) => {
        data.append(`img${index + 1}`, img);
      });
    } else {
      uploadFiles.forEach((file, index) => {
        data.append(`img${index + 1}`, file);
      });
    }
    try {
      const response = await fetch(`/api/product/${productId}`, {
       
        method: "PUT",
        body: data,
      });
      
      if (response.ok) {
        toast.success("Product successfully updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
        setSubmitMessage("Product updated successfully.");
        setTimeout(() => {
          stopLoading();
          router.push("/dashboard")
          router.refresh()
        }, 3000);
       
      } else {
        console.log(errors)
        const errorData = await response.json();
        console.error("Update product error:", errorData);
        setSubmitMessage("Failed to update product.");
        stopLoading();
      }
    } catch (error) {
      alert(`Error ${error}`);
      setSubmitMessage("An error occurred. Please try again.");
      stopLoading();
    }
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
  const productImages=pro.product?.img
  const images = productImages.split(',');
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div className="flex">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Modifier le produit
          </h2>
          <ToastContainer />
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-center mb-2">
                {images.length > 0 && (
                  <div className="flex justify-center flex-wrap gap-2">
                    {images.map((file:any, index:number) => (
                      <div key={index} className="relative border rounded-lg flex h-32  w-32">
                        <Image
                          src={file}
                          fill
                          alt={`Preview ${index}`}
                          className="rounded-lg object-cover "
                        />
                      </div>
                    ))}
                  </div>
                )}
              
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Télécharger des images
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                multiple  
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
              {uploadFiles.length === 0 && (
                <p className="text-red-500 text-sm">At least one image required</p>
              )}
              <div className="mt-4">
                {uploadFiles.length > 0 && (
                  <div className="flex border border-gray-900 justify-center flex-wrap gap-2">
                    {uploadFiles.map((file, index) => (
                      <div key={index} className="relative border flex h-32  w-32">
                        <Image
                          src={URL.createObjectURL(file)}
                          fill
                          alt={`Preview ${index}`}
                          className="rounded-lg object-cover "
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Cost Prix
              </label>
              <input
                {...register("costPrice", { required: "Cost price is required" })}
                type="number"
                step="0.01"
                defaultValue={pro.product?.costPrice}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="€2999"
              />
              {errors.costPrice && (
                <p className="text-red-500 text-sm">{errors.costPrice.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Prix
              </label>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                step="0.01"
                defaultValue={pro.product?.price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="€2999"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                UGS
              </label>
              <input
                {...register("usg", { required: "UGS is required" })}
                type="text"
                defaultValue={pro.product?.usg}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type Product UGS number"
              />
              {errors.usg && (
                <p className="text-red-500 text-sm">{errors.usg.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Catégorie
              </label>
              <select
                {...register("categoryId", {
                  required: "Category is required",
                })}
                defaultValue={pro.product?.categoryId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="">Select category</option>
                {categoryData.category.map((category: any, index: any) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Titre du produit
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                defaultValue={pro.product?.title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={pro.product?.description}
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your description here"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update product"}
          </button>
          {submitMessage && <p className="mt-2 text-sm">{submitMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default Edit;

