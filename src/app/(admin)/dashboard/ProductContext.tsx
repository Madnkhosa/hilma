"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Product = {
  id: string;
  title: string;
  img: string;
  description: string;
  price: number;
  usg: string;
  categoryId: string;
};
type Category = {
  id: string;
  name: string;
};

interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  fetchAllCategories: () => void;

  deleteProduct: (productId: string) => void;
  startLoading: () => void;
  stopLoading: () => void;
  getCategoryName: (categoryId: string) => string;
  setCategories: (categories: Category[]) => void;
  deleteCategory: (categoryId: string) => void;
  createProduct: (formData: FormData, successCallback: () => void) => void;
  updateProduct: (
    productId: string,
    formData: FormData,
    successCallback: () => void
  ) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(`/api/category`,
        {
          next: { tags: ["product","category"] },
        }
      );

      const categoryData = await response.json();
      setCategories(categoryData.category);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const deleteProduct = async (productId: string) => {
    try {
      await fetch(`/api/product/${productId}`, {
        method: "DELETE",
        next: { tags: ["product"] }
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await fetch(`/api/category/${categoryId}`, {
        method: "DELETE",
        next: { tags: ["product","category"] }
      });
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
      window.alert("Category deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const createProduct = async (
    formData: FormData,
    successCallback: () => void
  ) => {
    startLoading();
    try {
      const response = await fetch(`/api/product`, {
        method: "POST",
        body: formData,
        next: { tags: ["product"] }
        
      });
      if (response.ok) {
        toast.success("Product successfully created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        successCallback();
      }
    } catch (error) {
      console.error("Create product error:", error);
    } finally {
      stopLoading();
    }
  };

  const updateProduct = async (
    productId: string,
    formData: FormData,
    successCallback: () => void
  ) => {
    startLoading();
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: "PUT",
        body: formData,
        next: { tags: ["product"] },
      });
      if (response.ok) {
        toast.success("Product successfully updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        successCallback();
      }
    } catch (error) {
      console.error("Update product error:", error);
    } finally {
      stopLoading();
    }
  };
  useMemo(() => {
    fetchAllCategories();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        deleteCategory,
        products,
        categories,
        loading,
        fetchAllCategories,
        setCategories,
        getCategoryName,
        deleteProduct,
        startLoading,
        stopLoading,
        createProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
