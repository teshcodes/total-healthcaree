// ./hooks/usegetusers/page.tsx

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../service/total-healthcare/page";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";


export const useGetUsers = () => {

    const query = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found");
            }

            return getUsers(token);
        },
    });
 
    useEffect(() => {
        if (query.error) {
            if (query.error instanceof AxiosError) {
                toast.error(
                    query.error.response?.data?.message ||
                    "Failed to fetch users. Please try again."
                );
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }, [query.error]);

    return query;
};