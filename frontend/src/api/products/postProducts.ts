import axios from "axios";

type ProductBody = {
 name: string;
 quantity: number;
 unitPrice: number;
 family_id: string;
 total: number;
}

export function postProduct(newProduct:ProductBody){
   
    return axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`,  newProduct
)
}