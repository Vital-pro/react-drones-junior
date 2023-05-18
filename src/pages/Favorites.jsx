import Card from "../components/Card";

function Favorites({items, onFavorite, onPlus}) {
  return (
    <div className='content'>
        <div className='contentSearchBlock'>
          <h1 className='contentTitle'>
            Мои закладки
          </h1>       
        </div>

        <div className='contentCards'>
        {items
            .map((item, index) => (
              <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={onFavorite}
              favorited={true}
              onPlus={onPlus}
              {...item} // такая контатенация ВСЕХ свойств
              />
            ))}
        </div>
      </div>
  )
}

export default Favorites;