import React, { useEffect, useState } from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode";
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
import { baseUrl } from '../../utils/constants/Constants';
import { GoogleLogin } from '@react-oauth/google';




function UserLogin() {
  const { state } = useLocation();
  const [message, setmessage] = useState(null)
  const [formError, setFormError] = useState([])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(state){
  //     setmessage(state)
  //   }
    
  //   navigate('', {}); 
    
  // }, [navigate])


  const handleLoginSubmit = async(event)=> {
    event.preventDefault();
    console.log('yep reach here\n');
    setFormError([])
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    console.log(Object.fromEntries(formData));
    console.log(formData);
    try {
      const res = await axios.post(baseUrl+'auth/login', formData)
      if(res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        console.log(res.data);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin:res.data.isAdmin,
            is_doctor:res.data.is_doctor,
            
          })
        );
        console.log(res.data.is_doctor,"this is the status");
        console.log(res.data.is_doctor);
        if (res.data.is_doctor){
          navigate('/doctor/dashboard')
          return res 
        }else{
          navigate('/')
          return res  
        }
      }  
      
    }
    catch (error) {
      console.log(error);
      // if (error.response.status===401)
      // {
       
      //   setFormError(error.response.data)
      // }
      // else
      // {
      //   console.log(error);
  
      // }
    }
  }
  const Google_login = async (user_detail) => {
    const formData = new FormData();
    formData.append("email", user_detail.email)
    formData.append("password", "12345678874")
    console.log("formData");
    console.log(Object.fromEntries(formData))

    try {
      const res = await axios.post(baseUrl + 'auth/login', formData)
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
            is_doctor:res.data.is_doctor,
            
          })
        );
        console.log(res.data.is_doctor,"this is the status");
        if (res.data.is_doctor){
          navigate('/doctor/dashboard')
          return res 
        }else{
          navigate('/')
          return res  
        }



        
        
      }

      if (res.response.status === 401) {
        navigate('/auth/signup')
      }

    }
    catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="container">
  <div className="heading">Sign In</div>
  <form  className="form"  method='POST'  onSubmit={handleLoginSubmit}>
    <input
      required=""
      className="input"
      type="email"
      name="email"
      id="email"
      placeholder="E-mail"
    />
    <input
      required=""
      className="input"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
    />
    <span className="forgot-password">
      <a href="#">Forgot Password ?</a>
    </span>
    <input className="login-button" type="submit" defaultValue="Sign In" />
    <p className="p">Don't have an account? <Link className="span" to="/auth/register">Sign Up</Link></p>
  </form>
  <div className="social-account-container">
    <span className="title">Or Sign in with</span>
    <div className="social-accounts">
    <GoogleLogin
          onSuccess={(credentialResponse) => {
            Google_login(jwtDecode(credentialResponse.credential))
            console.log(jwtDecode(credentialResponse.credential));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
    </div>
  </div>
  <span className="agreement">
    <a href="#">Learn user licence agreement</a>
  </span>
</div>

  )
}

export default UserLogin