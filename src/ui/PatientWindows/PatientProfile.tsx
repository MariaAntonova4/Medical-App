import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import App from '../App';
import MakeAppointment from './Patient';

function Patient({patient}:{patient:any}){
  
const [specs,setSpecs]=useState<any[]>([]);
const [patients,allPatients]=useState<any[]>([]);
const [searchEGN,search_egn]=useState("");
const [nameSpec,setNameSpec]=useState("");
const [appointments,allAppointments]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readAppointment().then(allAppointments);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);
//0247276798

  const pat=patients.find((patient)=>patient.EGN==patient.EGN);
  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 
  }
   function makeAppointment() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MakeAppointment patient={patient}/>
  </StrictMode>,
) 
  }
  return(
    <>
    <h1>
      Patient Information:
    </h1>
    <h2>
      First Name:
    </h2>
    {patient.firstName}
    <h2>
      Middle Name:
    </h2>
    {patient.middleName}
    <h2>
      Last Name:
    </h2>
    {patient.lastName}
    <h2>
      Age:
    </h2>
    {patient.age}
    <h2>
      EGN
    </h2>
    {patient.EGN}
    <h2>Gender:</h2>
    {patient.gender}
    <h2>Address</h2>
    {patient.address}
    <h2>Telephone</h2>
    {patient.telephone}
    <h2>User</h2>
    {patient.idUser}
    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    <form action={makeAppointment}>
      <button>Make Appointment</button>
    </form>
    </>
  )
}

export default Patient;