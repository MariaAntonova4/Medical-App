import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import App from '../App';
import { format } from 'date-fns';

function App2({patient}:{patient:any}){
  const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);
  const [patients,allPatients]=useState<any[]>([]);
  const [searchEGN,search_egn]=useState("");
  const [appointments,allAppointments]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readAppointment().then(allAppointments);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);
//0247276798

  const pat=patients.find((patient)=>patient.EGN==patient.EGN);

  var todayShow=new Date();
  var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');

  const updateAppointment=appointments.find((appointment)=>appointment.date==today&&appointment.idPatient==pat.idPatient);
  if (appointments.find((appointment)=>appointment.date==today&&appointment.idPatient==pat.idPatient)) {
    window.electron.updateAppointment(updateAppointment.idAppointment,updateAppointment.doc_cli,4,updateAppointment.time,updateAppointment.date,updateAppointment.ty_pur,updateAppointment.idPatient);
  }
  
  function returnApp() {
  const updateAppointment=appointments.find((appointment)=>appointment.date==today&&appointment.idPatient==pat.idPatient);
  if (appointments.find((appointment)=>appointment.date==today&&appointment.idPatient==pat.idPatient)) {
    window.electron.updateAppointment(updateAppointment.idAppointment,updateAppointment.doc_cli,5,updateAppointment.time,updateAppointment.date,updateAppointment.ty_pur,updateAppointment.idPatient);
  }
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
    </div>
    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    </>
  )
}

export default App2;