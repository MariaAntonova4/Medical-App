import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import './App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import Admin from './Admin';
import Unlock from "./App";

function App() {
  const[inUsername,insertUsername]=useState("");
  const[inPass,insertPass]=useState("");
  const[users,allUsers]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readUser().then(allUsers);
  },[]);

  function connectToDocWindow(formData: { get: (arg0: string) => any; }) {
    const getUsername=formData.get("inUsername");
    const getPass=formData.get("inPass");

    if (users.find((user)=>user.username===getUsername&&user.pass===getPass&&user.userType===2)) {
    createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Admin/>
    </StrictMode>
    )  
    }else if(users.find((user)=>user.username===getUsername&&user.pass===getPass&&user.userType!==2)){
      alert("You don't have permission for Doctor account");
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
      <h3>Connect to Doctor window</h3>
      <form action={connectToDocWindow}>
        <input type="text" name="inUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="password" name="inPass" onChange={(e)=>insertPass(e.target.value)} />
        <input type="submit" value="Unlock Doctor" />
      </form>
    </div>
      
    </>
  )
}

export default App