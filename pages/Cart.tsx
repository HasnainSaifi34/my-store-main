import React, { useState, useEffect } from 'react';
import CartCard from './components/CartCard';
import DummyCard from './components/CartDummyCard';
import Head from 'next/head';
import Checkout from './checkout';
import ProductCard from './components/ProductCard'
const Cart = (props) => {
  const { GlobalUpdateStatus } = props;
  const [userData, setUserData] = useState({});
  const [CheckoutStat, setCheckOutStat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [TotalPriceAllCartItems, setTotalPriceAllCartItems] = useState(0);
  const [productData, setProductData] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const AuthenticateViaToken = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const url = 'http://localhost:3050/users/login/token';
      const data = {
        token: token,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      console.log('Authenticating via token');

      try {
        const res = await fetch(url, options);
        const ObjData = await res.json();
        setUserData(ObjData.userObj);
      } catch (error) {
        console.error('Error authenticating via token:', error);
      }
    }
  };

  useEffect(() => {
    AuthenticateViaToken();
  }, []);

  useEffect(() => {
    const Calc = () => {
      console.log('Calculating Price');
      try {
        let totalPrice = 0;

        for (const elem of userData.cartItems) {
          totalPrice += elem.totalPrice;
        }

        setTotalPriceAllCartItems(totalPrice);
        setProductData(userData.cartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error calculating price or fetching product data:', error);
        setLoading(false);
      }
    };

    if (userData.cartItems) {
      Calc();
    }
  }, [userData]);

  const UpdateCartStatSetter = (arg) => {
    setUpdateStatus(arg);
  };

  useEffect(() => {
    if (updateStatus) {
     /* Authenticating via token is not defined at this line why??*/ AuthenticateViaToken().then(() => {
        if (userData.cartItems) {
          const Calc = async () => {
            console.log('Calculating Price');
            try {
              let totalPrice = 0;
              for (const elem of userData.cartItems) {
                totalPrice += elem.totalPrice;
              }
              setTotalPriceAllCartItems(totalPrice);
              setProductData(userData.cartItems);
              setLoading(false);
              setUpdateStatus(false);
            } catch (error) {
              console.error('Error calculating price or fetching product data:', error);
              setLoading(false);
              setUpdateStatus(false);
            }
          };
          Calc();
        }
      });
    }
  }, [updateStatus, userData]);

  const handleCheckout = () => {
    // Implement your checkout logic here
    setCheckOutStat(true);
  };

  return !CheckoutStat ? (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="total-price">
        <p>Total Price: {`${TotalPriceAllCartItems}`}</p>
        <button id="check-out" onClick={handleCheckout}>
          CheckOut
        </button>
      </div>
      <div className="product-card-outer-container">
        {loading ? (
          <DummyCard />
        ) : userData.cartItems.length > 0 ? (
          productData.map((elem, index) => (
            <CartCard
              quantity={elem.quantity}
              key={index}
              userData={userData}
              pid={elem.pid}
              imgUrl={elem.img_url}
              name={elem.name}
              price={elem.price}
              desc={elem.desc}
              UpdateCartStatSetter={UpdateCartStatSetter}
              GlobalUpdateStatus={GlobalUpdateStatus}
            />
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </>
  ) : (
    <>
      <div className="total-price">
        <p>Total Price: {`${TotalPriceAllCartItems}`}</p>
      </div>
      <Checkout productData={productData} totalPrice={TotalPriceAllCartItems} />
  
      <div className="product-card-outer-container">
        {loading ? (
          <DummyCard />
        ) : userData.cartItems.length > 0 ? (
          productData.map((elem, index) => (
            <ProductCard
              quantity={elem.quantity}
              key={index}
              userData={userData}
              pid={elem.pid}
              imgUrl={elem.img_url}
              name={elem.name}
              price={elem.price}
              desc={elem.desc}
              UpdateCartStatSetter={UpdateCartStatSetter}
              GlobalUpdateStatus={GlobalUpdateStatus}
            />
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </>
  );
};

export default Cart;
