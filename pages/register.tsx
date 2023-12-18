import Link from 'next/link';
import {useState,useEffect} from 'react';
import LoadingBar from 'react-top-loading-bar';
import Alert from './components/Alert'


const Register = (props)=>{
  const [ result, setResult]=useState(false)
    const [username, SetUsername]=useState('');
  const [pass, SetPass]=useState('')
  const [email, setEmail]=useState('');
  const [ phoneNo , SetPhoneNo]=useState(0)
    const [title, SetTitle]=useState('');
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const handlechange = (e,stateSetter)=>{
    stateSetter(e.target.value)
  }
  const Register = async ()=>{
    setProgress(10)
    const url ='http://localhost:3050/users/register';
    const dataForServer ={
      "username":username,
      "password":pass,
      "phoneNo":phoneNo,
      "email":email
    }
    setProgress(30)
    
   const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    };
    setProgress(50)
    
    const res = await fetch (url,options)
    setProgress(80)
    
    const JSONDATA = await res.json()
    console.log(JSONDATA)
    SetTitle(JSONDATA.title)
    setResult(JSONDATA.result)
    setProgress(100)
    
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
   <div className='flex'>  EMAIL :<input type="text" onChange={(e)=>handlechange(e,setEmail)}/> </div>
       <div className='flex'>  PHONE.NO :<input type="number" onChange={(e)=>handlechange(e,SetPhoneNo)} /> </div>
     <button className="login-button" onClick={Register} >
  REGISTER
</button>
       <div className='link-to-register'>
       ALready a User ?<Link href="#" onClick={()=>props.ChangeLoginStatus(true)} >LogIn Now </Link> 
       </div>
     </div> 
      
      </div>
    </>
  )
}

export default Register;
