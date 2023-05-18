# START project - Можем ввести просто в CLI компьютера

npx create-react-app folder //folder - это будет папка проекта или просто . (точка), если текущая папка

- последнее - это название папки проекта, которую создаст сам React
  И открываем папку с проетом в VS Code

npm start - вводим в CLI terminale -> запускаем React проект

# Если нужен препроцессор, берем в node, есть специальный скрипт, НО в Ubuntu НЕ РАБотает!:

npm install node-sass@4.14.1 Обязательно пишем какая нужна версия ...@4.14.1!!! Иначе установит ВСЕ версии..!

- затем переименовываем index.css в index.scss. А в index.js импортим
  import './index.scss';

# В папке src создаем новую папку components. В ней -> новый компонент. Назовем его Card

# useState()

const [count, setCount] = useState(4)

const plus = ()=>{
setCount(count+1)
};
const minus = ()=> {
setCount(count-1)
};

  <h1>{count}</h1>
      <button onClick={()=>minus()}>-</button> 
      <button onClick={plus}>+</button> //два варианта объявления

# useEffect()

React.useEffect(()=>{
console.log('Переменная изменилась');
}, [isAdded]) // массив зависимостей, за изменениями которых следит useEffect

# Сайт для онлайн тренировки с кодом https://stackblitz.com
- https://stackblitz.com/edit/js-7ap9xe?file=index.html,index.js

# API сервера, тестовый бэкенд, можно создать 2 бесплатных проекта.
# Он позволяет хранить JSON данные (массив, объект т.д.)
- https://mockapi.io/

# JSON server

# Управляемые input's
const [searchValue, setSearchValue] = React.useState('');

<input
onChange={(e) => setSearchValue(e.target.value)}
value={searchValue}
className='contentSearchInpit'
placeholder='Search...'
/>

// onChange={onChangeSearchInput} или вынести в отдельную функцию

# условный рендеринг, если корзина пуста
{
  items.length > 0 ? (<>items</>) : (<>Cart is empty</>);
} 
 // условный рендеринг, если корзина пуста

 # reac-router-dom
https://v5.reactrouter.com/web/guides/quick-start

# react-content-loader
https://skeletonreact.com/

# useContext()
в АРР создадим глобальный ОБЪъект. В нем будем хранить ВСЕ необходимые данные. И все нужные
нам компоненты будут подписаны на него и зависеть от тех данных, которые есть в этом объекте. 

**Можно создать отдельный файл context.js или  Создаём в АРР через специальную React-конструкцию (ниже):**
 export const AppContext = React.createContext( {} );

 - теперь, если этот объект изменится, React оповестит все другие компоненты, которые зависят от этого объекта, которые подписаны на него, на его изменения

 **Обернем то, что нужно (может быть и все приложение АРР) в конструкцию (ниже):**

 <AppContext.Provider value={ { items, cartItems, favorites } }>

  .....here is your code, example:
    <Header />
    <Blog />

</AppContext.Provider>
- и теперь все эти свойства value={{ items, cartItems, favorites }} будут доступны во всех
компонентах, которые заключены внутрь <AppContext.Provider>...</AppContext.Provider>. И нам
теперь не нужно будет их прокидывать в пропсы. Теперь в самом компоненте пропишем:

 - сначала:
import { AppContext } from '../App'

 - потом ниже:
function Favorites({onAddToFavorites}) {
const { favorites } = React.useContext(AppContext);
 // и из state вытаскиваю favorites

  return (
    {favorites
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
  )
 }

# Делаем кастомный хук useCart.js, суммируем покупки в корзине
arr.reduce((sum, obj) => obj.price + sum, 0)
const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

Atom Background Modifird*****

# git push origin master --force
git push origin master --force

# deploy How to deploy React App to GitHub Pages
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f

# В папке public сохраняем все статические файлы - это те, которые не меняются 

# Разное...

АйТи Синяк https://www.youtube.com/watch?v=OtAlPwW8DNU o React key

https://stackblitz.com/ площадка для тренировок написания кода онлайн
