"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../app/service/total-healthcare/page";
import { toast } from "sonner";
import { AxiosError } from "axios";

type UseForgotPasswordProps = {
    emailAdress: string;
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async ({ emailAdress }: UseForgotPasswordProps) => {
            return await forgotPassword({ emailAdress });
        },

        onSuccess: () => {
            toast.success("Password reset email sent successfully. Please check your inbox.");
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Failed to send password reset email. Please try again.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    });
};