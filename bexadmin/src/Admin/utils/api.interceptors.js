import { API_URL } from "../../Config/api.jsx";

export const apiRequest = async ( endpoint, options = {} ) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
        }
    );

    // Auto Logout
    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return;
    }

    return response.json();
};

export const apiRequestWithRequest = async ( endpoint, options = {} ) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
        }
    );

    // Auto Logout
    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return;
    }

    return response.json();
};