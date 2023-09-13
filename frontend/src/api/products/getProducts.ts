import axios from "axios";
import { ProductResponse } from "../../types/types";
import { IFamily } from "../family/getFamily";
import { App_MESSAGES } from "../../constants/Messages";

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  familyId: string;
  total: number;
  family?: IFamily
}

export class Product implements IProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  familyId: string;
  total: number;
  family?: IFamily

  constructor({ id, name, quantity, unitPrice, familyId, total, family }: IProduct) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.familyId = familyId;
    this.total = total;
    this.family = family

  }

  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      familyId: this.familyId,
      total: this.total,
      family: this.family,
    };
  }
}

export async function getProducts(): Promise<Product[] | []> {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`
    );

      const products: Product[] = resp.data?.map(
        (product: ProductResponse) =>
        new Product({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
          familyId: product.family_id,
          total: product.total,
          family: product.family
        })
        ) ?? [];

        return products;

  } catch (error) {
    
    throw App_MESSAGES.DEFAULT.DISCONNECTED;
  }
}

export async function getProductsByFamily(family_id:string | undefined): Promise<Product[] | []> {
  try {
    
    if(!family_id)
    return []
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/family/${family_id}`
    );

      const products: Product[] = resp.data?.map(
        (product: ProductResponse) =>
        new Product({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
          familyId: product.family_id,
          total: product.total,
          family: product.family
        })
        ) ?? [];

        return products;

  } catch (error) {
    throw App_MESSAGES.DEFAULT.DISCONNECTED;
  }
}
