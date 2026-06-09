// ./service/total-healthcare/page.tsx

import axios from "axios"

// Axios instance
export const axiosInstance = axios.create({
    baseURL: "https://total-health-server.vercel.app/api/v1",
});

// ==============Authentication===============

// App info function
export const getAppInfo = async () => {
    const { data } = await axiosInstance.get("/info");
    return data;
};

// Live status function
export const getLiveStatus = async () => {
    const { data } = await axiosInstance.get("/health");
    return data;
};

// Me function
export const getMe = async (token: string) => {
    const { data } = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Signup function
export const signupUser = async (userData: {
    practiceName: string;
    emailAdress: string;
    phoneNumber: string;
    password: string;
}) => {
    const payload = {
        practiceName: userData.practiceName,
        email: userData.emailAdress,
        phoneNumber: userData.phoneNumber,
        password: userData.password
    };
    const { data } = await axiosInstance.post("/auth/register", payload);
    return data;
}

// Login function
export const loginUser = async (credentials: {
    emailAdress: string;
    password: string;
}) => {
    const payload = {
        email: credentials.emailAdress,
        password: credentials.password
    };
    const { data } = await axiosInstance.post("/auth/login", payload);
    return data;
}

// Forgot password function
export const forgotPassword = async (credentials: {
    emailAdress: string;
}) => {
    const { data } = await axiosInstance.post("/auth/forgot-password", credentials);
    return data;
};

// =============User profile function========================

// Users info function
export const getUsers = async (token: string) => {
    const { data } = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Get a user profile function
export const getUserProfile = async (token: string) => {
    const { data } = await axiosInstance.get("/users/6a2671f1fc6a308592fb5e28", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Update user profile function
export const updateUserProfile = async (
    token: string,
    userData: {
        name?: string;
    }
) => {
    const { data } = await axiosInstance.put("/users/6a2671f1fc6a308592fb5e28", userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Delete user profile function
export const deleteUserProfile = async (token: string) => {
    try {
        const { data } = await axiosInstance.delete("/users/6a2671c1fc6a308592fb5e27", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error deleting user profile:`, error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
        throw error;
    }
};