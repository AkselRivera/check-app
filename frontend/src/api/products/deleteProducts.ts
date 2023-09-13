import axios from "axios";
import { App_MESSAGES } from "../../constants/Messages";

export function deleteProduct(productID: string) {
  try {
    return axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/${productID}`
    );
  } catch (error) {
    throw App_MESSAGES.DEFAULT.DISCONNECTED;

  }
}
