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
        Добре дошли, доктор {doctor.firstName} {doctor.middleName} {doctor.lastName}
      </h1>
    </div>
    <div>
      <form action={searchPatient}>
        Моля въведете ЕГНто на пациента, който търсите:
        <input type="text" name="searchEGN" onChange={(e)=>search_egn(e.target.value)}/>
        <input type="submit" value="Потърси пациент" />
      </form>
    </div>
   
    <div> 
      <p>
      <form action={viewAppointments}>
      <button>Преглед на запазени часове за деня</button>
    </form>
    </p>
      <p>
       <form action={returnApp}>
      <button>Връщане в началото</button>
    </form> 
      </p>
       
    </div>
    </>
  )
}

export default App2;