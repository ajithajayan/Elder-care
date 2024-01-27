import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/constants/Constants";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, phone_number, password, re_password } =
    formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.authentication_user
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name) {
      toast.error("Please enter a name");
    }
    if (first_name.indexOf(" ") !== -1 || last_name.indexOf(" ") !== -1) {
      toast.error("Enter a valid name");
    } else if (!email) {
      toast.error("Please enter an email address");
    }
    //  else if (first_name.replaceAll(/\s/g, "") > 3) {
    //   setFormError("Type more");
    // }
    else if (password.trim() === "") {
      toast.error("Please enter a password");
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      toast.error("Invalid email address");
    } else if (password != re_password) {
      toast.error("password do not match");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        phone_number,
        password,
      };
      await axios
        .post(baseUrl + "auth/register", userData)
        .then((e) => {
          toast.success(
            "An activation email has been sent to your email.please check your email"
          );
          navigate("/auth/login");
        })
        .catch((e) => {
          console.log(e);
        });

      // dispatch(register(userData))
    }
  };


  const Google_reg = async (user_detail) => {
    const formData = new FormData();
    formData.append("email", user_detail.email)
    formData.append("first_name", user_detail.given_name)
    formData.append("last_name", user_detail.family_name)
    formData.append("password", "12345678874")
    try {
        const res = await axios.post(baseUrl + 'auth/register', formData)
        console.log(res);
        if (res.status === 201) {
            console.log("Saved successfully man");
            navigate('/auth/login',
                {
                    state: res.data.Message
                })
            return res
        }
    }
    catch (error) {
        console.log("DafdAA\n\n", error);
    }
}



  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success(
        "An activation email has been sent to your email.please check your email"
      );
    }
  });

  return (
    <div className="regis">
      <form className="form">
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name="first_name"
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
              name="last_name"
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
            name="email"
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
            name="phone_number"
            value={phone_number}
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
            name="password"
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
            name="re_password"
            value={re_password}
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            Google_reg(jwtDecode(credentialResponse.credential))
            console.log(jwtDecode(credentialResponse.credential));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <button type="submit" className="submit" onClick={handleSubmit}>
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
