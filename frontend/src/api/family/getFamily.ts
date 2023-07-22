import axios from "axios";

export async function getFamilies() {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/families`
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
}
