import React, { useEffect, useMemo, useState,memo,useReducer, StrictMode } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createRoot } from 'react-dom/client';
import Home from './App';

function App() {
  const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);

const[schedules,allSchedules]=useState<any[]>([]);

const[ty_purSchedules,allTy_PurSchedules]=useState<any[]>([]);

const[doctorsSchedules,allDoctorSchedules]=useState<any[]>([]);

const[type_purposes,allType_Purpose]=useState<any[]>([]);

const[inDoc_Cli,insertDoc_cli]=useState("");
const[inStat,insertStat]=useState(""); 
const[inTime,insertTime]=useState("");
const[inDate,insertDate]=useState("");
const[inTy_Pur,insertTy_Pur]=useState("");
const[inIdPatient,insertIdPatient]=useState("");
const[appointments,allAppointments]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readDoc_Clinic().then(allDoc_Clinics);
  },[]);

  useEffect(()=>{
    window.electron.readType_Purpose().then(allType_Purpose);
  },[]);

    useEffect(()=>{
    window.electron.readSchedule().then(allSchedules);
  },[]);

   useEffect(()=>{
    window.electron.readTy_PurSchedule().then(allTy_PurSchedules);
  },[]);

     useEffect(()=>{
    window.electron.readDoctorSchedule().then(allDoctorSchedules);
  },[]);

    function insertAppointment(formData: { get: (arg0: string) => any; }){
    const addDoc_cli=formData.get("inDoc_Cli");
    const addStatus=formData.get("inStat");
    const addTime=formData.get("inTime");
    const addDate=formData.get("inDate");
    const addTy_pur=formData.get("inTy_Pur");
    const addIdPatient=formData.get("inIdPatient");
    //addStatus  addIdPatient 
    alert ("Before Type");
    if (type_purposes.find((type_purpose)=>type_purpose.idType_Purpose==addTy_pur)) {
      const ty_purNumber=type_purposes.find((type_purpose)=>type_purpose.idType_Purpose==addTy_pur);
      let durationChecker=0;
      alert("You passed the type");
    if (schedules.find((schedule)=>schedule.date==addDate&&schedule.doctor_clinic==addDoc_cli&&schedule.idType==ty_purNumber.idType)) {
      const sch=schedules.find((schedule)=>schedule.doctor_clinic==addDoc_cli);
      alert(sch.finishTime);
      alert(addTime);
      var numberTime=parseFloat(addTime);
      var minutes=new Date(numberTime);
      alert(minutes.getTime());
      if (addTime>sch.beginningTime&&addTime<sch.finishTime) {
        while (durationChecker<ty_purNumber.duration) {
          
          if (schedules.find((schedule)=>schedule.beginningTime==addTime+durationChecker||schedule.finishTime==addTime+durationChecker)) {
            return;
          }

          // durationChecker=durationChecker+5;
          minutes.setHours(9,5);
          alert(minutes.getTime());
        }
        alert("Adding in database");
        //window.electron.insertAppointment(addDoc_cli,1,addTime,addDate,addTy_pur,1);
      }
    }} 
  }

  function connectToHome() {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Home/>
      </StrictMode>
    )
  }
  return (
    <>
    {/*doctor., doctor.middleName, doctor.lastName, schedule.idStage, schedule.doctor_clinic,schedule.idType, type_purpose.idPurpose,type.typeName,purpose.purposeName FROM schedule INNER JOIN type_purpose ON schedule.idType=type_purpose.idType INNER JOIN Doc_Clinic ON schedule.doctor_clinic=Doc_Clinic.idDoc_Clinic INNER JOIN clinic ON Doc_Clinic.idClinic_D_C=clinic.idClinic INNER JOIN doctor ON Doc_Clinic.idDoc_D_C=doctor.idDoc INNER JOIN type ON type_purpose.idType=type.idType INNER JOIN purpose ON type_purpose.idPurpose=purpose.idPurpose INNER JOIN stage ON type_purpose.idStage=stage.idStage",[],(err,data)=>{ */}

        <div>
      <form action={insertAppointment}>
         <select name="inDoc_Cli">
          {doctorsSchedules.map((schedule)=>(
            <option key={schedule.doctor_clinic} value={schedule.doctor_clinic}>
              {schedule.firstName} {schedule.middleName} {schedule.lastName}
            </option>
          ))}
        </select>
        <input type="time" value={time} name="inTime" onChange={(e)=>insertTime(e.target.value)}/>
        <input type="date" name="inDate" onChange={(e)=>insertDate(e.target.value)}/>
        <select name="inTy_Pur">
          {ty_purSchedules.map((schedule)=>(
            <option key={schedule.idType_Purpose} value={schedule.idType_Purpose}>
              {schedule.typeName} - {schedule.purposeName}
            </option>
          ))}
        </select>
        <input type="submit" value="InsertAppointment" />
      </form>
    </div>
      <div className="card">
       <h1>Copy!</h1>
      </div>
      <div>
        <form action={connectToHome}>
          <button>
            Home
          </button>
        </form>
      </div>
    </>
  )
}

export default App