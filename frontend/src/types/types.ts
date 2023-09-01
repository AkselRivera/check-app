export type ProductResponse = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  family_id: string;
  total: number;
};

export type FamilyResponse = {
  id: string;
  name: string;
  total: number;
  products_count: number;
};
