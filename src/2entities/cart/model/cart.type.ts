import { Product } from "@/2entities/product/@x/cart";

export type CartItem = Product & { quantity: number };

export type Cart = { [productId: number]: CartItem };
