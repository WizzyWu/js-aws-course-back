import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items.reduce((acc: number, { count, product_price }: CartItem) => {
    return acc += product_price * count;
  }, 0) : 0;
}
