import React, { useEffect } from "react";
import UserHeader from '../userside/UserHeader'
import Userfooter from '../userside/Userfooter'
import UserHome from '../../pages/userSide/UserHome'

import { Routes,Route} from 'react-router-dom'
import UserRegiser from '../../pages/userSide/UserRegiser'
import UserLogin from '../../pages/userSide/UserLogin'

import UserProfile from '../../pages/userSide/UserProfile'
import { Outlet, useRoutes } from 'react-router-dom'
import PrivateRoute from "../PrivateRoute";
import isAuthUser from '../../utils/IsAuthUser'
import { useDispatch,useSelector } from 'react-redux';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice'
import { set_user_basic_details } from '../../Redux/userBasicDetails/userBasicDetailsSlice'
import axios from 'axios'
import Authenticator from "../../pages/Authentication/Authenticator";


function UserWrapper() {

  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)
  

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated
      })
    );
  };

  const token = localStorage.getItem('access');

  // const fetchUserData = async () => {
  //   try {
  //       // const res = await axios.post(baseURL+'/api/accounts/user/details/',{headers: {Authorization: `Bearer ${token}`}})
  //       const res = await axios.get(baseURL+'/api/accounts/user/details/',{headers: {
  //         'authorization': `Bearer ${token}`,
  //         'Accept' : 'application/json',
  //         'Content-Type': 'application/json'
  //     }})
  //       .then(res => {
            
  //           dispatch(
  //             set_user_basic_details({
  //               name : res.data.first_name,
  //               profile_pic : res.data.profile_pic
  //             })
  //           );
  //         })
  //   }
  //   catch (error) {
  //     console.log(error);
      
  //   }

  // };


  useEffect(() => {
    if(!authentication_user.name)
    {
     
      checkAuth();
    
    }

  }, [authentication_user])
  
  const routes = useRoutes([{
    element: (
      <>
     <UserHeader/>
      <Outlet/>
      <Userfooter/>
      </>
    ),
    children:[
      {path: "/auth/*", element:<Authenticator/>},
      {path: "/", element: <UserHome/>}
    ],
  },
  {
    element: <div> not found 404</div>, path:'*'
  }
])




return routes

}

export default UserWrapper;