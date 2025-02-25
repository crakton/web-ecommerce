import axios from "axios";

const api = axios.create({
	baseURL:
		"https://web-ecommerce-backend-jj6f.onrender.com" ||
		"http://localhost:5000",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;

export const fetchProducts = async () => {
	try {
		const response = await api.get("/products");
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};
