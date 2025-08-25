import React from 'react';
import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function DeletePatient(){
const[delIdPatient,deleteIdPatient]=useState("");

const[patients,allPatients]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readPatient().then(allPatients);
},[]);

  function deletePatient(formData: { get: (arg0: string) => any; }) {
    const delidpatient=formData.get("delIdPatient");
    
    window.electron.deletePatient(delidpatient);
  }

  return(
    <>
     <div>
      <h1>Patients</h1>
      <ul>{patients.map((patient,idx)=>(
        <li key={idx}>{JSON.stringify(patient)}</li>
      ))}</ul>
    </div>     

    <form action={deletePatient}>
        Please write the ID of the appointment you want to cancel: 
        <input type="number" name="delIdPatient" onChange={(e)=>deleteIdPatient(e.target.value)}/>
        <input type="submit" value="Delete Patient" />
    </form>
    </>
  )
}

export default DeletePatient;