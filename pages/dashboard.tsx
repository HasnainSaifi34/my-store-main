import React, { useState, useEffect } from 'react';

const DashBoard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');

  const AuthenticateViaToken = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const url = 'http://localhost:3050/userdata';

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
      console.log(ObjData);
      const userData = ObjData.userData;

      setName(userData.username);
      setPhoneNo(userData.phoneNo);
      setEmail(userData.email);
      console.log(name, phoneNo, email);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = 'https://my-store-main.devilgaming50.repl.co/';
  };

  useEffect(() => {
    AuthenticateViaToken().then(() => {
      setLoading(false);
    });
  }, []);

  const LoadingAcount = () => {
    return (
      <>
        <div className="account-page">
          <div className="account-details">
            <h1></h1>
            <div className="detail-item">
              <label></label>
              <span></span>
            </div>
            <div className="detail-item">
              <label></label>
              <span></span>
            </div>
            <div className="detail-item">
              <label></label>
              <span></span>
            </div>
            <button className="logout-button"></button>
          </div>
          <div className="ordered-items">
            <h2></h2>
          </div>
        </div>
      </>
    );
  };

  return !loading ? (
    <>
      <div className="account-page">
        <div className="account-details">
          <h1>Account Details</h1>
          <div className="detail-item">
            <label>Name: </label>
            <span> {name} </span>
          </div>
          <div className="detail-item">
            <label>Phone No:</label>
            <span> {phoneNo} </span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span> {email} </span>
          </div>
          <button className="logout-button" onClick={logOut}>
            Log Out
          </button>
        </div>
        <div className="ordered-items">
          <h2>Ordered Items</h2>
        </div>
      </div>
    </>
  ) : (
    <LoadingAcount />
  );
};

export default DashBoard;
