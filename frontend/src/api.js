const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

// API Call Function
const apiCall = async (endpoint, data = null, method = "POST", token = null) => {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (data) options.body = JSON.stringify(data);
        if (token) options.headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${API_URL}/${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Something went wrong");
        return result;
    } catch (error) {
        console.error("❌ API Error:", error);
        throw error;
    }
};

// 🔹 Register API Call
export const registerUser = async (username, email, password) => {
    return apiCall("register", { username, email, password });
};

// 🔐 Login API Call
export const loginUser = async (email, password) => {
    return apiCall("login", { email, password });
};

// 🔒 Fetch User Data (Authenticated)
export const getUserData = async (token) => {
    return apiCall("user", null, "GET", token);
};

