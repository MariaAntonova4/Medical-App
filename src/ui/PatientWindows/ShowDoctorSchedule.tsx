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
      <form action={checkSchedule}>
        Моля избирите лекаря, чиито график желаете да проверите:
        <select name="inDoc">
          {doctors.map((schedule)=>(
            <option key={schedule.idDoc} value={schedule.idDoc}>
              {schedule.firstName} {schedule.middleName} {schedule.lastName}
            </option>
          ))}
        </select>
        Моля изберете датата на графика, който желаете да видите:
        <input type="date" name="inDate" onChange={(e)=>insertDate(e.target.value)}/>
        <input type="submit" value="Проверете график" />
      </form>
    </p>
  );
}
