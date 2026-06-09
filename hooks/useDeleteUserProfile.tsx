// ./app/hooks/usedeleteuserprofile/page.tsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserProfile } from "../service/total-healthcare";
import { toast } from "sonner";

type UseDeleteUserProfileProps = {
    token: string;
};

export const useDeleteUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ token: providedToken }: UseDeleteUserProfileProps) => {
            const token =
                providedToken ??
                localStorage.getItem("token") ??
                localStorage.getItem("authToken") ??
                localStorage.getItem("accessToken");

            if (!token) throw new Error("Missing auth token for delete profile");

            return await deleteUserProfile(token);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            toast.success("User profile deleted successfully");
        },

        onError: (error: unknown) => {
            if (error instanceof Error) {
                console.error("Error deleting user profile:", error.message);
                toast.error(error.message || "Failed to delete user profile. Please try again.");
            }
        }
    });
};