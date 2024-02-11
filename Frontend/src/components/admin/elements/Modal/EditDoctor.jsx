import { base } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../../utils/constants/Constants';
import axios from 'axios';

function EditDoctor({ doctorId, setIsDataFetched }) {
  
 

  const UserFields = [
    "username",
    "first_name",
    "last_name",
    "gender",
    "phone_number",
    "email",
    "date_of_birth",
    "user_type",
    "approval_status",
    "street",
    "city",
    "state",
    "zip_code",
    "country",
    "is_id_verified",,
    "is_email_verified",
    "is_active",
  ];
  
  const fieldInputTypes = {
    username: "text",
    first_name: "text",
    last_name: "text",
    gender: "select",
    phone_number: "text",
    email: "text",
    date_of_birth: "date",
    user_type: "text",
    approval_status: "text",
    street: "text",
    city: "text",
    state: "text",
    zip_code: "text",
    country: "text",
    is_id_verified: "checkbox",
    date_joined: "text",
    is_email_verified: "checkbox",
    is_active: "checkbox",
    full_name: "text", // Assuming full_name is a text input
    specializations: "text", // Assuming specializations is a text input
  };
  
  const [about, setAbout] = useState([]) //for handling the user details
  const [docDetail, setdocDetail] = useState([])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
  };

  const handleSelectChange = (e, field) => {
    // Implement your logic to update the state for select dropdown changes
    setAbout({
      ...about,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    // Fetch data using doctorId

    axios.get(baseUrl+`auth/admin/doc/${doctorId}`).then((res)=>{
    
      setAbout(res.data.user)
      setdocDetail(res.data)
      console.log(res.data,"reched to the editing component")
      setIsDataFetched(true);

    }).catch((err)=>{
      console.log(err);
    })
     
    },[doctorId, setIsDataFetched]);
   


  return (
    <>
      {/* **************************************************General information********************************************************/}

      <div className="col-span-2">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              {/* Display Specializations */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="specializations"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Specializations
                  </label>
                  <input
                    type="text"
                    name="specializations"
                    defaultValue={docDetail ? docDetail.specializations : ''}
                    id="specializations"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={docDetail ? docDetail.specializations : ''}
                    required=""
                  />
                </div>
              {UserFields.map((field, index) => (
                <div key={index} className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor={field}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                  </label>
                  {fieldInputTypes[field] === 'select' ? (
                    <select
                      name={field}
                      value={about ? about[field] : ''}
                      onChange={(e) => handleSelectChange(e, field)}
                      id={field}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : (
                    <input
                      type={fieldInputTypes[field]}
                      name={field}
                      defaultValue={about ? about[field]  : ''}
                      id={field}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={about ? about[field]  : ''}
                      required=""
                    />
                  )}
                  
                </div>
              ))}

              <div className="col-span-6 sm:col-full">
                <button
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  type="submit"
                >
                  Save all
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditDoctor;
