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
      <h1>Доктори</h1>
      <ul>{doctors.map((doctor,idx)=>(
        <li key={idx}>{JSON.stringify(doctor)}</li>
      ))}</ul>
    </div>     

    <form action={deleteDoctor}>
        Моля въведете номера на лекаря, който желаете да премахнете:
        <input type="number" name="delIdDoctor" onChange={(e)=>deleteIdDoctor(e.target.value)}/>
        <input type="submit" value="Премахване на лекар" />
    </form>
    </>
  )
}

export default DeleteDoctor;