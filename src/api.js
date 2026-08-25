import { products as localProducts } from "./data/products";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Unable to load products.");
    return data.products;
  } catch {
    return localProducts;
  }
}