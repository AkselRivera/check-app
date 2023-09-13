import axios from "axios";
import { App_MESSAGES } from "../../constants/Messages";

type FamilyBody = {
 name: string;
 }

export function postFamily(newFamily:FamilyBody){
   try {
    
       return axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/v1/family`,  newFamily)
   } catch (error) {
    throw App_MESSAGES.DEFAULT.DISCONNECTED;
    
   }

}