import React from "react";
import Product from "./components/Product";
import data from "./data";

function App() {
  return (
    <div className="grid-container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="./logos/400dpiLogo.jpg" alt="House of Glamour" />
            </a>
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
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Offers!
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a href="cart.html" className="nav-link">
                    Cart
                  </a>
                </li>
                <li className="nav-item">
                  <a href="signin.html" className="nav-link">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div>
          <div className="product-row center">
            {data.products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </div>
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
                  <a href="Tel:+254796437946">
                    <i className="fas fa-phone-alt"> +254 796 437 946</i>
                  </a>
                  <br />
                  <a href="https://api.whatsapp.com/send?phone=254722522119">
                    <i className="fab fa-whatsapp"> +254 722 522 119</i>
                  </a>
                </p>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 segment-two md-mb-30 sm-mb-30">
                <h2>Useful Links</h2>
                <ul>
                  <li>
                    <a href="#">Delivery Services</a>
                  </li>
                  <li>
                    <a href="#">Career</a>
                  </li>
                  <li>
                    <a href="#">Discounts</a>
                  </li>
                  <li>
                    <a href="#">Offers</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 segment-three sm-mb-30">
                <h2>Follow Us</h2>
                <p>
                  Please follow us on our social media profiles to keep updated
                  with latest product arrivals and offers.
                </p>
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-pinterest"></i>
                </a>
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
  );
}

export default App;
