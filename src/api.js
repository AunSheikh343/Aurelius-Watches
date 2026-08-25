const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/api/products`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Unable to load products.");
  return data.products;
}