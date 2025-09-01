import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';
import { createRoot } from 'react-dom/client'
import Doctor from './Doctor';
import { format } from 'date-fns';

function ViewAppointment({doctor}:{doctor:any}){
    //alert(doctor.firstName);
const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);
  const [patients,allPatients]=useState<any[]>([]);
  const [searchEGN,search_egn]=useState("");
  const [doctorAppointments,allDoctorAppointments]=useState<any[]>([]);
  const [dateAppointments,allDateAppointments]=useState<any[]>([]);
  const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);
  const[doctorDoc_Clinics,allDoctorDoc_Clinics]=useState<any[]>([]);
    var todayShow=new Date();
    var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');

    useEffect(()=>{
        window.electron.readDoc_Clinic().then(allDoc_Clinics);
      },[]);
    
    useEffect(()=>{
        window.electron.readDoctorDoc_Clinic(3).then((result)=>allDoctorDoc_Clinics(result));
      },[]);

    useEffect(()=>{
     window.electron.readDateAppointment(today).then((result)=>allDateAppointments(result));
    },[]);

  useEffect(()=>{
     window.electron.readDoctor_ClinicAppointment(doctor.idDoc,today).then((result)=>allDoctorAppointments(result));
    },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

  // var todayShow=new Date("2025-07-28");
  // var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');
  
  // useEffect(()=>{
  //   window.electron.readDateAppointment(today).then(allDateAppointments);
  // },[]);
//0247276798

  const pat=patients.find((patient)=>patient.EGN==patient.EGN);

  // var todayShow=new Date();
  // var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');

  
  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Doctor doctor={doctor}/>
  </StrictMode>,
) 
  }
  return(
    <>
    Днескашна дата: {today}
     <div>
      <h1>Запазени часове:</h1>
      <ul>{doctorAppointments.map((appointment,idx)=>(
        <li key={idx}>{JSON.stringify(appointment)}</li>
      ))}</ul>
    </div>   
  <form action={returnApp}>
      <button>Връщане назад</button>
    </form>
    </>
  )
}

export default ViewAppointment;