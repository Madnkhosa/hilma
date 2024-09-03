// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";

// type Inputs = {
//   name: string;
//   email: string;
//   password: string;
// };

const Signup = () => {
  redirect("/login")

  // const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  // const [loading, setLoading] = useState(false);
  // const router = useRouter();

  // const onSubmit = async (data: Inputs) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch('api/auth/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await res.json();
  //     setLoading(false);

  //     if (res.ok) {
  //       toast.success("Registered successfully!");
  //       router.push('/login');
  //     } else {
  //       toast.error(result.message || 'Registration failed');
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Something went wrong");
  //   }
  // };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gray-100">
//       <ToastContainer />
//       <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter your name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
};

export default Signup;
