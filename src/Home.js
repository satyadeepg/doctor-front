import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [doctorNotFound, setDoctorNotFound] = useState(false);

  useEffect(() => {
    axios.get('https://backend-data-7m26.onrender.com/doctors')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctor data:', error);
      });

    axios.get('https://backend-data-7m26.onrender.com/patients')
      .then((response) => {
        setFilteredPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  const handleDoctorSelect = (e) => {
    const selectedDoctor = e.target.value;
    setSelectedDoctor(selectedDoctor);

    const filteredPatientsForDoctor = filteredPatients.filter((patient) => patient.doctor === selectedDoctor);

    if (filteredPatientsForDoctor.length === 0) {
      // No patients found for the selected doctor
      setDoctorNotFound(true);
    } else {
      setDoctorNotFound(false);
    }

    setFilteredPatients(filteredPatientsForDoctor);
  };

  return (
    <div className="App">
      <h1>Home</h1>
      <div>
        <label htmlFor="doctorDropdown">Select a Doctor: </label>
        <select id="doctorDropdown" onChange={handleDoctorSelect}>
          <option value="">All Doctors</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>
      {doctorNotFound ? (
        <p>No patients found for the selected doctor.</p>
      ) : (
        <div>
          <h2>Patient List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.weight}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.age}</td>
                  <td>{patient.disease}</td>
                  <td>{patient.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
