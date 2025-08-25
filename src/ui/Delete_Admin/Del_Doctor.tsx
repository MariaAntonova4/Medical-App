import React from 'react';
import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function DeleteDoctor(){
const[delIdDoctor,deleteIdDoctor]=useState("");

const[doctors,allDoctors]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readDoctor().then(allDoctors);
},[]);

  function deleteDoctor(formData: { get: (arg0: string) => any; }) {
    const deliddoctor=formData.get("delIdDoctor");
    
    window.electron.deleteDoctor(deliddoctor);
  }

  return(
    <>
     <div>
      <h1>Doctors</h1>
      <ul>{doctors.map((doctor,idx)=>(
        <li key={idx}>{JSON.stringify(doctor)}</li>
      ))}</ul>
    </div>     

    <form action={deleteDoctor}>
        Please write the ID of the appointment you want to cancel: 
        <input type="number" name="delIdDoctor" onChange={(e)=>deleteIdDoctor(e.target.value)}/>
        <input type="submit" value="Delete Doctor" />
    </form>
    </>
  )
}

export default DeleteDoctor;