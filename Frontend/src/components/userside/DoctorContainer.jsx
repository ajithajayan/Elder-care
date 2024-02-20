const DummyDoctorList = [
    {
      name: "Dr Khalid Khasmiri",
      speciality: "Skin",
      schedule: "10.00-12.00 AM",
      img: "https://as2.ftcdn.net/v2/jpg/02/75/96/99/1000_F_275969986_GzqDWQlGJLTzqj9wRd0yo3YlSHBeWOxc.jpg",
      rating: 4.2, // Random rating (example)
    },
    {
      name: "Dr Sarah Thompson",
      speciality: "Cardiology",
      schedule: "02.00-04.00 PM",
      img: "https://as1.ftcdn.net/v2/jpg/02/86/79/98/1000_F_286799834_mYXeisNLTRheUHQPyL8EZChYsUzGBe8o.jpg",
      rating: 3.8, // Random rating (example)
    },
    {
      name: "Dr Raj Patel",
      speciality: "Orthopedics",
      schedule: "08.00-10.00 AM",
      img: "https://as2.ftcdn.net/v2/jpg/03/79/23/93/1000_F_379239324_xiwrjOlnle07P4als2eQlppFmR5tB5Jz.jpg",
      rating: 4.5, // Random rating (example)
    },
    {
      name: "Dr Jessica Miller",
      speciality: "Pediatrics",
      schedule: "01.00-03.00 PM",
      img: "https://as1.ftcdn.net/v2/jpg/01/83/60/82/1000_F_183608286_TxukPZH9E0mIaZHndlqVekgddxmGZNYs.jpg",
      rating: 4.0, // Random rating (example)
    },
    {
      name: "Dr Mohamed Ali",
      speciality: "Dentistry",
      schedule: "11.00-01.00 PM",
      img: "https://as1.ftcdn.net/v2/jpg/01/27/26/38/1000_F_127263829_Dj8ZilwUPomjwfSRfK2t6RXymU35Si3W.jpg",
      rating: 4.8, // Random rating (example)
    },
  ];

import DoctorCard from '../Cards/DoctorCard';
const DoctorContainer = () => {
    return (
        <div className=''>
            <ul>
                {DummyDoctorList.map((data, key) => {
                    return (
                        <li key={key}>
                            <DoctorCard
                                name={data.name}
                                schedule={data.schedule}
                                speciality={data.speciality}
                                img={data.img}
                                rating={data.rating}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DoctorContainer;