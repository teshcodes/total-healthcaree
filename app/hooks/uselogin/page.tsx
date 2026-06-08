// ./hooks/uselogin/page.tsx

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../service/total-healthcare/page";
import { toast } from "sonner";
import { AxiosError } from "axios";

 
export const useLogin = () => {
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
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });  

    return loginMutation;  
}; 