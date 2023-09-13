import axios from "axios";
import { App_MESSAGES } from "../../constants/Messages";

export function deleteFamily(familyID: string) {
  try {
    return axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/family/${familyID}`
    );
  } catch (error) {
    throw App_MESSAGES.DEFAULT.DISCONNECTED;
  }
}
