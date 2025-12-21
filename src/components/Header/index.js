import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {cartCount, restaurantName, history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bg-container">
      <Link to="/" className="link-items">
        <h1 className="nav-heading">{restaurantName}</h1>
      </Link>

      <div className="my-Orders-container">
        <p className="my-Orders-heading">My Orders</p>

        <Link to="/cart" className="link-items">
          <div className="cart-icon-container">
            <button type="button" data-testid="cart" className="cart-icon-btn">
              <IoCartOutline className="cart-icon" />
            </button>
            <p className="cart-item-count">{cartCount}</p>
          </div>
        </Link>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
