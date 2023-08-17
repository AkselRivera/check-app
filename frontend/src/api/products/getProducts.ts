import axios from "axios";
import { ProductResponse } from "../../types/types";

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  familyId: string;
  total: number;
}

export class Product implements IProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  familyId: string;
  total: number;

  constructor({ id, name, quantity, unitPrice, familyId, total }: IProduct) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.familyId = familyId;
    this.total = total;
  }

  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      familyId: this.familyId,
      total: this.total,
    };
  }
}

export async function getProducts(): Promise<Product[] | null> {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`
    );

    const products: Product[] = resp.data.map(
      (product: ProductResponse) =>
        new Product({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
          familyId: product.family_id,
          total: product.total,
        })
    );

    return products;
  } catch (error) {
    throw error;
  }
}
