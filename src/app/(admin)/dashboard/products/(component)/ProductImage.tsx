"use client";
import React from "react";
import Image from "next/image";
import { RemoveCookieByProductId } from "@/app/(server)/action/RemoveCookies"; 
interface ProductImageProps {
  productId: string;
}

const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/product/${productId}`, {
      method: "DELETE",
      next: { tags: ["product"] },
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

const ProductImage: React.FC<ProductImageProps> = ({ productId }) => {
  const handleDelete = async () => {
    const success = await deleteProduct(productId);
    RemoveCookieByProductId(productId);
    if (success) {
      alert("Product deleted successfully.");
      window.location.reload();
    } else {
      alert("Failed to delete product. Please try again.");
    }
  };
 
  return (
    <Image 
   
      src="/assets/removeicon.svg"
      height={25}
      width={25}
      alt="Remove Icon"
      onClick={handleDelete}
      style={{ cursor: "pointer" }}
    />
  );
};

export default ProductImage;
