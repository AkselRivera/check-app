import axios from "axios";

export async function getProducts() {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
}
