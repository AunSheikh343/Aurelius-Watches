import { products as localProducts } from "./data/products";

export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

export async function readApiResponse(response, fallbackMessage) {
  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(response.ok ? fallbackMessage : "The server returned an invalid response.");
  }

  if (!response.ok) throw new Error(data.message || fallbackMessage);
  return data;
}

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    const data = await readApiResponse(response, "Unable to load products.");
    return data.products;
  } catch {
    return localProducts;
  }
}