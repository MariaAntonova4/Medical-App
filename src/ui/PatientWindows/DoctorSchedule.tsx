import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import { format } from 'date-fns';

function DcotorSchedule({doctor}:{doctor:any}){

const[schedules,allSchedules]=useState<any[]>([]);
const [doc,date]=doctor;
  useEffect(()=>{
    window.electron.readDoctorDateSchedule(doc,date).then(allSchedules);
  },[]);

  return(
    <>
<div>
      <h1>Schedules</h1>
      <ul>{schedules.map((schedule,idx)=>(
        <li key={idx}>{JSON.stringify(schedule)}</li>
      ))}</ul>
    </div>
    </>
  )
}

export default DcotorSchedule;