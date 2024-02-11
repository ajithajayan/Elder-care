import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { baseUrl } from "../../utils/constants/Constants";
import ImageUploading from "react-images-uploading";
import user from "../../assets/images/user.png";
import { toast } from "react-toastify";

function DoctorProfile() {
  const addressFields = ["street", "city", "state", "country", "zip_code"];
  const UserFields = [
    "username",
    "first_name",
    "last_name",
    "gender",
    "phone_number",
    "email",
    "date_of_birth",
    "street",
    "city",
    "state",
    "country",
    "zip_code",
  ];

  const fieldInputTypes = {
    username: "text",
    first_name: "text",
    last_name: "text",
    gender: "select", // For gender, you can use a select dropdown
    phone_number: "text",
    email: "text",
    date_of_birth: "date",
    street: "text",
    city: "text",
    state: "text",
    country: "text",
    zip_code: "text",
  };

  const [profile, setProfile] = useState(null); // it's use for storing the image

  const [about, setAbout] = useState([]); // it's used to store the all profile information about the users

  const [id, setId] = useState(null);

  // ---------------------  Portion for uploding the image   ---------------------

  const fileInputRef = useRef(null);
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    let form_data = new FormData();
    form_data.append("profile_picture", file, file.name);

    await axios
      .patch(baseUrl + `auth/doc/update/${id}`, form_data)
      .then((res) => {
        fetchData();
        toast.success("profile pic has been updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const profileDelete = async () => {
    let form_data = new FormData();
    form_data.append("profile_picture", ""); // Set to an empty string or any placeholder value
    // Add other fields to form_data as needed
    await axios
      .patch(baseUrl + `auth/doc/update/${id}`, form_data)
      .then((res) => {
        fetchData();
        toast.success("profile pic deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ...................................................................................

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access");

      let decoded = jwtDecode(token);
      console.log(decoded, "hfhhhhhhhhhhhhhhhhhhhhhhhh");
      let id = decoded.user_id;
      console.log(id);
      setId(id);

      const doct = await axios.get(baseUrl + "auth/doc/list/" + id);
      if (doct.status === 200) {
        setProfile(doct.data.profile_picture);
        setAbout(doct.data);
      }
      // Handle the response data as needed
      console.log(doct.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ...............................useEffect...............................

  useEffect(() => {
    fetchData();
  }, []);

  // used to update the details of the users

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("yep reach here\n");

    const formData = new FormData(event.target);

    

    try {
      const res = await axios.put(baseUrl + `auth/doc/list/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        toast.success("profile updated sucessfully")
        // Handle success, if needed
      }
    } catch (error) {
      console.error(error);
      // Handle error, if needed
    }
  };

  const handleSelectChange = (e, field) => {
    // Update the 'about' state when the select value changes
    setAbout({
      ...about,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
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
                    Settings
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            User settings
          </h1>
        </div>
        {/* profile image portion */}
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                src={profile || user}
                alt="Profile picture"
              />
              <div>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                  Profile picture
                </h3>
                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  JPG, GIF or PNG. Max size of 800K
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileInputChange}
                  />

                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      className="w-4 h-4 mr-2 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                    </svg>
                    Upload picture
                  </button>
                  <button
                    type="button"
                    onClick={profileDelete}
                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* *************************************************This portion for Language********************************************************/}

          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Language &amp; Time
            </h3>
            <div className="mb-4">
              <label
                htmlFor="settings-language"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select language
              </label>
              <select
                id="settings-language"
                name="countries"
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>English (US)</option>
                <option>Italiano</option>
                <option>Français (France)</option>
                <option>正體字</option>
                <option>Español (España)</option>
                <option>Deutsch</option>
                <option>Português (Brasil)</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="settings-timezone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Zone
              </label>
              <select
                id="settings-timezone"
                name="countries"
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>GMT+0 Greenwich Mean Time (GMT)</option>
                <option>GMT+1 Central European Time (CET)</option>
                <option>GMT+2 Eastern European Time (EET)</option>
                <option>GMT+3 Moscow Time (MSK)</option>
                <option>GMT+5 Pakistan Standard Time (PKT)</option>
                <option>GMT+8 China Standard Time (CST)</option>
                <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
              </select>
            </div>
            <div>
              <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Save all
              </button>
            </div>
          </div>
        </div>

        {/* **************************************************General information********************************************************/}

        <div className="col-span-2">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              General information
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                {UserFields.map((field, index) => (
                  <div key={index} className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={field}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace("_", " ")}
                    </label>
                    {fieldInputTypes[field] === "select" ? (
                      // If the field is 'gender', use a select dropdown
                      <select
                      name={field}
                      value={about ? about[field] : ""} // Use 'value' instead of 'defaultValue'
                      onChange={(e) => handleSelectChange(e, field)} // Add an onChange handler
                      id={field}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    ) : (
                      // For other fields, use text or date inputs
                      <input
                        type={fieldInputTypes[field]}
                        name={field}
                        defaultValue={about ? about[field] : ""}
                        id={field}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={about ? about[field] : ""}
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


          
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Password information
            </h3>
            <form action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="current-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    type="text"
                    name="current-password"
                    id="current-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    data-popover-target="popover-password"
                    data-popover-placement="bottom"
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    required=""
                  />
                  <div
                    data-popover=""
                    id="popover-password"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                  >
                    <div className="p-3 space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Must have at least 6 characters
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                        <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                        <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                        <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                      </div>
                      <p>It’s better to have:</p>
                      <ul>
                        <li className="flex items-center mb-1">
                          <svg
                            className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Upper &amp; lower case letters
                        </li>
                        <li className="flex items-center mb-1">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                            aria-hidden="true"
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
                          A symbol (#$&amp;)
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                            aria-hidden="true"
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
                          A longer password (min. 12 chars.)
                        </li>
                      </ul>
                    </div>
                    <div data-popper-arrow="" />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="text"
                    name="confirm-password"
                    id="confirm-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    required=""
                  />
                </div>
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
      </div>
    </>
  );
}

export default DoctorProfile;
