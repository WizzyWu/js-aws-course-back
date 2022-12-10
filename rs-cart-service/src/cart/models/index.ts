import { ReadLine } from "readline";

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product_id: number,
  product_price: number,
  count: number,
}

export type Cart = {
  id: string,
  items: CartItem[],
}
