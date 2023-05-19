import React from "react";

import {useCart} from '../../hooks/useCart'

import styles from './Drawer.module.css'

function Drawer({ onClose, onRemove, items = [], opened }) {

  const { totalPrice} = useCart();

  return (
        <div className={`${styles.drawerOverlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className='drawerTitle'>
          Корзина
          <img
            className='cartItemRemove'
            src='img/btn-remove.svg'
            alt='Close'
            onClick={onClose}
          />
        </h2>

        

        <div className='cartItems'>
          {
            items.length > 0 ? (<>
              {items.map((obj, index) => (
            <div key={index} className='cartItem'>
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className='cartItemImg'
              ></div>
              <div className='cartItemBlock'>
                <p className='cartItemText'>{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img
                onClick={() => onRemove(obj.id)}
                className='cartItemRemove'
                src='img/btn-remove.svg'
                alt='Remove'
              />
            </div>
          ))}</>
            ) : (
            <div className="cartEmpty">
              <img src='img/empty-cart.jpg' alt=""/>
              <p>Пока здесь пусто...</p>
            </div>)
          }
          

          {/* {*******условный рендеринг, если корзина пуста*****************
          items.length > 0 ? (<>items</>) : (<>Cart is empty</>);
        } */} 

        
          {/* <div className='cartItem'>
            <div
              style={{ backgroundImage: 'url(/img/drones/1.jpg)' }}
              className='cartItemImg'
            ></div>
            <div className='cartItemBlock'>
              <p className='cartItemText'>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className='cartItemRemove'
              src='/img/btn-remove.svg'
              alt='Remove'
            />
          </div> */}
          {/* <div className='cartItem'>
            <div
              style={{ backgroundImage: 'url(/img/drones/1.jpg)' }}
              className='cartItemImg'
            ></div>
            <div className='cartItemBlock'>
              <p className='cartItemText'>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className='cartItemRemove'
              src='/img/btn-remove.svg'
              alt='Remove'
            />
          </div>

          <div className='cartItem'>
            <div
              style={{ backgroundImage: 'url(/img/drones/1.jpg)' }}
              className='cartItemImg'
            ></div>
            <div className='cartItemBlock'>
              <p className='cartItemText'>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className='cartItemRemove'
              src='/img/btn-remove.svg'
              alt='Remove'
            />
          </div> */}
          
        </div>

        
        
        <div className='cartTotalBlock'>
          <ul className='cartItemsList'>
            <li className='cartTotalBlockItem'>
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
            <li className='cartTotalBlockItem'>
              <span>Налог 5%:</span>
              <div></div>
              <b>{Math.round(totalPrice /100 * 5)} руб.</b>
            </li>
          </ul>
          <button className='greenButton'>
            Создать заказ <img src='img/arrow.svg' alt='Arrow' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
