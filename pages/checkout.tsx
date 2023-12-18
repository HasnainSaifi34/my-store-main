import React, { useState ,useEffect} from 'react';

const CheckoutPage: React.FC = (props) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const {productData}=props;
  const {totalPrice}=props;
  const handleCheckout = () => {

  
  
  };
useEffect(()=>{
  console.log(productData)
  console.log(totalPrice)

},[])
  return (
    <div className='checkout-page-container'>
    <div className="checkout-page">
      <h1 id="checkout-title">Checkout</h1>
      <div className="checkout-form">
        <div className="form-group">
          <label className="label" htmlFor="phoneNo">Phone Number</label>
          <input
            type="tel"
            id="phoneNo"
            className="input-field"
            placeholder="Enter your phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="input-field"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="pincode">Pin Code</label>
          <input
            type="text"
            id="pincode"
            className="input-field"
            placeholder="Enter your pin code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <button id="checkout-button" className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
      </div>
  );
};

export default CheckoutPage;
