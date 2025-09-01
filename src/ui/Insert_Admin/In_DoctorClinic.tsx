import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

 function DoctorClinic() {
      const[upIdD_C,updateIdD_C]=useState("");
      const[inDoc_Clinic,insertDoc_Cli]=useState("");     
      const[inClinic_Doc,insertClinic_Doc]=useState("");  
      const[inCabinet,insertCabinet]=useState("");        
      const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);
       const[doctors,allDoctors]=useState<any[]>([]);
       const[clinics,allClinics]=useState<any[]>([]);
        useEffect(()=>{
           window.electron.readDoc_Clinic().then(allDoc_Clinics);
         },[]);
           useEffect(()=>{
             window.electron.readClinic().then(allClinics);
           },[]);
             useEffect(()=>{
               window.electron.readDoctor().then(allDoctors);
             },[]);
  function insertDoc_Clinic(formData: { get: (arg0: string) => any; }) {
    const addIdDoc_Clinic=formData.get("inDoc_Clinic");
    const addIdClinic_Doc=formData.get("inClinic_Doc");
    const cabinet=formData.get("inCabinet");

    window.electron.insertDoc_Clinic(addIdDoc_Clinic,addIdClinic_Doc,cabinet);
  }
return(    
    <>
    <div>
      <h1>Докторски клиники</h1>
      <ul>{doc_clinics.map((doc_clinic,idx)=>(
        <li key={idx}>{JSON.stringify(doc_clinic)
        }</li>
      ))}</ul>
    </div>
   <div>
        <form action={insertDoc_Clinic}>
          Моля изберете лекар:
            <select name="inDoc_Clinic">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>
        Моля изберете клиника:
        <select name="inClinic_Doc">
          {clinics.map((clinic)=>(
            <option key={clinic.idClinic} value={clinic.idClinic}>
              {clinic.nameOfClinic}
            </option>
          ))}
        </select>
        Моля въведете номера на кабинета на лекаря от клиниката:
        <input type="text" name='inCabinet' onChange={(e)=>insertCabinet(e.target.value)}/>
            <input type="submit" value="Добавете докторска клиника" />
        </form>
    </div>
    </> 
    ) }
    export default DoctorClinic;