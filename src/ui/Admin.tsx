import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App';

function Admin(){

  const [aSpecName,setASpecName]=useState("");
  const [idSpec,setIdSpec]=useState("");
  const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);

  const[insertClinicName,setAClinicName]=useState("");
  const[insertClinicAddress,setAClinicAddress]=useState("");
  const[idClinic,setIdClinic]=useState("");
  const[updateClinicName,updateClinicNameF]=useState("");
  const[updateClinicAddress,updateClinicAddressF]=useState("");
  const[clinics,allClinics]=useState<any[]>([]);

  const[inTypeUser,insertTypeUser]=useState("");
  const[allTypesOfUsers,typesOfUsers]=useState<any[]>([]);

  const[inUsername,insertUsername]=useState("");
  const[inPass,insertPass]=useState("");
  const[inTypeOfUser,insertTypeU]=useState("");
  const[users,allUsers]=useState<any[]>([]);

  const[inFirstPName,insertFirstPName]=useState("");
  const[inMiddlePName,insertMiddlePName]=useState("");
  const[inLastPName,insertLastPName]=useState("");

  useEffect(()=>{
    window.electron.readUser().then(allUsers);
  },[]);

  useEffect(()=>{
    window.electron.readTypeOfUser().then(typesOfUsers);
  },[]);

  useEffect(()=>{
    window.electron.readClinic().then(allClinics);
  },[]);

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  function insert_User(formData: { get: (arg0: string) => any; }) {
    const addUsername=formData.get("inUsername");
    const addPass=formData.get("inPass");
    const addTypeU=formData.get("inTypeOfUser");
    window.electron.insert_User(addUsername,addPass,addTypeU);
  }

function update_User(formData: { get: (arg0: string) => any; }) {
    const upIdUser=formData.get("upIdUser");
    const upUsername=formData.get("upUsername");
    const upPass=formData.get("upPass");
    const upTypeU=formData.get("upTypeOfUser");
    window.electron.update_User(upIdUser,upUsername,upPass,upTypeU);
  }

  function insertTypeOfUser(formData: { get: (arg0: string) => any; }) {
    const addTypeUser=formData.get("inTypeUser");

    window.electron.insertTypeOfUser(addTypeUser);
  }
    function insertClinic(formData: { get: (arg0: string) => any; }) {
        const addClinicName=formData.get("insertClinicName");
        const addClinicAddress=formData.get("insertClinicAddress");

        window.electron.insertClinic(addClinicName,addClinicAddress);
    }

    function updateClinic(formData: { get: (arg0: string) => any; }) {
        const idClinic=formData.get("idClinic");
        const clinicName=formData.get("updateClinicName");
        const clinicAddress=formData.get("updateClinicAddress");

        window.electron.updateClinic(idClinic,updateClinicName,updateClinicAddress);
    }

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
      <h1>Users</h1>
      <ul>{users.map((user,idx)=>(
        <li key={idx}>{JSON.stringify(user)}</li>
      ))}</ul>
    </div>

    <div>
      <h1>Types Of Users</h1>
      <ul>{allTypesOfUsers.map((typeOfUser,idx)=>(
        <li key={idx}>{JSON.stringify(typeOfUser)}</li>
      ))}</ul>
    </div>

    <div>
        <h1>Clinics</h1>
        <ul>
            {clinics.map((clinic,idx)=>(
                <li key={idx}>{JSON.stringify(clinic)}</li>
            ))}
        </ul>
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
      <form action={insert_User}>
        <input type="text" name="inUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="password" name="inPass" onChange={(e)=>insertPass(e.target.value)} />
        <select name="inTypeOfUser">
          {allTypesOfUsers.map((tyUser)=>(
            <option key={tyUser.idTypeUser} value={tyUser.idTypeUser}>
              {tyUser.typeUserName}
            </option>
          ))}
        </select>
        {/* <script>
    var text = JSON.stringify({allTypesOfUsers}, function (key, value) {
      if (value) {
        {<option value={value}></option>}
      }
        
    });</script> */}
        {/* <select name="" id="">{allTypesOfUsers.map((typeOfUser,idx)=>(
          <option value={typeOfUser}key={idx}>{JSON.stringify(typeOfUser)}</option>))}
        </select> */}
        <input type="submit" value="Insert User" />
      </form>
    </div>

<div>
      <form action={update_User}>
        <input type="number" name="upIdUser"/>
        <input type="text" name="upUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="password" name="upPass" onChange={(e)=>insertPass(e.target.value)} />
        <select name="upTypeOfUser">
          {allTypesOfUsers.map((tyUser)=>(
            <option key={tyUser.idTypeUser} value={tyUser.idTypeUser}>
              {tyUser.typeUserName}
            </option>
          ))}
        </select>
        <input type="submit" value="Update User" />
      </form>
    </div>

    <div>
      <form action={insertTypeOfUser}>
        <input type="text" name="inTypeUser" onChange={(e)=>insertTypeUser(e.target.value)} />
        <input type="submit" value="Insert Type Of User" />
      </form>
    </div>

    <div>
        <form action={insertClinic}>
            <input type="text" name="insertClinicName" onChange={(e)=>setAClinicName(e.target.value)} />
            <input type="text" name="insertClinicAddress" onChange={(e)=>setAClinicAddress(e.target.value)} />
            <input type="submit" value="Insert Clinic" />
        </form>

        <form action={updateClinic}>
            <input type="number" name="idClinic" onChange={(e)=>setIdClinic(e.target.value)}/>
            <input type="text" name="updateClinicName" onChange={(e)=>updateClinicNameF(e.target.value)} />
            <input type="text" name="updateClinicAddress" onChange={(e)=>updateClinicAddressF(e.target.value)} />
            <input type="submit" value="Update Clinic" />
        </form>
    </div>

    <div>
        <form action={addSpec}>
      <input type="text"name="addSpecName"onChange={(e)=>setASpecName(e.target.value)} />
      <input type="submit" value="Insert specialization"/>
    </form>
    <form action={updateSpec}>
      <input type="number" name="idSpec" onChange={(e)=>setIdSpec(e.target.value)}/>
      <input type="text"name="specname"onChange={(e)=>setNameSpec(e.target.value)} />
      <input type="submit" value="Update specialization"/>
    </form>
    </div>

    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    </>
  )
}

export default Admin;