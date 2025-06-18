import { API_PRODUCTS } from "@/1shared/api/const";
import { createURLSearchParams, SearchParams } from "@/1shared/api/searchParams";

import { Product } from "./product.type";

export interface GetProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export class ProductApi {
  static async getProducts(searchParams?: SearchParams) {
    const params = createURLSearchParams(searchParams);

    return fetch(`${API_PRODUCTS}?${params}`)
      .then((response) => response.json())
      .then((result: GetProductsResponse) => result)
      .catch((e) => {
        console.log(e);
        return {
          page: 1,
          amount: 0,
          total: 0,
          items: [],
        };
      });
  }
}
