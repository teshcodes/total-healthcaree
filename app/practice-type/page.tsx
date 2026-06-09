"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";

export default function PracticeTypePage() {
  const router = useRouter();
  const [practiceType, setPracticeType] = useState("Hospital");

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/splash");
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
              Complete signup
            </h1>
            <p
              className="text-xl lg:text-2xl font-semibold mt-3 max-w-xs lg:max-w-sm leading-snug"
              style={{ color: "#A2B8F2" }}
            >
              Select your type of practice to complete your registration
            </p>
          </div>
        </div>

        {/* ── RIGHT — Card ── */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">

          {/* Card header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              <LayoutGrid size={18} style={{ color: "#3B5BDB" }} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Select your practice type
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleConfirm} className="flex flex-col gap-5">

            {/* Dropdown */}
            <div className="relative">
              <select
                value={practiceType}
                onChange={(e) => setPracticeType(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none bg-white transition-all duration-200 focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/20 cursor-pointer"
              >
                <option value="Hospital">Hospital</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
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
        </div>
      </div>
    </div>
  );
}
