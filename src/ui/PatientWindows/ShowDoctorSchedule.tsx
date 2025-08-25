import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';
import DoctorScedule from "./DoctorSchedule";
import { createRoot } from 'react-dom/client'

export default function ShowDoctorSchedule() {
  const[inDoc,insertDoc]=useState("");
  const[inDate,insertDate]=useState("");  
  const[doctors,allDoctors]=useState<any[]>([]);
  
    useEffect(()=>{
      window.electron.readDoctor().then(allDoctors);
    },[]);
  

  function checkSchedule(formData: { get: (arg0: string) => any; }) {
    const searchDoctor=formData.get("inDoc");
    const searchDate=formData.get("inDate");
    const array=[searchDoctor,searchDate];
    
     createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <DoctorScedule doctor={array}/>
      </StrictMode>,
    ) 
  }
  return(
    <p>
      Which Doctor's schedule would you like to check:
      <form action={checkSchedule}>
        <select name="inDoc">
          {doctors.map((schedule)=>(
            <option key={schedule.idDoc} value={schedule.idDoc}>
              {schedule.firstName} {schedule.middleName} {schedule.lastName}
            </option>
          ))}
        </select>
        <input type="date" name="inDate" onChange={(e)=>insertDate(e.target.value)}/>
        <input type="submit" value="Check Schedule" />
      </form>
    </p>
  );
}
