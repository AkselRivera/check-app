import axios from "axios";

type Body = {
  password: string;
  };

export function resetServer(body: Body) {
  try {
    return axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/reset`,
      body
    );
  } catch (error) {
    throw error;
  }
}