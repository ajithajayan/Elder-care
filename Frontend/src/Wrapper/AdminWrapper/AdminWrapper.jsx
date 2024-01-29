
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter/AdminFooter';
import AdminHome from '../../pages/admin/AdminHome';
import AdminPrivateRoute from '../../components/Private/AdminPrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
import { set_user_basic_details } from '../../Redux/userBasicDetails/userBasicDetailsSlice';
import axios from 'axios';
import isAuthAdmin from '../../utils/isAuthAdmin';
import AdminCreateUser from '../../pages/admin/AdminCreateUser';
import AdminUpdateUser from '../../pages/admin/AdminUpdateUser';
import AdminSignin from '../../pages/admin/AdminSignin';
import { baseUrl } from '../../utils/constants/Constants';
import { Outlet, useRoutes } from 'react-router-dom'
import Page404 from '../../components/404/Page404';
import Main from '../../components/admin/layout/Main';
import '../../assets/Styles/main.scss'
import Doctor from '../../pages/admin/Doctor';
import Patient from '../../pages/admin/Patient';


function AdminWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);

  const token = localStorage.getItem('access');

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      if (isAuthenticated.isAuthenticated) {
        const res = await axios.get(baseUrl + 'auth/user/details/', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        dispatch(
          set_user_basic_details({
            name: res.data.first_name,
            profile_pic: res.data.profile_pic,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
  }, []);

  const routes = useRoutes([
    {
      path: "/login",
      element: <AdminSignin />
    },
    {
      element: (
        <>
          <div className='main'>
          <AdminPrivateRoute>
            <Main>
            <Outlet/>
            </Main>
          </AdminPrivateRoute>
          </div>
        </>
      ),
      children: [    
        {path: "/", element: <AdminHome />},
        {path: "/doctor", element: <Doctor/>},
        {path: "/patient", element: <Patient/>},
        {path: "user/create", element: <AdminCreateUser />},  
        {path: "/user/update/:id", element: <AdminUpdateUser />},
      ]
    },
    {
      path: "*",
      element: <Page404 />
    }
  ]);


  

  return routes;
    
}

export default AdminWrapper;
