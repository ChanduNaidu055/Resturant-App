import {Component} from 'react'
import CartContext from './CartContext'

class CartContextProvider extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = item => {
    this.setState(prevState => {
      const existing = prevState.cartList.find(i => i.id === item.id)
      if (existing) {
        return {
          cartList: prevState.cartList.map(i =>
            i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i,
          ),
        }
      }
      return {
        cartList: [
          ...prevState.cartList,
          {...item, quantity: item.quantity || 1},
        ],
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(i => i.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(i =>
        i.id === id ? {...i, quantity: i.quantity + 1} : i,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(i => (i.id === id ? {...i, quantity: i.quantity - 1} : i))
        .filter(i => i.quantity > 0),
    }))
  }

  render() {
    const {children} = this.props
    const {cartList} = this.state

    const value = {
      cartList,
      removeAllCartItems: this.removeAllCartItems,
      addCartItem: this.addCartItem,
      removeCartItem: this.removeCartItem,
      incrementCartItemQuantity: this.incrementCartItemQuantity,
      decrementCartItemQuantity: this.decrementCartItemQuantity,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
  }
}

export default CartContextProvider
