import React from "react";
import { Link } from "react-router-dom";

import {useCart} from '../hooks/useCart'
// import { AppContext } from "../App"; //так без кастомного хука

function Header(props) {
  const { totalPrice } = useCart();  // кастомный хук
  
  // const {cartItems} = React.useContext(AppContext); //так без кастомного хука
  // const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0) //так без кастомного хука

  return (
    <header>
      <Link to='/'>
        <div className='headerLeft'>
          <img className='headerLogo' src='img/logo.png' alt='Logo' />
          <div>
            <h3 className='headerTitle'>drones react</h3>
            <p className='headerText'>Магазин беспилотных дронов</p>
          </div>
        </div>
      </Link>
      <ul className='headerRight' >
        <li onClick={props.onClickCart}>
          <img className='headerCart' src='img/cart.svg' alt='Корзина' />
          <span className='headerRightSpan'>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to='/favorites'>
          <img className='headerUser' src='img/heart.svg' alt='Закладки' />
          </Link>
        </li>
        <li>
        <Link to='/orders'>
          <img className='headerUser' src='img/user.svg' alt='Пользователь' />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
