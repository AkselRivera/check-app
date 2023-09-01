import axios from "axios";
import { FamilyResponse } from "../../types/types";

export interface IFamily {
  id: string;
  name: string;
  productsCount: number;
  total: number;
}

export class Family implements IFamily {
  id: string;
  name: string;
  productsCount: number;
  total: number;

  constructor({ id, name, productsCount, total }: IFamily) {
    this.id = id;
    this.name = name;
    this.productsCount = productsCount;
    this.total = total;
  }

}

export async function getFamilies(): Promise<Family[] | null>{
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/family`
    );

    const Families: Family[] = resp.data.map((fam: FamilyResponse) => 
      new Family({
        id: fam.id,
        name: fam.name,
        productsCount: fam.products_count ?? 0,
        total: fam.total ?? 0
      }) 
      )

    return Families;
  } catch (error) {
    return null;
  }
}
