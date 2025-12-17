import './index.css'

const DishItem = ({dish, count, onIncrement, onDecrement}) => {
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_image: dishImage,
    dish_currency: dishCurrency,
    addonCat,
    dish_Type: dishType,
    dish_calories: dishCalories,
    dish_Availability: isAvailable,
  } = dish

  const isCustomizations = Array.isArray(addonCat) && addonCat.length > 0

  return (
    <div className="dish-card">
      <div className="dish-info">
        <div className="dish-type-indicator">
          <span
            className={`dish-type-box ${dishType === 1 ? 'nonveg' : 'veg'}`}
          >
            <span className="dish-type-dot" />
          </span>
          <h1 className="dish-name">{dishName}</h1>
        </div>

        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>

        <div className="dish-description-container">
          <p className="dish-description">{dishDescription}</p>
          <p className="dish-calories">{dishCalories} calories</p>
        </div>

        {isAvailable ? (
          <div className="dish-quantity-controls">
            <button
              type="button"
              onClick={() => onDecrement(dishId)}
              className="qty-btn"
            >
              -
            </button>

            <p className="qty-count">{count}</p>

            <button
              type="button"
              onClick={() => onIncrement(dishId)}
              className="qty-btn"
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available-text">Not available</p>
        )}

        {isCustomizations && isAvailable && (
          <p className="customization-text">Customizations available</p>
        )}
      </div>

      <div className="dish-image-wrapper">
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </div>
  )
}

export default DishItem
