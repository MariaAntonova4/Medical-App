import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App';
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
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 
  }
  return(
    <>
    <div>
      <h3>Patient Information:</h3>
      <p>{patient.firstName}</p>
      <p>{patient.lastName}</p>
      <p>{patient.EGN}</p>
      {/* <h1>
        Specialization
      </h1>
      <ul>
        {patients.map((patient,idx)=>(
          <li key={idx}>{JSON.stringify(patient)}</li>
        ))}
      </ul> */}
    </div>
    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    </>
  )
}

export default App2;