import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Filter from './components/filter';
import LoadingBar from 'react-top-loading-bar'
import DummyCards from './components/DummyCards'
const AllCategory = (props) => {
  const [progress, setProgress] = useState(0)
  const [userData, setUserData] =useState([]) ;
  const [loading, setLoading] = useState(true);
  const [AllProducts, setAllProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  let [username, setUserName]=useState('');

  const {GlobalUpdateStatus} =props;
  const AuthenticateViaToken = async () => {
    const token = localStorage.getItem('token');
    if(token!==null) {const url = 'http://localhost:3050/users/login/token';

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
     setUserData(ObjData.userObj)
 }
  };

  const FetchAllData = async () => {
    try {
      await AuthenticateViaToken()
      setProgress(10)
      const url = 'http://localhost:3050/products/';
      const res = await fetch(url);
      setProgress(20)

      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      setProgress(30)
      
      const JSONDATA = await res.json();
      setProgress(50)
      
      setAllProducts(JSONDATA);
      setProgress(70)
      
      setLoading(false);
      setProgress(100)
      
    } catch (error) {
      console.error('Error:', error);
      setProgress(100)
    }
  };

  const FetchDataWithFilter = async (category, minPrice, maxPrice) => {
  
    try {
      setProgress(10)
      const apiUrl = 'http://localhost:3050/productfilter';
      const requestData = {
        category: category,
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
      };
      setProgress(30)

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      };
      setProgress(50)

      const response = await fetch(apiUrl, requestOptions);
      setProgress(70)

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setProgress(80)
      
      if (data.products) {
        setAllProducts(data.products);

      }
      setFilterStatus(true);
      setProgress(100)
      
    } catch (error) {
      console.error('Error:', error);
      setProgress(100)
      
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
  return !loading?(
    <>
        <LoadingBar
        color='#FFD700'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex-column">
        <div className="hello">
          HII {username.split(' ')[0]} Welcome to My-Store
        </div>

        <div className="top-products">ALL CATEGORY PRODUCTS</div>
        <Filter
          category=""
          fetch={FetchDataWithFilter}
        />
        <div className="product-card-outer-container">
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
                GlobalUpdateStatus={GlobalUpdateStatus}
              />
            ) : null
          )}
        </div>
      </div>
    </>
  ):(
    <DummyCards/>
  )
};

export default AllCategory;
