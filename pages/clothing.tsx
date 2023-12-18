import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Filter from './components/filter';
import LoadingBar from 'react-top-loading-bar';
import DummyCards from './components/DummyCards';

const Clothing = (props) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [AllProducts, setAllProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  const [userData, setUserData] = useState({});
  let [username, setUserName]=useState('');

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

      const res = await fetch(url, options);
      const ObjData = await res.json();
      setUserData(ObjData.userObj);
        setUserName(userData.username);
    }
  };

  const FetchAllData = async () => {
    setProgress(10);
    try {
      await AuthenticateViaToken();

      const url = 'http://localhost:3050/products/clothing';
      const res = await fetch(url);
      setProgress(40);

      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }

      const JSONDATA = await res.json();
      setProgress(60);

      setAllProducts(JSONDATA);
      setProgress(80);

      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const FetchDataWithFilter = async (category, minPrice, maxPrice) => {
    setProgress(10);

    try {
      const apiUrl = 'http://localhost:3050/productfilter';
      setProgress(20);

      const requestData = {
        category: category,
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
      };
      setProgress(40);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      };
      setProgress(60);

      const response = await fetch(apiUrl, requestOptions);
      setProgress(80);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setProgress(90);

      if (data.products) {
        setAllProducts(data.products);
        setProgress(100);
        console.log("response ", data);
      }
      setFilterStatus(true);
    } catch (error) {
      console.error('Error:', error);
      setProgress(100);
    }
  };

  useEffect(() => {
    if (!filterStatus) {
      FetchAllData();
    }
  }, [filterStatus]);

  useEffect(() => {
    if (userData.username) {
      setUserName(userData.username);
    }
  }, [userData]);

  return !loading ? (
    <>
      <LoadingBar
        color='#FFD700'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='flex-column'>
        <div className='hello'>
          HII {username && username.split(' ')[0]} Welcome to My-Store
        </div>

        <div className='top-products'>ALL CATEGORY PRODUCTS</div>
        <Filter category='clothing' fetch={FetchDataWithFilter} />
        <div className='product-card-outer-container'>
          {AllProducts.map((productData, index) =>
            productData && productData.pid ? (
              <ProductCard
                key={index}
                userData={userData}
                pid={productData.pid}
                imgUrl={productData.img_url}
                name={productData.name}
                price={productData.price}
                desc={productData.desc}
              />
            ) : null
          )}
        </div>
      </div>
    </>
  ) : (
    <DummyCards />
  );
};

export default Clothing;
