import axios from "axios";

type FamilyBody = {
 name: string;
 }

export function postFamily(newFamily:FamilyBody){
   
    return axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/v1/family`,  newFamily
)
}