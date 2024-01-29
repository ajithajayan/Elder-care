import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from '../../../Redux/authentication/authenticationSlice';

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user)
  const user_basic_details = useSelector(state => state.user_basic_details)
  const logout = ()=>{
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin:false
      })
    );
    navigate('/admincontrol/login')

  }

  return (
    // <!-- Navbar -->
    <nav className=" flex flex-wrap items-center justify-between w-full h-20 bg-slate-400 py-28 mt-6 mb-4 shadow lg:flex-nowrap lg:justify-start">
    <div className="container flex items-center justify-between py-0 flex-wrap-inherit">
      <a
        className=" text-sm mr-4 ml-4 whitespace-nowrap font-bold text-black lg:ml-0"
        href="../pages/dashboard.html"
      >
        {" "}
        Elder Care{" "}
      </a>
      <button
        navbar-trigger=""
        className="  leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
        type="button"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
          <span
            bar1=""
            className="w-5.5 rounded-xs duration-350 relative my-0 mx-auto block h-px bg-white transition-all"
          />
          <span
            bar2=""
            className="w-5.5 rounded-xs mt-1.75 duration-350 relative my-0 mx-auto block h-px bg-white transition-all"
          />
          <span
            bar3=""
            className="w-5.5 rounded-xs mt-1.75 duration-350 relative my-0 mx-auto block h-px bg-white transition-all"
          />
        </span>
      </button>
      <div
        navbar-menu=""
        className="items-center flex-grow transition-all ease-soft duration-350 lg-max:bg-white lg-max:max-h-0 lg-max:overflow-hidden basis-full rounded-xl lg:flex lg:basis-auto"
      >
        <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
          <li>
            <a
              className="flex items-center px-4 py-2 mr-2 font-normal text-white transition-all duration-250 lg-max:opacity-0 lg-max:text-slate-700 ease-soft-in-out text-sm lg:px-2 lg:hover:text-white/75"
              aria-current="page"
              href="../pages/dashboard.html"
            >
              <i className="mr-1 text-white lg-max:text-slate-700 fa fa-chart-pie opacity-60" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 mr-2 font-normal text-white transition-all duration-250 lg-max:opacity-0 lg-max:text-slate-700 ease-soft-in-out text-sm lg:px-2 lg:hover:text-white/75"
              href="../pages/profile.html"
            >
              <i className="mr-1 text-white lg-max:text-slate-700 fa fa-user opacity-60" />
              Profile
            </a>
          </li>

          <li>
            <a
              className="block px-4 py-2 mr-2 font-normal text-white transition-all duration-250 lg-max:opacity-0 lg-max:text-slate-700 ease-soft-in-out text-sm lg:px-2 lg:hover:text-white/75"
              href="../pages/sign-in.html"
            >
              <i className="mr-1 text-white lg-max:text-slate-700 fas fa-key opacity-60" />
              Sign In
            </a>
          </li>
        </ul>
        {/* online builder btn  */}
        {/* <li class="flex items-center">
  <a
    class="leading-pro ease-soft-in border-white/75 text-xs tracking-tight-soft rounded-3.5xl hover:border-white/75 hover:scale-102 active:hover:border-white/75 active:hover:scale-102 active:opacity-85 active:shadow-soft-xs active:border-white/75 bg-white/10 hover:bg-white/10 active:hover:bg-white/10 mr-2 mb-0 inline-block cursor-pointer border border-solid py-2 px-8 text-center align-middle font-bold uppercase text-white shadow-none transition-all hover:text-white hover:opacity-75 hover:shadow-none active:scale-100 active:bg-white active:text-black active:hover:text-white active:hover:opacity-75 active:hover:shadow-none"
    target="_blank"
    href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053"
    >Online Builder</a
  >
</li> */}
        <ul className="hidden pl-0 mb-0 list-none lg:block lg:flex-row">
          <li>
            <a
              href="https://www.creative-tim.com/product/soft-ui-dashboard-tailwind"
              target="_blank"
              className="leading-pro hover:scale-102 hover:shadow-soft-xs active:opacity-85 ease-soft-in text-xs tracking-tight-soft shadow-soft-md bg-gradient-to-tl from-gray-400 to-gray-100 rounded-3.5xl mb-0 mr-1 inline-block cursor-pointer border-0 bg-transparent px-8 py-2 text-center align-middle font-bold uppercase text-slate-800 transition-all"
            >
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default AdminHeader