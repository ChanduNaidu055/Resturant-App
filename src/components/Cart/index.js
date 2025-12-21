import {useContext, useMemo} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const cartCount = useMemo(
    () => cartList.reduce((sum, i) => sum + i.quantity, 0),
    [cartList],
  )

  const isEmpty = cartList.length === 0

  return (
    <>
      <Header cartCount={cartCount} restaurantName="UNI Resto Cafe" />
      <div className="cart-page-container">
        <div className="cart-header-row">
          <h2 className="cart-title">My Cart</h2>
          <button
            type="button"
            className="remove-all-btn"
            onClick={removeAllCartItems}
          >
            Remove All
          </button>
        </div>

        {isEmpty ? (
          <div className="empty-cart-container">
            <img
              alt="empty cart"
              className="empty-cart-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            />
            <p className="empty-cart-text">Your cart is empty</p>
          </div>
        ) : (
          <ul className="cart-items-list">
            {cartList.map(item => (
              <li key={item.id} className="cart-item-row">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>

                  <div className="qty-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => decrementCartItemQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => incrementCartItemQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-price">
                    ₹ {item.price * item.quantity}
                  </p>
                </div>

                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Cart
