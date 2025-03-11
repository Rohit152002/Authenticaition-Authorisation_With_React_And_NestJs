import { Products } from "../interface/Product";
import instance from "./axiosSetup";

export async function getAllProducts() {
  return await instance.get("/products");
}

export async function createProduct(body: Products) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value);
  }
  return await instance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteProduct(id: number) {
  return await instance.delete(`/products/${id}`);
}

export async function editProduct(id: number, body: Partial<Products>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (value != null) formData.append(key, value);
  }
  return await instance.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getProductById(id: number) {
  return await instance.get(`/products/${id}`);
}
