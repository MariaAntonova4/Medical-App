import React from 'react';
import './index.css'
import './App.css';
import AddLogo from './../../src/assets/add3.png';
import EditLogo from './../../src/assets/edit.png';
import RemoveLogo from "./../../src/assets/Remove3.png";

function Admin(){
  return(
    <>
     <h1>Welcome Admin!</h1>
     <p>Please choose action from the menu if you want to:</p>

  <div className='homepage'>
        <div style={{ display: 'flex', gap: '200px' }}>
        <h2>Add in database</h2>
        <h2>Edit the database</h2>
        <h2>Remove from the database</h2>
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