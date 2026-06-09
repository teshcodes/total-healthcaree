"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";

export default function ConfirmPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/practice-type");
    };

  const handleResend = () => {
    // resend confirmation code
    alert("Confirmation code resent!");
  };

  return (
    <div
      className="h-screen overflow-y-auto w-full flex items-center justify-center px-4 py-6"
      style={{ backgroundColor: "#EAECF1" }}
    >
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* ── LEFT — Text ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <div>
            <h1
              className="text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ color: "#1A1A2E" }}
            >
              Confirm your account
            </h1>
            <p
              className="text-xl lg:text-2xl font-semibold mt-3 max-w-xs lg:max-w-sm leading-snug"
              style={{ color: "#A2B8F2" }}
            >
              Enter the confirmation code sent to your email address.
            </p>
          </div>
        </div>

        {/* ── RIGHT — Confirmation card ── */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">

          {/* Card header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              <MailCheck size={18} style={{ color: "#3B5BDB" }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                Confirm your email
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Enter your confirmation code
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleConfirm} className="flex flex-col gap-5">

            {/* Code input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="code"
                className="text-xs font-medium text-gray-500"
              >
                Enter confirmation code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="22546739"
                maxLength={8}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none tracking-widest transition-all duration-200 focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/20"
              />
            </div>

            {/* Confirm button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#3B5BDB" }}
            >
              Confirm
            </button>
          </form>

          {/* Resend code */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: "#3B5BDB" }}
            >
              Resend confirmation code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
