import ProductCard from './components/ProductCard'
import LoadingBar from 'react-top-loading-bar'

import { useState, useEffect } from 'react'
const HomePage = (props) => {
  const [TopProducts, SetTopProducts] = useState([]);
  const [progress, setProgress] = useState(0);
  const {GlobalUpdateStatus} =props;
  const [userData, setUserData] = useState([]);
  const mySecret = process.env['ADV_IMG']

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

  const fetchTopProducts = async () => {
    await AuthenticateViaToken()
    setProgress(20)
    const iterableProducts = [];
    const category = ['cosmetics', 'clothing', 'electronics', 'gifts'];
    setProgress(30)
    for (let i = 0; i < category.length; i++) {
      const url = `http://localhost:3050/products/${category[i]}/1`;
      const res = await fetch(url);
      const JSONDATA = await res.json();
      iterableProducts.push(JSONDATA);
    }
    setProgress(50)

    SetTopProducts(iterableProducts);
    
    setProgress(100)

  }

  useEffect(() => {
    fetchTopProducts();
  }, []);
  const username = userData.username;

  if (!userData || !username) {
    return <>UNAUTHENTICATED</>;
  }

const advImg = `https://my-store-main.devilgaming50.repl.co/adv_img2.jpg`


  return (
    <>
      <LoadingBar
        color='#FFD700'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='flex-column'>
        <div className='hello'>HII {username.split(' ')[0]} Welcome to My-Store</div>
        <img src={`${advImg}`} className='adv-img' />
        <div className='top-products'>Top Products</div>

        <div className='product-card-outer-container'>
          {TopProducts.map((productData, index) => (

            productData && productData.pid ? (
              <ProductCard key={index} userData={userData} pid={productData.pid} imgUrl={productData.img_url} name={productData.name} price={productData.price} desc={productData.desc} GlobalUpdateStatus= {GlobalUpdateStatus} /> ) : null
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
