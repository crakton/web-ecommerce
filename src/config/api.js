import axios from "axios";

const api = axios.create({
	baseURL:"https://web-ecommerce-backend-jj6f.onrender.com",
		
	headers: {
		"Content-Type": "application/json; charset=utf-8",
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
