import {Route, Switch, BrowserRouter} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContextProvider from './context/CartContextProvider'
import './App.css'

const App = () => (
  <CartContextProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  </CartContextProvider>
)

export default App
