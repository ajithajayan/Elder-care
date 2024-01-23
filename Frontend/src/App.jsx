import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import userStore from "./Redux/userStore";
import UserWrapper from './components/userWrapper/UserWrapper'
import AdminWrapper from './components/admin/AdminWrapper/AdminWrapper'
import { ToastContainer } from 'react-toastify';



function App() {
  const [count, setCount] = useState(0)

  return (
    

    <Router>
      <Provider store={userStore}>
      <Routes>
        <Route path="*" element={<UserWrapper />} /> 

        <Route path='/admin/*' element={<AdminWrapper />} />  
      </Routes>
      </Provider>
    </Router>
  )
}

export default App