import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const toPrice = (num) => Number(num.toFixed(2)); //5.123 = '5.12' = 5.12 converting floats to 2 decimals
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.14 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    // TODO: dispatch place order
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="product-row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Delivery</h2>
                <p>
                  <strong>Name:</strong>
                  {cart.shippingAddress.fullName}
                  <br />
                  <strong>Address: </strong>
                  {cart.shippingAddress.mobile}, {cart.shippingAddress.county},
                  {cart.shippingAddress.city}, {cart.shippingAddress.road},
                  {` ${cart.shippingAddress.estate}`},{" "}
                  {cart.shippingAddress.address}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="product-row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x Ksh.{" "}
                          {item.price
                            .toString()
                            .replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                          = Ksh.{" "}
                          {(item.qty * item.price)
                            .toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2 className="text-center">Order Summary</h2>
              </li>
              <li>
                <div className="product-row">
                  <div>Items</div>
                  <div>
                    Ksh.{" "}
                    {cart.itemsPrice
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </li>
              <li>
                <div className="product-row">
                  <div>Shipping</div>
                  <div>
                    Ksh.{" "}
                    {cart.shippingPrice
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </li>
              <li>
                <div className="product-row">
                  <div>Value Added Tax - 14%</div>
                  <div>
                    Ksh.{" "}
                    {cart.taxPrice
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </li>
              <li>
                <div className="product-row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      Ksh.{" "}
                      {cart.totalPrice
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                    </strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
