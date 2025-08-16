import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';
import { createRoot } from 'react-dom/client'
import Doctor from './Doctor';
import { format } from 'date-fns';

function ViewAppointment(){
const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);
  const [patients,allPatients]=useState<any[]>([]);
  const [searchEGN,search_egn]=useState("");
  const [appointments,allAppointments]=useState<any[]>([]);
  const [dateAppointments,allDateAppointments]=useState<any[]>([]);
  useEffect(()=>{
    window.electron.readAppointment().then(allAppointments);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

  useEffect(()=>{
    window.electron.readDateAppointment().then(allDateAppointments);
  },[]);
//0247276798

  const pat=patients.find((patient)=>patient.EGN==patient.EGN);

  var todayShow=new Date();
  var today=format(todayShow.toLocaleDateString(),'yyyy-MM-dd');

  
  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Doctor />
  </StrictMode>,
) 
  }
  return(
    <>
    Today's date: {today}
  <form action={returnApp}>
      <button>Return</button>
    </form>
    </>
  )
}

export default ViewAppointment;