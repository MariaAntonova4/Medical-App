import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './../index.css'
import './../App.css';
import App from '../App';
import MakeAppointment from './Patient';
import EditAppointment from "./EditAppointment";
import CancelAppointment from './CancelAppointment';
import { format } from 'date-fns';

function Patient({patient}:{patient:any}){
  
const [specs,setSpecs]=useState<any[]>([]);
const [patients,allPatients]=useState<any[]>([]);
const [searchEGN,search_egn]=useState("");
const [nameSpec,setNameSpec]=useState("");
const [appointments,allAppointments]=useState<any[]>([]);
const[userAppointments,allUserAppointments]=useState<any[]>([]);
const[dateAppointments,allDateAppointments]=useState<any[]>([]);

var todayShow=new Date();
var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');
  
  useEffect(()=>{
    window.electron.readAppointment().then(allAppointments);
  },[]);

  useEffect(()=>{
    window.electron.readUserAppointment(patient.idPatient).then(allUserAppointments);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

   useEffect(()=>{
    window.electron.readDateAppointment(today).then(allDateAppointments);
  },[]);

//0247276798

  const pat=patients.find((patient)=>patient.EGN==patient.EGN);
  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  function searchAppointment() {
    if(userAppointments.find((appointment)=>appointment.status==1)){
      alert("Your appointment is coming soon");
    }
  }

function clearAppointments() {
  if (userAppointments.find((appointment)=>appointment.status==5)) {
      var deleteApp=userAppointments.find((appointment)=>appointment.status==5);
      window.electron.deleteAppointment(deleteApp.idAppointment);
    }
}

function checkYourTurn() {
  var a=0;
  while (a<dateAppointments.length) {
    if (dateAppointments.at(a).idPatient==patient.idPatient) {
      if (a==0||a==1||dateAppointments.at(a-1).status==4||dateAppointments.at(a-1).status==5) {
        alert("Your appointment will be staring soon!");
        return;
      }
    }
    a=a+1;
  }
}

  checkYourTurn();
  //searchAppointment();
  clearAppointments();
  

  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 
  }
   function makeAppointment() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MakeAppointment patient={patient}/>
  </StrictMode>,
) 
  }

  function editAppointment() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditAppointment patient={patient}/>
  </StrictMode>,
) 
  }

   function cancelAppointment() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CancelAppointment patient={patient}/>
  </StrictMode>,
) 
  }

  return(
    <>
    <h1>
      Добре дошли, {patient.firstName} {patient.middleName} {patient.lastName}
    </h1>
     <div>
      <h3>Днескашна дата:</h3> {today}
      <h2>Запазени часове</h2>
      <ul>{userAppointments.map((appointment,idx)=>(
        <li key={idx}>{JSON.stringify(appointment)}</li>
      ))}</ul>
    </div> 
    <h2>
      Първо име:
    </h2>
    {patient.firstName}
    <h2>
      Презиме:
    </h2>
    {patient.middleName}
    <h2>
      Фамилия:
    </h2>
    {patient.lastName}
    <h2>
      Години:
    </h2>
    {patient.age}
    <h2>
      ЕГН:
    </h2>
    {patient.EGN}
    <h2>Пол:</h2>
    {patient.gender}
    <h2>Адрес</h2>
    {patient.address}
    <h2>Телефон</h2>
    {patient.telephone}
    <h2>Потребителски номер</h2>
    {patient.idUser}
    <p>
      <form action={returnApp}>
      <button>Връщане в началото</button>
    </form>
    </p>
    <p>
      <form action={makeAppointment}>
      <button>Запазване на час</button>
    </form>
    </p>
    <p>
      <form action={editAppointment}>
      <button>Редакция на час</button>
    </form>
    </p>
    <p>
    <form action={cancelAppointment}>
      <button>Отмяна на час</button>
    </form>
    </p>
    </>
  )
}

export default Patient;