import React, {useState, useEffect} from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './ChatComponent.css'; 
import {useSelector} from 'react-redux'
import axios from 'axios'; 
import { baseUrl } from "../../utils/constants/Constants";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import docavatar from '../../assets/images/doctor/docavatar.webp'


const PatientChatComponent = () => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [bookings, setBookings] = useState([]);
    console.log("BOOKINGS:", bookings);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [client, setClient] = useState(null);
    console.log('CLIENT:', client);
    // const salonUser = useSelector(state => state.salon)
    // console.log('salonUser:', salonUser)
    // const salonId = salonUser.salonUser.id
    // console.log('salonID:', salonId)

    const[patient_id,setPatientID]=useState(null)
    const [doct, setdoct] = useState("");

    const fetchBookings = async (id) => {
      try {
        const response = await axios.get(`${baseUrl}appointment/api/patient-transactions/?patient_id=${id}`);
        setBookings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };

    const fetchDoctorID = (id) => {
      axios
        .get(baseUrl + `auth/custom-id/patient/${id}`)
        .then((res) => {
          setdoct(res.data);
          console.log(res.data.patient_user.custom_id);
          fetchBookings(res.data.patient_user.custom_id)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fetchUserID=()=>{
      const token=Cookies.get("access")
      const decoded = jwtDecode (token);
      setPatientID(decoded.user_id)
      fetchDoctorID(decoded.user_id)
    }



  

    useEffect(() => {
        
    
      fetchUserID()
      }, []); 


      const connectToWebSocket = (appointmentId) => {
        if (!appointmentId) return;
    
        const newClient = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${appointmentId}/`);
        setClient(newClient);
       
    
        newClient.onopen = () => {
          console.log('WebSocket Client Connected');
        };
    
        newClient.onmessage = (message) => {
          const data = JSON.parse(message.data);
          setChatMessages((prevMessages) => [...prevMessages, data]);
        };
        const fetchExistingMessages = async () => {
          try {
              const response = await fetch(`${baseUrl}chat/chat-messages/transaction/${appointmentId}/`);
      
              if (!response.ok) {
                  console.error('Error fetching existing messages. Status:', response.status);
                  return;
              }
      
              const data = await response.json();
      
              const messagesTextArray = data.map(item => ({
                  message: item.message,
                  sendername: item.sendername,
              }));
      
              setChatMessages(messagesTextArray);
              console.log('Chat messages:', messagesTextArray);
          } catch (error) {
              console.error('Error fetching existing messages:', error);
          }
      };
      
      fetchExistingMessages();
    
        return () => {
          newClient.close();
        };
      };
    
      const handleAppointmentClick = (booking) => {
        setSelectedAppointment(booking);
        setChatMessages([]);
        connectToWebSocket(booking.transaction_id);
      };
    
      const sendMessage = () => {
        if (!client || client.readyState !== client.OPEN) {
            console.error("WebSocket is not open");
            return;
        }
    
        const sendername = doct.first_name;
        console.log('SENDER NAME:', sendername);
    
        const messageData = { message, sendername };
        const messageString = JSON.stringify(messageData);
    
        console.log('Sending Message:', messageString);
    
        client.send(messageString);
        setMessage('');
    };
    

  return (
    <div>
      
      <main className="content w-full " style={{ marginTop: "25px" , marginBottom: "0"}}>
      <div className="container p-0"></div>
      <div className="card">
                <div className="row g-0">
                  {/* <div className="col-12 col-lg-5 col-xl-3 border-right">
                      <div className="px-4 ">
                          <div className="d-flfex align-itemfs-center">
                            <div className="flex-grow-1 d-flex align-items-center mt-2">
                              <input
                                type="text"
                                className="form-control my-3"
                                placeholder="Search..."
                                onChange=''
                                name='username'
        
                              />
                              <button className='ml-2' onClick=''style={{border:"none", borderRadius:"50%"}}><i className='fas fa-search'></i></button>
                            </div>
                          </div>
                      </div>
                    </div> */}
                    
      <div className="chat-container">
        <div className="appointments-list">
          <h2>Upcoming Appointments</h2>
          <ul>
          {bookings.map((booking) => (
            <li key={booking.transaction_id} onClick={() => handleAppointmentClick(booking)}>
                <div className="doctor-list-item d-flex align-items-start">
                  <img src={booking.doctor_profile_picture?booking.doctor_profile_picture:docavatar} alt="Doctor" className="rounded-circle mr-1"  />
                  <div className="flex-grow-1 ml-3">
                    <div className="small">
                      <small style={{ fontSize: '16px', fontWeight: 'bold' }}>{booking.doctor_name}</small>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          {selectedAppointment && (
            <div>
              <div className="selected-doctor-info d-flex align-items-center">
                <img
                  src={docavatar}
                  alt={selectedAppointment.doctor_name}
                  className="rounded-circle mr-1"
                  width={40}
                  height={40}
                />
                <div className="flex-grow-1">
                  <strong>{selectedAppointment.doctor_name}</strong>
                
                </div>
              </div>  
              <div className="chat-messages mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
                {chatMessages.map((msg, index) => (
                  <div key={index} className="message-container">
                  {msg.sendername === doct.first_name ? (
                    <div className="sent-message"><strong>{msg.sendername}:</strong>{msg.message}</div>
                  ) : (
                    <div className="received-message">
                      <strong>{msg.sendername}:</strong> {msg.message}
                    </div>
                  )}
                </div>
                ))}
              </div>
              <div className="message-input border-cyan-950 ">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </main>
 
    </div>
  )
}

export default PatientChatComponent
