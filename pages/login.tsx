import Link from 'next/link';
import {useState,useEffect} from 'react';
import LoadingBar from 'react-top-loading-bar';
import Alert from './components/Alert'


const Login = (props)=>{
  const [username, SetUsername]=useState('');
  const [pass, SetPass]=useState('');
  const [result, setResult]=useState(false);
  const [title, SetTitle]=useState('');
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const handlechange = (e,stateSetter)=>{
    stateSetter(e.target.value)
  }
  const Login = async()=>{
const url = 'http://localhost:3050/users/login';
    setProgress(10)
    const databody ={
      "username":username,
      "password":pass
    }
   const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(databody),
    }; 
    setProgress(30)
   const res = await fetch (url,options) 
    const dataObj = await res.json();
    setProgress(50)
    if(dataObj.result){
      props.SetUserDataFunc(dataObj.userObj)
      setProgress(70)
      props.chanageAuthStatus(dataObj.result)
      setProgress(90)
      SetTitle(dataObj.title)
      setResult(dataObj.result)
      localStorage.setItem('token',`${dataObj.userObj.token}`)
      
      setProgress(100)
    }else{
      SetTitle(dataObj.title)
      setResult(dataObj.result)
      setProgress(100)
      
    }
  }
  useEffect(() => {
    if (progress === 100) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [progress]);
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='login-container'>
      {showAlert && <Alert title={title} result={result} />}
        
     <div className='login-card'>
  <div className='flex'> USERNAME : <input type="text" onChange={(e)=>handlechange(e,SetUsername)} /></div>  
   <div className='flex'>  PASSWORD :<input type="password" onChange={(e)=>handlechange(e,SetPass)}/> </div>
     <button className="login-button" onClick={Login} >
  LOGIN
</button>
       <div className='link-to-register'>
       Not a User ?<Link href="#" onClick={()=>props.ChangeLoginStatus(false)} >Register Now </Link> 
       </div>
     </div> 
      
      </div>
    </>
  )
}
export default Login;