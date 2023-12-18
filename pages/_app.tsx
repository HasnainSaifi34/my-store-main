import '../styles/globals.css';
import Navbar from './components/Navbar';
import type { AppProps } from 'next/app';
import Login from './login';
import Loading from './loading'
import Register from './register'
import Footer from './footer'
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [AuthStatus, SetAuthStatus] = useState(false);
  const[componentUpdate, SetComponentUpdate]=useState(false)
  const chanageAuthStatus =(state:boolean)=>{
SetAuthStatus(state)
  }

const [login , SetLogin]=useState(true)
    const ChangeLoginStatus = (state:boolean)=>{
    SetLogin(state)
  }
  
  const [userData, SetUserData]=useState({})
  const SetUserDataFunc = (data:any)=>{
    SetUserData(data)
  }
  const [loading , SetLoading]=useState(true)
  const SetLoadingFun = (state:boolean)=>{
    SetLoading(state)
  }
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
    SetAuthStatus(ObjData.result);
    SetUserData(ObjData.userObj)}
    SetLoading(false)
  };
const changeUpdateStatus = (arg:boolean)=>{
  SetComponentUpdate(arg)
  return componentUpdate;
}
  useEffect(() => {
    AuthenticateViaToken();
  }, []);

  useEffect(() => {
   if(componentUpdate) {   AuthenticateViaToken().then(()=>{
      console.log("Updating")
      SetComponentUpdate(false)
    });}
  }, [componentUpdate]);

  return AuthStatus ? (
    <>

  <Navbar userData={userData} GlobalUpdateStatus={changeUpdateStatus} />
  <Component {...pageProps} userData={userData} GlobalUpdateStatus={changeUpdateStatus} />
      <Footer/>


    </>
    
  ) : (
    
  loading? <Loading/>: login? <Login chanageAuthStatus={chanageAuthStatus} SetUserDataFunc={SetUserDataFunc} ChangeLoginStatus={ChangeLoginStatus} />: <Register 
    ChangeLoginStatus={ChangeLoginStatus} />
  
  );
}

export default MyApp;
