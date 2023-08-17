import axios from "axios";

export function deleteProduct(productID: string) {
  try {
    return axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/${productID}`
    );
  } catch (error) {
    throw error;
  }
}
