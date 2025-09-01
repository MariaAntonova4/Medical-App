import React from 'react';
import './index.css'
import './App.css';
import AddLogo from './../../src/assets/add3.png';
import EditLogo from './../../src/assets/edit.png';
import RemoveLogo from "./../../src/assets/Remove3.png";

function Admin(){
  return(
    <>
     <h1>Добре дошли!</h1>
     <p>Моля изберете от менюто действие:</p>

  <div className='homepage'>
        <div style={{ display: 'flex', gap: '200px' }}>
        <h2>Добавяне в база данни</h2>
        <h2>Редактиране в база данни</h2>
        <h2>Изтриване нот база данни</h2>
        </div>
    <div style={{ display: 'flex', gap: '290px' }}>
      <img src={AddLogo} className="logo" alt="add logo" />
      <img src={EditLogo} className="logo" alt="edit logo" />
      <img src={RemoveLogo} className="logo" alt="remove logo" />
    </div>
  </div>
    </>
  )
}

export default Admin;