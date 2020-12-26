import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import CompanyProfileScreen from "./screens/CompanyProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="sticky-top">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img src="/logos/400dpiLogo.jpg" alt="House of Glamour" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link disabled"
                      to="/offers"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Offers!
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    {userInfo ? (
                      <div className="p-dropdown">
                        <Link to="#" className="nav-link">
                          {userInfo.name} <i class="fas fa-caret-down"></i>{" "}
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/profile">User Profile</Link>
                          </li>
                          <li>
                            <Link to="/orderhistory">Order History</Link>
                          </li>
                          <li>
                            <Link to="#signout" onClick={signoutHandler}>
                              Sign Out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link to="/signin" className="nav-link">
                        Sign In
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/about-us" component={CompanyProfileScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodsScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <Route path="/product/:id" component={ProductScreen}></Route>
        </main>
        <footer>
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12 segment-one">
                  <h3>House of Glamour</h3>
                  <p>
                    Magharibi Place
                    <br />
                    Ground Floor - Shop GA 5 <br />
                    Mahi Mahiu Road <br />
                    <Link to="Tel:+254796437946">
                      <i className="fas fa-phone-alt"> +254 796 437 946</i>
                    </Link>
                    <br />
                    <Link to="https://api.whatsapp.com/send?phone=254722522119">
                      <i className="fab fa-whatsapp"> +254 722 522 119</i>
                    </Link>
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 segment-two md-mb-30 sm-mb-30">
                  <h2>Useful Links</h2>
                  <ul>
                    <li>
                      <Link to="#">Delivery Services</Link>
                    </li>
                    <li>
                      <Link to="#">Career</Link>
                    </li>
                    <li>
                      <Link to="#">Discounts</Link>
                    </li>
                    <li>
                      <Link to="#">Our Story</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 segment-three sm-mb-30">
                  <h2>Follow Us</h2>
                  <p>
                    Please follow us on our social media profiles to keep
                    updated with latest product arrivals and offers.
                  </p>
                  <Link to="#">
                    <i className="fab fa-facebook"></i>
                  </Link>
                  <Link to="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link to="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i className="fab fa-pinterest"></i>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 segment-four sm-mb-30">
                  <h2>Our Newsletter</h2>
                  <p>
                    Want to know more about our products and offers? Sign up for
                    our email brief for hand-picked articles, news, and more.
                  </p>
                  <form action="">
                    <input type="email" />
                    <input type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <p className="footer-bottom-text">
            All Rights reserved by &copy;House of Glamour | 2020
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
