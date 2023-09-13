import axios from "axios";
import { App_MESSAGES } from "../../constants/Messages";

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
    throw App_MESSAGES.DEFAULT.DISCONNECTED;
  }
}