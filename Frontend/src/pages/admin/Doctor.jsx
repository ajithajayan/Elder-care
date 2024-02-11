
import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/constants/Constants";
import axios from "axios";
import avatar from "../../assets/images/user.png"
import EditDoctor from "../../components/admin/elements/Modal/EditDoctor";


function Doctor() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [doctorData,setDoctorData] = useState([])
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [checked,setChecked] = useState(true)
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [doctEditData,setEditingDoctorId]=useState(null)
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  
  const doctorEdit=(custom_id)=>{
    setEditModalVisible(true);
    setEditingDoctorId(custom_id);
    
  }

  useEffect(()=>{

    axios.get(baseUrl+`auth/doctors/details`).then((req)=>{
      setDoctorData(req.data.results)

      console.log(req.data.results)
      // setDoctorData(req.data)
    }).catch((err)=>{
      console.log(err)
    })


  },[isEditModalVisible])

  return (
    <>

    {/* ************************************************search bar*********************************************** */}


    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
  <div className="w-full mb-1">
    <div className="mb-4">
      <nav className="flex mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5 mr-2.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <a
                href="#"
                className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
              >
                Users
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                aria-current="page"
              >
                List
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        All users
      </h1>
    </div>
    <div className="sm:flex">
      <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
        <form className="lg:pr-3" action="#" method="GET">
          <label htmlFor="users-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 lg:w-64 xl:w-96">
            <input
              type="text"
              name="email"
              id="users-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search for users"
            />
          </div>
        </form>
        <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
        <button
          type="button"
          data-modal-target="add-user-modal"
          data-modal-toggle="add-user-modal"
          className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add user
        </button>
        <a
          href="#"
          className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
          Export
        </a>
      </div>
    </div>
  </div>
</div>

{/* ****************************************************************table ***************************************************** */}

<div className="flex flex-col">
  <div className="overflow-x-auto">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden shadow">
       
        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Name
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Doctor ID
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Speciality
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Phone number
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Status
                <br />
                (Active / Deactive)
              </th>

              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Aprroval status
                <br />
                (Approved / Pending / Rejected)
              </th>

              <th
                scope="col"
                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {doctorData.map((item,index)=>{return(
            <tr key={item.doctor_user.custom_id}  className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={index}
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={index} className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.profile_picture?item.profile_picture:avatar}
                  alt="{{first_name  }} avatar"
                />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                  
                    {item.first_name +" "+ item.last_name}
                   
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    
                  {item.email}
                 
                  </div>
                </div>
              </td>
              <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                {item.doctor_user.custom_id}
              </td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.doctor_user.specializations}
              </td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">

              {item.phone_number}

              </td>
              <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.is_active}
                          className="sr-only peer"
                          onClick={handleCheckboxChange}
                          onChange={() => handleCheckboxChange(item.doctor_user.custom_id)}
                        />
                        <div
                          className={`peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-500 w-8 h-8 shadow-md ${
                            item.is_active ? 'peer-checked:bg-emerald-500' : ''
                          } peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center ${
                            item.is_active ? 'peer-checked:after:content-["✔️"]' : ''
                          } peer-hover:after:scale-75`}
                        ></div>
                      </label>
                    </div>
              </td>

              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">

              {item.approval_status}

              </td>



              <td className="p-4 space-x-2 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => doctorEdit(item.doctor_user.custom_id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Edit user
                </button>
                <button
                  type="button"
                  data-modal-target="delete-user-modal"
                  data-modal-toggle="delete-user-modal"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete user
                </button>
              </td>
            </tr>
           ) })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


{/* **********************************************************Modal******************************************************* */}

{isEditModalVisible&&(
            <div
              className={`fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full ${
                isEditModalVisible ? 'block' : 'hidden'
              }`}
              id="edit-user-modal"
              style={{ marginTop: "64px" }} // Adjust the top margin as needed
            >
              <div className="flex items-center justify-center h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 w-full md:w-auto max-h-screen overflow-y-auto max-w-screen-2xl">
                  {/* Modal header */}
                  <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">Edit user</h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={()=>{setEditModalVisible(false)}}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-6 space-y-6">
                    <EditDoctor 
                    doctorId={doctEditData}
                    setIsDataFetched={setIsDataFetched}
                    setEditModalVisible={setEditModalVisible}

                    />
                  </div>
                  {/* Modal footer */}
                </div>
              </div>
            </div>
            )}









    </>
  );
}

export default Doctor;
