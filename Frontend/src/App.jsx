import { useEffect, useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import userStore from "./Redux/userStore";
import UserWrapper from './components/userWrapper/UserWrapper'
import AdminWrapper from './components/admin/AdminWrapper/AdminWrapper'
import { Bounce, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ggogle_id } from './utils/constants/Constants';



function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    
    <Router>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition: Bounce
    />
      <Provider store={userStore}>
      <GoogleOAuthProvider clientId={ggogle_id}>

      
      <Routes>
        <Route path="*" element={<UserWrapper />} /> 

        <Route path='/admin/*' element={<AdminWrapper />} />  
      </Routes>
      </GoogleOAuthProvider>
      </Provider>
    </Router>
    </>
  )
}

export default App