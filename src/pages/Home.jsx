import React from "react";
import Card from "../components/Card"
import  {AppContext}  from "../App";

function Home({items, cartItems, searchValue, setSearchValue, onAddToCart, isLoading}) {

  const {isItemAdded} = React.useContext(AppContext)

  const renderItems = () => {
    return (isLoading ? ([...Array(10)]) : (items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())))
    .map((item, index) => (
      <Card
        key={index}
        title={item.title}
        price={item.price}
        imageUrl={item.imageUrl}
        onFavorite={() => console.log('Добавить в закладки?')}
        // onFavorite={onAddToFavorite} здесь нужно вызвать в Card 3
        onPlus={(obj) => onAddToCart(obj)} //или так2
        // onPlus={onAddToCart}   //или так2
        added={isItemAdded(item &&item.id)}
        loading={false}
        {...item}
      />
    )))
  };

  return (
    <div className='content'>
        <div className='contentSearchBlock'>
          <h1 className='contentTitle'>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : 'Все дроны'}
          </h1>
          <div className='contentSearch'>
            <img
              className='contentSearchImg'
              src='img/search.svg'
              alt='Search'
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className='cartItemRemove inputRemove'
                src='img/btn-remove.svg'
                alt='Close'
              />
            )}
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              // onChange={onChangeSearchInput} или так1
              value={searchValue}
              className='contentSearchInpit'
              placeholder='Поиск...'
            />
          </div>
        </div>

        <div className='contentCards'>
          {renderItems()}
        </div>
      </div>
  )
}

export default Home;