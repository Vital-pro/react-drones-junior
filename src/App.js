// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
// import AppContext from './context'; // вариант с отдельным файлом context.js

//------- useContext-вариант без отдельного файла----------
export const AppContext = React.createContext({}); // спец React-конструкция

// const arr = [
//   {
//     title: 'Супер- Агродрон AGR A22 new',
//     price: 15999,
//     imageUrl: 'img/drones/1.jpg',
//   },
//   {
//     title: 'Дрон- Картограф STS M8',
//     price: 18200,
//     imageUrl: 'img/drones/2.jpg',
//   },
//   {
//     title: 'Супер- Агродрон AGR A22 new',
//     price: 15999,
//     imageUrl: 'img/drones/3.jpg',
//   },
//   {
//     title: 'Дрон - Картограф STS M1550',
//     price: 15859,
//     imageUrl: 'img/drones/4.jpg',
//   },
//   {
//     title: 'Супер- Агродрон AGR A22 new',
//     price: 15999,
//     imageUrl: 'img/drones/5.jpg',
//   },
//   {
//     title: 'Дрон - Картограф STS M1550',
//     price: 15859,
//     imageUrl: 'img/drones/6.jpg',
//   },
//   {
//     title: 'Супер- Агродрон AGR A22 new',
//     price: 15999,
//     imageUrl: 'img/drones/7.jpg',
//   },
//   {
//     title: 'Дрон- Картограф STS M8',
//     price: 18200,
//     imageUrl: 'img/drones/8.jpg',
//   },
// ];

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setcartItems] = React.useState([]);
  const [favorites, setfavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setcartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          'https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart'
        );
        // .then((res) => {
        //   setcartItems(res.data);
        // });

        // fetch('https://645818261a4c152cf9916aa4.mockapi.io/items')
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((json) => {
        //     setItems(json);
        //   });    // то же самое с json()

        const itemResponse = await axios.get(
          'https://645e8a2d12e0a87ac0f2d421.mockapi.io/items'
        );
        // .then((res) => {
        //   setItems(res.data);
        // });

        setIsLoading(false);

        setcartItems(cartResponse.data);
        setItems(itemResponse.data);

        // axios
        //   .get('https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart')
        //   .then((res) => {
        //     setfavorites(res.data);
        //   });  Так надо бы, но нет бэкенда
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj);

    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setcartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        await axios.delete(
          `https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart/${obj.id}`
        );
      } else {
        await axios.post(
          'https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart',
          obj
        );
        setcartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  // const onAddToCart = async (obj) => {
  //   try {
  //     if (cartItems.find((favObj) => favObj.id === obj.id)) {
  //       axios.delete(
  //         `https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart/${obj.id}`
  //       );
  //       setcartItems((prev) => prev.filter((item) => item.id !== obj.id));
  //     } else {
  //       const resp = await axios.post(
  //         'https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart',
  //         obj
  //       );
  //       setcartItems((prev) => [...prev, resp.data]);
  //     }
  //   } catch (error) {
  //     alert('Что-то пошло не так...');
  //   }
  //   console.log(obj);
  // };

  const onRemoveItem = (id) => {
    console.log(id);
    try {
      axios.delete(`https://645e8a2d12e0a87ac0f2d421.mockapi.io/cart/${id}`);
      setcartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  // const onChangeSearchInput = (event) => {
  //   setSearchValue(event.target.value);
  // };  или так1

  // const onAddToFavorite = (obj) => {
  //   axios.post('https://645818261a4c152cf9916aa4.mockapi.io/favorites', obj);
  //   setfavorites((prev) => [...prev, obj]);
  // };  // здесь отправка на сервер и нужно вызвать в Card 3

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
      }}
    >
      <div className='wrapper'>
        <Drawer
          items={cartItems}
          onClose={() => setcartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setcartOpened(true)} />

        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path='/favorites'
            exact
            element={
              <Favorites
                items={cartItems}
                onFavorite={() => alert('Закладки?')}
                onPlus={() => alert('Вы решили?')}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path='/orders'
            exact
            element={
              <Orders
                items={cartItems}
                onFavorite={() => alert('Закладки?')}
                onPlus={() => alert('Вы решили?')}
              />
            }
          />
        </Routes>

        {/* <div className='content'>       Перенесли в Home
        <div className='contentSearchBlock'>
          <h1 className='contentTitle'>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : 'Все кроссовки'}
          </h1>
          <div className='contentSearch'>
            <img
              className='contentSearchImg'
              src='/img/search.svg'
              alt='Search'
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className='cartItemRemove inputRemove'
                src='/img/btn-remove.svg'
                alt='Close'
              />
            )}
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              // onChange={onChangeSearchInput} или так1
              value={searchValue}
              className='contentSearchInpit'
              placeholder='Search...'
            />
          </div>
        </div>

        <div className='contentCards'>
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                // onFavorite={onAddToFavorite} здесь нужно вызвать в Card 3
                // onFavorite={(obj) => onAddToFavorite(obj)}  //или так3
                onPlus={(obj) => onAddToCart(obj)} //или так2
                // onPlus={onAddToCart}   //или так2
              />
            ))}
        </div>
      </div> */}
      </div>
    </AppContext.Provider>
  );
}

export default App;
