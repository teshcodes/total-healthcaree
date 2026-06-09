"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push("/confirm-page");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen overflow-y-auto w-full flex items-center justify-center bg-white">
      <div className="flex items-center gap-4">

        {/* App icon */}
        <Image
          src="/app-icon.png"
          alt="Total HealthCare Logo"
          width={72}
          height={72}
          className="rounded-2xl"
        />

        {/* App name */}
        <div className="flex flex-col leading-tight">
          <span
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: "#071232" }}
          >
            Total
          </span>
          <span
            className="text-3xl font-serif font-semibold tracking-tight"
            style={{ color: "#000000", opacity: 0.75 }}
          >
            HealthCare
          </span>
        </div>
      </div>
    </div>
  );
}
