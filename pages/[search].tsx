import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import DummyCards from './components/DummyCards';

function ProductPage(props) {
  const router = useRouter();
  const { userData } = props;
  const { search } = router.query;
  const { GlobalUpdateStatus } = props;
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice]=useState(1000000);
  const [minPrice, setMinPrice]=useState(10);
  const handleChange = (e, state)=>{
    state(e.target.value)
  }
    const FilterSearch = async ()=>{
    const resultArr = productData.filter(item => item.price >=minPrice  && item.price<=maxPrice)
      setProductData(resultArr)
                                         
    }

  const fetchSearch = async () => {
    try {
      const url = `http://localhost:3050/search`;
      const reqData = {
        search: search,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      };
      const res = await fetch(url, options);
      const JSONDATA = await res.json();
      setProductData(JSONDATA.response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSearch().then(()=>{
      console.log(productData)
    });
  }, [search]);

  return !loading ? (
    <>
      <div className='filer-container'>
         <div className='min-price'> MINPRICE:<input type="number"onChange={(e)=>handleChange(e,setMinPrice)}/> </div>
          <div className='max-price'>  MAXPRICE:<input type="number"onChange={(e)=>handleChange(e,setMaxPrice)} /> </div>
           <div> <button className='filter-btn' onClick ={FilterSearch} >Filter</button> </div>

          </div>
  <div className="product-card-outer-container">
      {productData.length > 0 ? (
        productData.map((productData, index) => (
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
        ))
      ) : (
        <h1>No Products Found</h1>
      )}
    </div>
    </>
  ) : (
    <DummyCards />
  );
}

export default ProductPage;
