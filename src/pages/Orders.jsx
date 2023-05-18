import React from "react";
import axios from "axios";

import Card from "../components/Card";
import { AppContext } from "../App";


function Orders() {
  const {onAddToCart} = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart');
        // console.log(data.map((obj) => obj.itens).flat()); // ! объединить массив массивов 1 вар
        // console.log(data.reduce((prev, obj) => [...prev, obj], [])); // ! объединить массив массивов 2 вар
        setOrders(data.reduce((prev, obj) => [...prev, obj], []))
      } catch (error) {
        alert('Ошибка')
        console.error(error)
      }         
  })();
  }, []);

  return (
    <div className='content'>
        <div className='contentSearchBlock'>
          <h1 className='contentTitle'>
            Мои заказы
          </h1>       
        </div>

        <div className='contentCards'>
        {orders.map((item, index) => (
              <Card  key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              loading={false}
              {...item}
              />
            ))}
        </div>
      </div>
  )
}

export default Orders;