import {useState, useEffect, useContext, useMemo} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CategoryTabs from '../CategoryTabs'
import DishList from '../DishList'
import CartContext from '../../context/CartContext'
import './index.css'

const Home = () => {
  const [menuData, setMenuData] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [localQuantities, setLocalQuantities] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantName, setRestaurantName] = useState('')

  const {cartList, addCartItem} = useContext(CartContext)

  const cartCount = useMemo(
    () => cartList.reduce((sum, i) => sum + i.quantity, 0),
    [cartList],
  )

  useEffect(() => {
    const getMenu = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const actualData = data[0]
        setRestaurantName(actualData.restaurant_name)
        setMenuData(actualData.table_menu_list)
        setActiveCategoryId(actualData.table_menu_list[0].menu_category_id)
        setIsLoading(false)
      }
    }
    getMenu()
  }, [])

  const handleIncrementLocal = dishId =>
    setLocalQuantities(prev => ({...prev, [dishId]: (prev[dishId] || 0) + 1}))

  const handleDecrementLocal = dishId =>
    setLocalQuantities(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) > 0 ? (prev[dishId] || 0) - 1 : 0,
    }))

  const handleAddToCart = dish => {
    const qty = localQuantities[dish.dish_id] || 0
    if (dish.dish_Availability && qty > 0) {
      addCartItem({
        id: dish.dish_id,
        name: dish.dish_name,
        image_url: dish.dish_image,
        price: dish.dish_price,
        quantity: qty,
      })
    }
  }

  const activeCategory = menuData.find(
    each => each.menu_category_id === activeCategoryId,
  )

  if (isLoading) {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ff6b00" height={80} width={80} />
      </div>
    )
  }

  return (
    <>
      <Header cartCount={cartCount} restaurantName={restaurantName} />
      <div className="home-container">
        <CategoryTabs
          categories={menuData}
          activeCategoryId={activeCategoryId}
          onChange={setActiveCategoryId}
        />
        {activeCategory && (
          <DishList
            dishes={activeCategory.category_dishes}
            localQuantities={localQuantities}
            onIncrement={handleIncrementLocal}
            onDecrement={handleDecrementLocal}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </>
  )
}

export default Home
