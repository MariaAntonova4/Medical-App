import React, { useEffect, useMemo, useState,memo,useReducer, StrictMode } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './../App.css';
import { createRoot } from 'react-dom/client';
import Home from './PatientProfile';
import { format } from 'date-fns';

function App({patient}:{patient:any}) {

const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);

const[schedules,allSchedules]=useState<any[]>([]);

const[ty_purSchedules,allTy_PurSchedules]=useState<any[]>([]);

const[doctorsSchedules,allDoctorSchedules]=useState<any[]>([]);

const[type_purposes,allType_Purpose]=useState<any[]>([]);

const[purposes,allPurposes]=useState<any[]>([]);

const[types,allTypes]=useState<any[]>([]);

var[madeAppointments,allMadeAppointments]=useState<any[]>([]);

const[inDoc_Cli,insertDoc_cli]=useState("");
const[inStat,insertStat]=useState(""); 
const[inTime,insertTime]=useState("");
const[inDate,insertDate]=useState("");
const[inTy_Pur,insertTy_Pur]=useState("");
const[inIdPatient,insertIdPatient]=useState("");
const[appointments,allAppointments]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readAppointment().then(allAppointments);
  },[]);

useEffect(()=>{
    window.electron.readDoc_Clinic().then(allDoc_Clinics);
  },[]);

  useEffect(()=>{
    window.electron.readType_Purpose().then(allType_Purpose);
  },[]);

useEffect(()=>{
    window.electron.readPurpose().then(allPurposes);
  },[]);

  useEffect(()=>{
    window.electron.readType().then(allTypes);
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

  function checkAppointment(doc_cli:number,time:string,date:string){
    alert("Function"); 
    var todayShow=new Date(date);
    var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');

    var res=window.electron.readMakeAppointment(doc_cli,time,today).then((result)=>allMadeAppointments(result));
   
    alert(res);
    alert(madeAppointments);
    return madeAppointments;
  }
    function insertAppointment(formData: { get: (arg0: string) => any; }){
    const addDoc_cli=formData.get("inDoc_Cli");
    const addStatus=formData.get("inStat");
    const addTime=formData.get("inTime");
    const addDate=formData.get("inDate");
    const addTy_pur=formData.get("inTy_Pur");
    const addIdPatient=formData.get("inIdPatient");
    const addPurpose=formData.get("inPur");

    if (type_purposes.find((type_purpose)=>type_purpose.idType==addTy_pur&&type_purpose.idPurpose==addPurpose)) {
      const ty_purNumber=type_purposes.find((type_purpose)=>type_purpose.idType==addTy_pur&&type_purpose.idPurpose==addPurpose);
      let durationChecker=0;

    if (schedules.find((schedule)=>schedule.date==addDate&&schedule.doctor_clinic==addDoc_cli&&schedule.idType==ty_purNumber.idType)) {
      const sch=schedules.find((schedule)=>schedule.date==addDate&&schedule.doctor_clinic==addDoc_cli&&schedule.idType==ty_purNumber.idType);
      
      if (addTime>sch.beginningTime&&addTime<sch.finishTime) {
        while (durationChecker<=ty_purNumber.duration) {
        var [hours, minutes] = addTime.split(':').map(Number);
          var date = new Date();
          var endOfAppointment=new Date();
          date.setHours(hours);
          date.setMinutes(minutes + durationChecker); // Add 5 minutes
          endOfAppointment.setHours(hours);
          endOfAppointment.setMinutes(minutes+ty_purNumber.duration);
          // Format back to HH:mm
          var newHours = String(date.getHours()).padStart(2, '0');
          var newMinutes = String(date.getMinutes()).padStart(2, '0');
          const addNewTime=newHours+":"+newMinutes;
          // checkAppointment(addDoc_cli,addNewTime,addDate)
          // if (madeAppointments.find((madeAppointment)=>madeAppointment.idAppointment!=null)) {
          //   alert("There alredy is an appointment!");
          //   return;
          // }appointment.time!=endOfAppointment
           if (appointments.find((appointment)=>appointment.time==addNewTime&&appointment.date==addDate&&appointment.doc_cli==addDoc_cli)) {
            // const app=appointments.find((appointment)=>appointment.time<addNewTime&&appointment.date==addDate&&appointment.doc_cli==addDoc_cli);
            // alert(app.time+" addNewTime: "+addNewTime+" app.date: "+app.date+" addDate: "+addDate+" app.doc_cli: "+app.doc_cli+" addDoc_cli: "+addDoc_cli);  
            alert("There alredy is an appointment!");
              return;
              }

          if (sch.beginningTime>=addNewTime||sch.finishTime<=addNewTime) {
            alert("Please choose another time");
            return;
          }
          durationChecker=durationChecker+5;
        }
        //alert("Add in database");
        window.electron.insertAppointment(addDoc_cli,1,addTime,addDate,addTy_pur,patient.idPatient);
      }else{
        alert("The time that you have chosen is before or after the scheduled time");
      }
    }
    else{
      alert("This doctor does not have a schedule for this day");
    }
  } 
    else{
      alert("The type or the purpose is not in the database");
    }
  }

  function openChildWindow() {
      window.electron.createChildWindow();
  }


  function connectToHome() {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Home patient={patient}/>
      </StrictMode>
    )
  }
  return (
    <>
    <div>
      <h3>Запазете час:</h3>
      <form action={insertAppointment}>
        Моля избирите лекар и клиника:
         <select name="inDoc_Cli">
          {doctorsSchedules.map((schedule)=>(
            <option key={schedule.doctor_clinic} value={schedule.doctor_clinic}>
              {schedule.firstName} {schedule.middleName} {schedule.lastName} - {schedule.nameOfClinic} ({schedule.cabinet})
            </option>
          ))}
        </select>
        Моля изберете час:
        <input type="time" name="inTime" onChange={(e)=>insertTime(e.target.value)}/>
        Моля изберете дата:
        <input type="date" name="inDate" onChange={(e)=>insertDate(e.target.value)}/>
        Моля изберете тип:
        <select name="inTy_Pur">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select>
        Моля изберете причина:
        <select name="inPur">
          {purposes.map((purpose)=>(
            <option key={purpose.idPurpose} value={purpose.idPurpose}>
             {purpose.purposeName}
            </option>
          ))}
        </select>
        <input type="submit" value="Запазване на час" />
      </form>
    </div>
      <div>
        <p>
         <form action={connectToHome}>
          <button>
            Връщане назад
          </button>
        </form> 
        </p>
      </div>
      <div>
        <p>
         <form action={openChildWindow}>
          <button>
            Показване на график на избарн лекар
          </button>
        </form> 
        </p>
      </div>
    </>
  )
}

export default App