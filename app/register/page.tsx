"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../service/total-healthcare";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [practiceName, setPracticeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
  const signupMutation = useMutation({
    mutationFn: async () => {
      return await signupUser({
        practiceName,
        emailAdress: email,
        phoneNumber: phone,
        password,
      });
    },
    onSuccess: () => {
      toast.success("Account created! Please check your email for the confirmation code.");
      router.push("/confirm-password");
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <div
      className="h-screen overflow-y-auto w-full flex items-center justify-center px-4 py-6"
      style={{ backgroundColor: "#EAECF1" }}
    >
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: "#1A1A2E" }}>
              Create an account
            </h1>
            <p className="text-xl lg:text-2xl font-semibold mt-3 max-w-xs lg:max-w-sm leading-snug" style={{ color: "#A2B8F2" }}>
              Provide some basic information to get started.
            </p>
          </div>
        </div>

        {/* RIGHT — Sign up card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#EEF2FF" }}>
              <KeyRound size={18} style={{ color: "#3B5BDB" }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">Sign up</h2>
              <p className="text-xs text-gray-400 mt-0.5">Setup your practice</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="practiceName" className="text-xs font-medium text-gray-500">Practice name</label>
              <input
                id="practiceName"
                type="text"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                placeholder="St Luke's Hospital"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/20"
              />
            </div>

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
              <label htmlFor="phone" className="text-xs font-medium text-gray-500">Phone number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
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
              disabled={signupMutation.isPending}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#3B5BDB" }}
            >
              {signupMutation.isPending ? "Creating account..." : "Continue"}
            </button>
          </form>

          <div className="text-center">
            <span className="text-xs text-gray-400">Already have an account? </span>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-xs font-medium transition-colors hover:underline"
              style={{ color: "#3B5BDB" }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
