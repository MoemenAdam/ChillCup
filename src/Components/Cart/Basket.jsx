import React, {useEffect, useState, useCallback} from 'react'
import { ShopContext } from '../../Context/ShopContext';
import { ProductsContext } from '../../Context/ProductsContext'
import Style from "../../Style/BasketStyle/Basket.module.css"
import ReactLoading from 'react-loading';
import CardBasket from "./CardBasket";
import { useContext } from 'react';
import Total from "./Total";

export default function Basket() {

  const {products} = useContext(ProductsContext);
	
	const { cartItems, getTotalCartPrice } = useContext(ShopContext);

	const cartToView = []
	for(let i = 0; i < cartItems.length; i++) {
		if(cartItems[i].chosenQuantity > 0) {
			for(let j = 0; j < products.length; j++) {
				if(cartItems[i].productId === products[j].id) {
					const customizedProduct = {
						id: products[j].id,
						name: products[j].name,
						price: products[j].price,
						chosenQuantity: cartItems[i].chosenQuantity,
						chosenExtras: cartItems[i].chosenExtras,
						imgSrc: products[j].imgSrc,
					};
					cartToView.push(<CardBasket p={customizedProduct} key={customizedProduct.id}/>);
				}
			}
		}
	}

  const totalPrice = getTotalCartPrice();
  return (
    <div className={Style.outer}>
        {
          cartItems.some(c => c.chosenQuantity > 0)?
          <div className={Style.container}>
              {
                cartToView
              }
              <Total/>
          </div>
          :
          <div className={Style.container2}> 
              <img src="empty.svg" alt="empty Basket" />
              <h3>Hey, your basket is empty!</h3>
              <p>Go on, stock up and order your faves.</p>
          </div>
        }
    </div>
  )
}
