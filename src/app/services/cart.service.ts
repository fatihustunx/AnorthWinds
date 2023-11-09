import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product){

    var item = CartItems.find(c => c.product.productId===product.productId);

    if(item){
      item.quantity+=1;
    }else{
      var cartItem = new CartItem();
      cartItem.product=product;
      cartItem.quantity=1;

      CartItems.push(cartItem);
    }
  }

  removeFromCart(product:Product){
    var item = CartItems.find(c=>c.product.productId===product.productId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  getCart():CartItem[]{
    return CartItems;
  }

}
