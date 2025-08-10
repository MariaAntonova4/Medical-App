import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App';
import PatientInfo from './PatientInfo';

function App2(){
  const [aSpecName,setASpecName]=useState("");
  const [idSpec,setIdSpec]=useState("");
  const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);
  
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
    window.electron.readSpec().then(setSpecs);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

  function addSpec(formData: { get: (arg0: string) => any; }) {
      const addSpecName = formData.get("addSpecName");
      window.electron.getSpec(addSpecName);
    }
  
    function updateSpec(formData: { get: (arg0: string) => any; }) {
      const idSpec=formData.get("idSpec");
      const specname=formData.get("specname");
      window.electron.updateSpec(idSpec,specname);
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
      <form action={searchPatient}>
        <input type="text" name="searchEGN" onChange={(e)=>search_egn(e.target.value)}/>
        <input type="submit" value="Search patient" />
      </form>
    </div>
    <div>
      <h1>
        Specialization
      </h1>
      <ul>
        {specs.map((spec,idx)=>(
          <li key={idx}>{JSON.stringify(spec)}</li>
        ))}
      </ul>
    </div>
    <div>
        <form action={addSpec}>
      <input type="text"name="addSpecName"onChange={(e)=>setASpecName(e.target.value)} />
      <input type="submit" value="Add Specialization"/>
    </form>
    <form action={updateSpec}>
      <input type="number" name="idSpec" onChange={(e)=>setIdSpec(e.target.value)}/>
      <input type="text"name="specname"onChange={(e)=>setNameSpec(e.target.value)} />
      <input type="submit" value="Update Specialization"/>
    </form>
    </div>
    <p>Child</p>
    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    </>
  )
}

export default App2;