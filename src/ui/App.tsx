import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import patientLogo from './../assets/patient.png';
import doctorLogo from './../assets/doctor.png';
import './App.css';
import { useData } from './useData.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Doctor from './UnlockDoc'
import Patient from './UnlockPatient';
import Admin from './UnlockAdmin';
import Dev from './Admin';

function App() {
  function connectToDoctorWindow() {
    createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Doctor />
  </StrictMode>,
)
  }
  function connectToPatientWindow() {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
      <Patient/>
      </StrictMode>
    )
  }
  return (
    <>
    {/* <div>
      <button onClick={()=>{}}>See name</button>
        <a href="https://vite.dev" target="_blank">
          
        </a>
        <a href="https://react.dev" target="_blank">
          
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>     */}
      <div className='homepage'>
        <div style={{ display: 'flex', gap: '170px' }}>
      <h2> Connect to doctor window   
</h2><h2>
        Connect to patient window
      </h2></div>
       <div style={{ display: 'flex', gap: '350px' }}>
      <img src={doctorLogo} className="logo" alt="doctor logo" />
      <img src={patientLogo} className="logo react" alt="patient logo" /></div>
      <div style={{ display: 'flex', gap: '400px' }}>
      <form action={connectToDoctorWindow}>
      <button>Doctor</button></form> 
      <form action={connectToPatientWindow}>
          <button>
            Patient
          </button>
      </form></div></div>
    </>
  )
}

export default App