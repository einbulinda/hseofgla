import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [mobile, setMobile] = useState(shippingAddress.mobile);
  const [county, setCounty] = useState(shippingAddress.county);
  const [city, setCity] = useState(shippingAddress.city);
  const [road, setRoad] = useState(shippingAddress.road);
  const [landmark, setLandmark] = useState(shippingAddress.landmark);
  const [estate, setEstate] = useState(shippingAddress.estate);
  const [address, setAddress] = useState(shippingAddress.address);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        mobile,
        county,
        city,
        road,
        landmark,
        estate,
        address,
      })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Delivery Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="county">County</label>
          <input
            type="text"
            id="county"
            placeholder="Enter county of delivery"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="road">Street / Road</label>
          <input
            type="text"
            id="road"
            placeholder="Enter nearest road"
            value={road}
            onChange={(e) => setRoad(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            id="landmark"
            placeholder="What is your nearest landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="estate">Estate</label>
          <input
            type="text"
            id="estate"
            placeholder="Enter name of estate or village"
            value={estate}
            onChange={(e) => setEstate(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter detailed description of the delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
