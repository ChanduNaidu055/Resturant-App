import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = ({cartCount, restaurantName}) => (
  <nav className="nav-bg-container">
    <h1 className="nav-heading">{restaurantName}</h1>

    <div className="my-Orders-container">
      <p className="my-Orders-heading">My Orders</p>

      <div className="cart-icon-container">
        <IoCartOutline className="cart-icon" />
        <p className="cart-item-count">{cartCount}</p>
      </div>
    </div>
  </nav>
)

export default Header
