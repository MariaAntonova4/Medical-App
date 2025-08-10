import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App';

function App2(){
  const [specs,setSpecs]=useState<any[]>([]);
  const [patients,allPatients]=useState<any[]>([]);
  const [searchEGN,search_egn]=useState("");

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

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
        Specialization
      </h1>
      <ul>
        {patients.map((patient,idx)=>(
          <li key={idx}>{JSON.stringify(patient)}</li>
        ))}
      </ul>
    </div>

    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    </>
  )
}

export default App2;