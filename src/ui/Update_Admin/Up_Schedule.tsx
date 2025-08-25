import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Schedule(){
const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);

const[inTypeName,insertTypeName]=useState("");  
const[types,allTypes]=useState<any[]>([]);

const[schedules,allSchedules]=useState<any[]>([]);

const[upIdSchedule,updateIdSchedule]=useState("");
const[upDoctor_Clinic,updateDoctor_Clinic]=useState("");
const[upBeginningTime,updateBeginningTime]=useState("");
const[upFinishTime,updateFinishTime]=useState("");
const[upData,updateData]=useState("");
const[upIdTy,updateIdTy]=useState("");

const[type_purposes,allType_Purpose]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readDoc_Clinic().then(allDoc_Clinics);
  },[]);

  useEffect(()=>{
    window.electron.readType_Purpose().then(allType_Purpose);
  },[]);

  useEffect(()=>{
    window.electron.readSchedule().then(allSchedules);
  },[]);

    function updateSchedule(formData: { get: (arg0: string) => any; }){
    const updaIdSchedule=formData.get("upIdSchedule");
    const updaDoctor_Clinic=formData.get("upDoctor_Clinic");
    const updaBeginningTime=formData.get("upBeginningTime");
    const updaFinishTime=formData.get("upFinishTime");
    const updaData=formData.get("upData");
    const updaIdTy=formData.get("upIdTy");

    window.electron.updateSchedule(updaIdSchedule,updaDoctor_Clinic,updaBeginningTime,updaFinishTime,updaData,updaIdTy);
  }

  return(
    <>
      <h1>Schedules</h1>
      <ul>{schedules.map((schedule,idx)=>(
        <li key={idx}>{JSON.stringify(schedule)}</li>
      ))}</ul>

 <div>
    <form action={updateSchedule}>
      <input type="number" name="upIdSchedule" onChange={(e)=>updateIdSchedule(e.target.value)}/>
      <select name="upDoctor_Clinic">
          {doc_clinics.map((doc_clinic)=>(
            <option key={doc_clinic.idDoc_Clinic} value={doc_clinic.idDoc_Clinic}>
              {doc_clinic.firstName} {doc_clinic.middleName} {doc_clinic.lastName} - {doc_clinic.nameOfClinic} ({doc_clinic.cabinet})
            </option>
          ))}
        </select>  
      <input type="time" name="upBeginningTime" onChange={(e)=>updateBeginningTime(e.target.value)}/>
      <input type="time" name="upFinishTime" onChange={(e)=>updateFinishTime(e.target.value)}/>
      <input type="date" name="upData" onChange={(e)=>updateData(e.target.value)}/>
      <select name="upIdTy">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select> 
      <input type="submit" value="Update Schedule" />
    </form>
  </div>
    </>
  )
}

export default Schedule;