import React from 'react';
import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function DeleteClinic(){
const[delIdClinic,deleteIdClinic]=useState("");

const[clinics,allClinics]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readClinic().then(allClinics);
},[]);

  function deleteClinic(formData: { get: (arg0: string) => any; }) {
    const delidclinic=formData.get("delIdClinic");
    
    window.electron.deleteClinic(delidclinic);
  }

  return(
    <>
     <div>
      <h1>Clinics</h1>
      <ul>{clinics.map((clinic,idx)=>(
        <li key={idx}>{JSON.stringify(clinic)}</li>
      ))}</ul>
    </div>     

    <form action={deleteClinic}>
        Please write the ID of the appointment you want to cancel: 
        <input type="number" name="delIdClinic" onChange={(e)=>deleteIdClinic(e.target.value)}/>
        <input type="submit" value="Delete Clinic" />
    </form>
    </>
  )
}

export default DeleteClinic;