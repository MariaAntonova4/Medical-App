import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import App from '../App';
import PatientInfo from './PatientInfo';
import ViewAppointment from './ViewDoctorAppointments';

function App2({doctor}:{doctor:any}){
  
  const [searchEGN,search_egn]=useState("");
const [patients,allPatients]=useState<any[]>([]);

function searchPatient(formData: { get: (arg0: string) => any; }){
    const searchEGN=formData.get("searchEGN");
    var pat=patients.find((patient)=>patient.EGN==searchEGN);
    if (patients.find((patient)=>patient.EGN==searchEGN)) {
      pat=patients.find((patient)=>patient.EGN==searchEGN);
    } else {
      alert("This EGN is NOT in the database");
      return;
    }
    return(
       createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PatientInfo patient={pat}/>
  </StrictMode>,
) )
  }

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

  function viewAppointments() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewAppointment doctor={doctor}/>
  </StrictMode>,
) 
  }

  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 
  }
  return(
    <>
    <div>
      <h1>
        Welcome, doctor {doctor.firstName} {doctor.middleName} {doctor.lastName}
      </h1>
    </div>
    <div>
      <form action={searchPatient}>
        <input type="text" name="searchEGN" onChange={(e)=>search_egn(e.target.value)}/>
        <input type="submit" value="Search patient" />
      </form>
    </div>
   
    <div> 
      <p>
      <form action={viewAppointments}>
      <button>View Appointments for today</button>
    </form>
    </p>
      <p>
       <form action={returnApp}>
      <button>Return Home</button>
    </form> 
      </p>
       
    </div>
    </>
  )
}

export default App2;