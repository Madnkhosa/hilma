"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { SetLoginCookies } from "@/app/(server)/action/SetLoginCookies";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState("");
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_LOGIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_LOGIN_PASS;

  const onSubmit = (data: Inputs) => {
    const email = data.email;
    const password = data.password;

    if (email !== adminEmail) {
      return setError("Invaild Email");
    }
    if (password !== adminPassword) {
      return setError("Invaild Password");
    }

    if (email === adminEmail && password === adminPassword) {
      SetLoginCookies({ email, password });
      router.push("/dashboard/products");
    }
  };

  // const onSubmit = async (data: Inputs) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await res.json();
  //     setLoading(false);

  //     if (res.ok) {
  //       toast.success("Logged in successfully!");
  //       router.push('/');
  //     } else {
  //       toast.error(result.message || 'Login failed');
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="mt-1 p-2 w-full border rounded-md text-black"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="mt-1 p-2 w-full border rounded-md text-black"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-base flex justify-center items-center py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            // disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
