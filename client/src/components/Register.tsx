"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ✅ Schema for register
const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    const loadingToast = toast.loading("Logging in...");
  
    try {
      const res = await fetch(`${apiUrl}/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // IMPORTANT for cookies
        body: JSON.stringify({ 
          FullName: data.fullName,
          Email: data.email,
          Password: data.password, }),
      });
  
      if (res.ok) {
        toast.success("Account created successfully!", { id: loadingToast });
        router.push("/login");
      } else {
        const err = await res.json();
        toast.error(`Registration failed: ${err.message}`, { id: loadingToast });
      }
    } catch (err) {
      console.error("❌ Login error", err);
      toast.error("Login error, check network or server", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 space-y-6">
        <h2 className="text-center text-2xl font-semibold">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="fullName" className="pb-2">Full Name</Label>
            <Input id="fullName" placeholder="Enter your name" {...register("fullName")} />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="pb-2">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="pb-2">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full">Register</Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
