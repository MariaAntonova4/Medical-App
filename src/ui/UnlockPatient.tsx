import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import './App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import Admin from './PatientWindows/PatientProfile';
import Unlock from "./App";

function App() {
  const[inUsername,insertUsername]=useState("");
  const[inPass,insertPass]=useState("");
  const[users,allUsers]=useState<any[]>([]);
 const [patients,allPatients]=useState<any[]>([]);
  useEffect(()=>{
    window.electron.readUser().then(allUsers);
  },[]);
useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

    function returnApp() {
     createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Unlock />
    </StrictMode>,
  ) 
    }

  function connectToPatientWindow(formData: { get: (arg0: string) => any; }) {
    const getUsername=formData.get("inUsername");
    const getPass=formData.get("inPass");
   
    if (users.find((user)=>user.username===getUsername&&user.pass===getPass&&user.userType===3)) {
      
    var user=users.find((user)=>user.username===getUsername&&user.pass===getPass&&user.userType===3);
    var pat=patients.find((patient)=>patient.idUser===user.idUser);
    createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Admin patient={pat}/>
    </StrictMode>
    )  
    }else if(users.find((user)=>user.username===getUsername&&user.pass===getPass&&user.userType!==3)){
      alert("You don't have permission for Patient account");
      createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Unlock/>
    </StrictMode>
    ) 
    }
    else{
      alert("Wrong data");
    //   createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    //   <Unlock/>
    // </StrictMode>
    // ) 
    }
}
  return (
    <>
    <div>
      <h3>Свързване с пациентскиски прозорец</h3>
      <form action={connectToPatientWindow}>
        Моля въведете потребителско име:
        <input type="text" name="inUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        Моля въведете парола:
        <input type="password" name="inPass" onChange={(e)=>insertPass(e.target.value)} />
        <input type="submit" value="Отвори пациентски прозорец" />
      </form>
    </div>
    <p>
      <form action={returnApp}>
      <button>Връщане в началото</button>
    </form>
    </p>
    </>
  )
}

export default App