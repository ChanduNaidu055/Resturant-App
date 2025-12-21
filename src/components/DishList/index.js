import DishItem from '../DishItem'
import './index.css'

const DishList = ({
  dishes,
  localQuantities,
  onIncrement,
  onDecrement,
  onAddToCart,
}) => (
  <ul className="dishes-container" data-testid="category_dishes">
    {dishes.map(dish => {
      const qty = localQuantities[dish.dish_id] || 0
      return (
        <li key={dish.dish_id}>
          <DishItem
            dish={dish}
            count={qty}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onAddToCart={onAddToCart}
          />
        </li>
      )
    })}
  </ul>
)

export default DishList
