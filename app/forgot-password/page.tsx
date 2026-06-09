"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { useForgotPassword } from "../../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { mutate: sendReset, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendReset(
      { emailAdress: email },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
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
              Forgot password?
            </h1>
            <p className="text-xl lg:text-2xl font-semibold mt-3 max-w-xs lg:max-w-sm leading-snug" style={{ color: "#A2B8F2" }}>
              Enter your email and We&apos;ll send you a reset link.
            </p>
          </div>
        </div>

        {/* RIGHT — Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#EEF2FF" }}>
              <KeyRound size={18} style={{ color: "#3B5BDB" }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">Reset password</h2>
              <p className="text-xs text-gray-400 mt-0.5">We&apos;ll email you a reset link</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#3B5BDB" }}
            >
              {isPending ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: "#3B5BDB" }}
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
