import axios from "axios";

type ProductBody = {
  name: string;
  quantity: number;
  unitPrice: number;
  family_id: string;
  total: number;
};

export function postProduct(newProduct: ProductBody) {
  try {
    return axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`,
      newProduct
    );
  } catch (error) {
    throw error;
  }
}
