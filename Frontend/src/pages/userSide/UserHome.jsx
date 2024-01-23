import React from 'react'
import { useSelector } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'
import AppointmentGuide from '../../components/userside/AppointmentGuide'



function UserHome() {
  const navigate = useNavigate()
  const authentication_user = useSelector(state => state.authentication_user)
  return (
    <>
    <form>
      <header className="header">
        <a href="#" aria-label="Home" role="link">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/abcc3eb092113c9acba02288808b4b7a7fd870966104ef34880584ace2603e0e?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"className="aspect-[2.35] object-contain object-center w-full overflow-hidden"
            alt="Logo"
          />
        </a>
      </header>

      
    </form>

    <AppointmentGuide/>

    </>
  )
}

export default UserHome