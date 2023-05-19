import React from 'react';
// import { useState } from 'react';
import cardStyles from './Card.module.css';
import ContentLoader from "react-content-loader";

// console.log(cardStyles);

function Card({
  id,
  title, 
  imageUrl, 
  price, 
  onFavorite, 
  onPlus, 
  favorited=false, 
  added=false,
  loading=false
}) {
  const [isAdded, setIsAdded] = React.useState(added)
  const [isFavorite, setIsFavorite] = React.useState(favorited)

  const onClickPlus = ()=> {
    onPlus({id, title, imageUrl, price});
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite({title, imageUrl, price});
    setIsFavorite(!isFavorite)
  }

  // React.useEffect(()=>{
  //   console.log('Переменная изменилась');
  // }, [isAdded]) // example useEffect()

  return (
    <div className={cardStyles.card}>

      {
        loading ? (<ContentLoader 
        speed={2}
        width={155}
        height={250}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="3" width="150" height="155" /> 
        <rect x="0" y="167" rx="5" ry="5" width="150" height="15" /> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
        <rect x="0" y="234" rx="5" ry="5" width="80" height="25" /> 
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
      </ContentLoader>) : (
      <>
      {onFavorite && (<div className={cardStyles.cardFavorite} onClick={onClickFavorite}>
        <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt='Unliked'/>
      </div>)}
      <img
        className={cardStyles.cardImg}
        width='100%'
        height={135}
        src={imageUrl}
        alt='Drones'
      />
      <h5 className={cardStyles.cardTitle}>{title}</h5>
      <div className={cardStyles.cardBottom}>
        <div className={cardStyles.cardPriceWrapper}>
          <span className={cardStyles.cardPrice}>Стоимость:</span>
          <b>{price} rub</b>
        </div>
        {/* <button > */}
          {onPlus && (<img onClick={onClickPlus} src={isAdded ? 'img/btn-checked.svg' : 'img/btn-plus.svg'} alt='Plus' />)}
        {/* </button> */}
      </div>
      </>
      )}

    </div>
  );
}

export default Card;
