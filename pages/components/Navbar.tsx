import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
export default function Navbar(props) {
  const router = useRouter();
  const {userData}=props;
  const [cartItemsLen, setCartItemLen] = useState(userData.cartItems.length);
  const [loading, SetLoading] = useState(true);
  const [search, setSearch]=useState('');
  const hadlesearchChange = (e)=>{
    setSearch(e.target.value)
  }
  const Performsearch = ()=>{
    router.push(`/${search}`)
  }
  let ObjData;
 
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
      ObjData = await res.json();
      SetcartItemsLen(ObjData.userObj.cartItems.length);
      
      SetLoading(false);
    }
  };




  return (
    <> 
      <div className='nav-container'>
        <img src="https://my-store-main.devilgaming50.repl.co/spectral.png" />

        <div className='nav-item-container-1'>
         <Link href="/" style={{textDecoration:"none"}}> <div id='home-nav-item' className='nav-item'>
            Home
          </div></Link>
      <Link href="/all" style={{textDecoration:"none"}}>  <div className='nav-item'>All Category</div> </Link>    
         <Link href="/electronics" style={{textDecoration:"none"}}>   <div className='nav-item'>Electronics</div> </Link>
        <Link href="/clothing" style={{textDecoration:"none"}}>   <div className='nav-item'>Clothing</div> </Link>
      <Link href="/cosmetics" style={{textDecoration:"none"}}>     <div className='nav-item'>Cosmetics</div> </Link>
         <Link href="/gifts" style={{textDecoration:"none"}}>  <div className='nav-item'>Gifts</div> </Link>
          <div className='nav-item'>Contact-Us</div>
        </div>
        <div className='search-bar'>
          <input type="text" id="search-input" onChange={hadlesearchChange} />
          <button className='search-perform-button' onClick={Performsearch} >Search</button>
         <Link href="/Cart" style={{textDecoration:"none"}}> <div className='cart ' >
            Cart<div className='cart-no'>{cartItemsLen}</div>

          </div> </Link>
          <Link href="/dashboard">
           <img src="https://my-store-main.devilgaming50.repl.co/my-account-5.png" 
id="account" /> </Link>

        </div>
      </div>
      
    </>
  );
}
