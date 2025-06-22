"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

// ✅ Schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const { login } = useAuth(); // context function to store user info
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });


  
  const onSubmit = async (data: LoginForm) => {
    const loadingToast = toast.loading("Logging in...");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // For cookies/session
        body: JSON.stringify({
          Email: data.email,
          Password: data.password,
        }),
      });
    
      const response = await res.json();
    
      if (res.ok && response.success && response.data) {
        login(response.data); // context update
        toast.success(`Welcome ${response.data.fullName}!`, { id: loadingToast });
        router.push("/");
      } else if (res.status === 401 || !response.success) {
        toast.error("Invalid email or password", { id: loadingToast });
      } else {
        toast.error(`Login failed: ${response.message || "Unexpected error"}`, { id: loadingToast });
      }
    
    } catch (err) {
      console.error("❌ Login error", err);
      toast.error("Login error, check your network or server.", { id: loadingToast });
    }
    
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 space-y-6">
        <h2 className="text-center text-2xl font-semibold">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email" className="mb-2">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
