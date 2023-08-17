import axios from "axios";

type ProductBody = {
  name: string;
  quantity: number;
  unitPrice: number;
  family_id: string;
  total: number;
};

export function patchProduct(newProduct: ProductBody, id: string) {
  try {
    return axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/${id}`,
      newProduct
    );
  } catch (error) {
    throw error;
  }
}
