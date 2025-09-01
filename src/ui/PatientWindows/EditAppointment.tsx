import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import PatientProfile from './PatientProfile';
import { format } from 'date-fns';

function EditAppointment({patient}:{patient:any}){
  const[upIdAppointment,updateIdAppointment]=useState("");
  const[upDoc_Cl,updateDoc_Cl]=useState("");
  const[upTime,updateTime]=useState("");
  const[upDate,updateDate]=useState("");
  const[upTy_Pur,updateTy_Pur]=useState("");
  const[ty_purSchedules,allTy_PurSchedules]=useState<any[]>([]);
  const[doctorsSchedules,allDoctorSchedules]=useState<any[]>([]);

const[appointments,allAppointments]=useState<any[]>([]);

 useEffect(()=>{
    window.electron.readDoctorSchedule().then(allDoctorSchedules);
  },[]);

 useEffect(()=>{
    window.electron.readTy_PurSchedule().then(allTy_PurSchedules);
  },[]);

    useEffect(()=>{
    window.electron.readUserAppointment(patient.idPatient).then(allAppointments);
  },[]);


  function updateAppointment(formData: { get: (arg0: string) => any; }) {
    const updaIdAppointment=formData.get("upIdAppointment");
    const updaDoc_Cl=formData.get("upDoc_Cl");
    const updaTime=formData.get("upTime");
    const updaDate=formData.get("upDate");
    const updaTy_Pur=formData.get("upTy_Pur");
    
    window.electron.updateAppointment(updaIdAppointment,updaDoc_Cl,1,updaTime,updaDate,updaTy_Pur,patient.idPatient);
  }

  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PatientProfile patient={patient} />
  </StrictMode>,
) 
  }

  function openChildWindow() {
      window.electron.createChildWindow();
  }

  return(
    <>
<div>
      <h1>Запазени часове</h1>
      <ul>{appointments.map((appointment,idx)=>(
        <li key={idx}>{JSON.stringify(appointment)}</li>
      ))}</ul>
    </div>     

        <form action={updateAppointment}>
          Моля въведете номера на запазения час, който желаете да редактирате:
            <input type="number" name="upIdAppointment" onChange={(e)=>updateIdAppointment(e.target.value)}/>
            Моля избирете лекар и клиника:
            <select name="upDoc_Cl">
          {doctorsSchedules.map((schedule)=>(
            <option key={schedule.doctor_clinic} value={schedule.doctor_clinic}>
              {schedule.firstName} {schedule.middleName} {schedule.lastName} - {schedule.nameOfClinic} ({schedule.cabinet})
            </option>
          ))}
        </select>  
        Моля изберете час:
        <input type="time" name="upTime" onChange={(e)=>updateTime(e.target.value)} />
        Моля изберете дата:
        <input type="date" name="upDate" onChange={(e)=>updateDate(e.target.value)} />
        Моля изберете тип и причина:
            <select name="upTy_Pur">
          {ty_purSchedules.map((schedule)=>(
            <option key={schedule.idType_Purpose} value={schedule.idType_Purpose}>
              {schedule.typeName} - {schedule.purposeName}
            </option>
          ))}
        </select>
            <input type="submit" value="Редактирайте запазения час" />
        </form>

     <div>
        <p>
         <form action={openChildWindow}>
          <button>
            Покажете график на избран лекар
          </button>
        </form> 
        </p>
      </div>
  
<p>
    <form action={returnApp}>
      <button>Връщане назад</button>
    </form></p>
    </>
  )
}

export default EditAppointment;