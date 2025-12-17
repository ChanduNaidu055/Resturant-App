import DishItem from '../DishItem'
import './index.css'

const DishList = ({dishes, cartItems, onIncrement, onDecrement}) => (
  <ul className="dishes-container" data-testid="category_dishes">
    {dishes.map(dish => (
      <li key={dish.dish_id}>
        <DishItem
          dish={dish}
          count={cartItems[dish.dish_id] || 0}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </li>
    ))}
  </ul>
)

export default DishList
