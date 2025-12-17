import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CategoryTabs from '../CategoryTabs'
import DishList from '../DishList'
import './index.css'

const Home = () => {
  const [menuData, setMenuData] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantName, setRestaurantName] = useState('')

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

  const handleIncrement = dishId => {
    setCartItems(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const handleDecrement = dishId => {
    setCartItems(prev => {
      const current = prev[dishId] || 0
      if (current > 0) {
        return {...prev, [dishId]: current - 1}
      }
      return prev
    })
  }

  const totalCartCount = Object.values(cartItems).reduce((a, b) => a + b, 0)

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
      <Header cartCount={totalCartCount} restaurantName={restaurantName} />
      <div className="home-container">
        <CategoryTabs
          categories={menuData}
          activeCategoryId={activeCategoryId}
          onChange={setActiveCategoryId}
        />
        {activeCategory && (
          <DishList
            dishes={activeCategory.category_dishes}
            cartItems={cartItems}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
      </div>
    </>
  )
}

export default Home
