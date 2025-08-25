import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import PatientProfile from './PatientProfile';
import { format } from 'date-fns';

function CancelAppointment({patient}:{patient:any}){
  const[deleteidAppointment,deleteIdAppointment]=useState("");

const[appointments,allAppointments]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readUserAppointment(patient.idPatient).then(allAppointments);
},[]);

  function deleteAppointment(formData: { get: (arg0: string) => any; }) {
    const delidAppointment=formData.get("deleteidAppointment");
    
    window.electron.deleteAppointment(delidAppointment);
  }

  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PatientProfile patient={patient} />
  </StrictMode>,
) 
  }

  return(
    <>
     <div>
      <h1>Appointments</h1>
      <ul>{appointments.map((appointment,idx)=>(
        <li key={idx}>{JSON.stringify(appointment)}</li>
      ))}</ul>
    </div>     

    <form action={deleteAppointment}>
        Please write the ID of the appointment you want to cancel: 
        <input type="number" name="deleteidAppointment" onChange={(e)=>deleteIdAppointment(e.target.value)}/>
        <input type="submit" value="Cancel Appointment" />
    </form>
    

  
<p>
    <form action={returnApp}>
      <button>Return</button>
    </form></p>
    </>
  )
}

export default CancelAppointment;