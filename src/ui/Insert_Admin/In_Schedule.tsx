import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Schedule(){
const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);
 
const[types,allTypes]=useState<any[]>([]);

const[inDoctor_Clinic,insertDoctor_Clinic]=useState("");
const[inBeginningTime,insertBeginningTime]=useState("");
const[inFinishTime,insertFinishTime]=useState("");
const[inData,insertData]=useState("");
const[inIdTy,insertIdTy]=useState("");
const[schedules,allSchedules]=useState<any[]>([]);

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

  function insertSchedule(formData: { get: (arg0: string) => any; }){
    const addDoctor_Clinic=formData.get("inDoctor_Clinic");
    const addBeginningTime=formData.get("inBeginningTime");
    const addFinishTime=formData.get("inFinishTime");
    const addData=formData.get("inData");
    const addIdTy=formData.get("inIdTy");

    window.electron.insertSchedule(addDoctor_Clinic,addBeginningTime,addFinishTime,addData,addIdTy);
  }

  return(
    <>
      <h1>Schedules</h1>
      <ul>{schedules.map((schedule,idx)=>(
        <li key={idx}>{JSON.stringify(schedule)}</li>
      ))}</ul>


  <div>
    <form action={insertSchedule}>
      <select name="inDoctor_Clinic">
          {doc_clinics.map((doc_clinic)=>(
            <option key={doc_clinic.idDoc_Clinic} value={doc_clinic.idDoc_Clinic}>
              {doc_clinic.firstName} {doc_clinic.middleName} {doc_clinic.lastName} - {doc_clinic.nameOfClinic} ({doc_clinic.cabinet})
            </option>
          ))}
        </select>  
      <input type="time" name="inBeginningTime" onChange={(e)=>insertBeginningTime(e.target.value)}/>
      <input type="time" name="inFinishTime" onChange={(e)=>insertFinishTime(e.target.value)}/>
      <input type="date" name="inData" onChange={(e)=>insertData(e.target.value)}/>
      <select name="inIdTy">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select> 
      <input type="submit" value="Insert Schedule" />
    </form>
  </div>
    </>
  )
}

export default Schedule;