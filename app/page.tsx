"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../service/total-healthcare";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
  const loginMutation = useMutation({
    mutationFn: async (credentials: { emailAdress: string; password: string }) => {
      try {
        const data = await loginUser(credentials);
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      router.push("/confirm-page");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ emailAdress: email, password });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: "#EAECF1" }}
    >
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: "#1A1A2E" }}>
              Welcome
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold mt-2" style={{ color: "#A2B8F2" }}>
              Login to your account
            </p>
          </div>
          <button
            onClick={() => router.push("/register")}
            className="mt-2 px-8 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#3B5BDB" }}
          >
            New here? Setup your practice
          </button>
        </div>

        {/* RIGHT — Login card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#EEF2FF" }}>
              <KeyRound size={18} style={{ color: "#3B5BDB" }} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Login</h2>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-medium text-gray-500">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@stlukes.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xs font-medium text-gray-500">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#3B5BDB" }}
            >
              {loginMutation.isPending ? "Logging in..." : "Continue"}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: "#3B5BDB" }}
            >
              forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
