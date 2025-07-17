import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import patientLogo from './../assets/patient.png';
import doctorLogo from './../assets/doctor.png';
import './App.css';
import { useData } from './useData.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Doctor from './Doctor'
import Patient from './Patient';
import Admin from './Admin';
function App() {
  function connectToDoctorWindow() {
    //alert('hey');
    //window.electron.createChildWindow();
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
  function connectToAdminWindow() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Admin/>
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
       <div>
        
        <h3>Connect to doctor window</h3>
        <img src={doctorLogo} className="logo" alt="doctor logo" />
        <form action={connectToDoctorWindow}>
      <button>Doctor</button>
      </form>

        <h3>Connect to patient window</h3>
        <img src={patientLogo} className="logo react" alt="patient logo" />
        <form action={connectToPatientWindow}>
          <button>
            Patient
          </button>
        </form>

        <h3>Connect to admin window</h3>
        <form action={connectToAdminWindow}>
          <button>
            Admin
          </button>
        </form>

       </div>
      <Func/>
    </>
  )
}

function Func() {
  const [ime,setIme]=useState("");
  const handleSubmit=(event: { preventDefault: () => void; })=>{
    event.preventDefault();
    <><Fun a="{ime}" /><p>Name : </p></>
    alert(ime);
  }
  return(
    <p></p>
    // <form onSubmit={handleSubmit}>
    //   <input type="text"value={ime}onChange={(e)=>setIme(e.target.value)} />
    //   <input type="submit" />
    // </form>
  );
}
function Fun({a}:{a:string}) {
  return(
    <p>The name is {a}</p>
  );
}

export default App
interface State {
   count: string
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: "h" };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}