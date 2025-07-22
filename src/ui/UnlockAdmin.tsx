import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import './App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import Admin from './Admin';

function App() {
  const[inUsername,insertUsername]=useState("");
    const[inPass,insertPass]=useState("");
    const[users,allUsers]=useState<any[]>([]);
useEffect(()=>{
        window.electron.readUser().then(allUsers);
      },[]);
  function connectToAdminWindow() {
    //добави проверка дали въведените данни съвпадат с 
    //базата данни за потребител и ако съвпада да се насочи към админ страницата
users.
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Admin/>
    </StrictMode>
  )
}
  return (
    <>
    <div>
        <h3>Connect to Admin window</h3>
        <form action={connectToAdminWindow}>
            <input type="text" name="inUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="password" name="inPass" onChange={(e)=>insertPass(e.target.value)} />
          <input type="submit" value="Unlock Admin" />
        </form>

       </div>
      
    </>
  )
}

export default App