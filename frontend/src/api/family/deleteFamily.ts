import axios from "axios";

export function deleteFamily(familyID: string) {
  try {
    return axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/family/${familyID}`
    );
  } catch (error) {
    throw error;
  }
}
