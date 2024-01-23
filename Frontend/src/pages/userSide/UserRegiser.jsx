import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    "first_name" : "",
    "last_name" : "",
    "email" : "",
    "phone" : "",
    "password" : "",
    "re_password" : ""
  });

  const {first_name, last_name, email, phone, password, re_password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isError, isSuccess, isLoading, message } = useSelector( (state) => state.authentication_user)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
  })
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password != re_password){
      toast.error("password do not match")
    }
    else
    {
      const userData = {
        first_name,
        last_name,
        email,
        phone,
        password,
        re_password
      }
      dispatch(register(userData))
    }
  }

  useEffect( () => {
    if (isError)
    {
      toast.error(message)
    }

    if(isSuccess || user)
    {
      navigate("/")
      toast.success("An activation email has been sent to your email.please check your email")
    }
  })



  return (
    <div className='regis'>
      <form className="form" onSubmit={handleChange}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name='first_name'
              value={first_name}
              onChange={handleChange}
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name='last_name'
              value={last_name}
              onChange={handleChange}
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            required
            placeholder=""
            type="email"
            className="input"
            name='email'
            value={email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="input"
            name='phone'
            value={phone}
            onChange={handleChange}
          />
          <span>Phone Number</span>
       </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            name='password'
            value={password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            name='re_password'
            value={re_password}
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>

        <button type="submit" className="submit" onClick={handleSubmit} >
          Submit
        </button>

        <p className="signin">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;