import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';
function DoctorClinic() {
    const[upIdD_C,updateIdD_C]=useState("");
    const[upDoc_Clinic,updateDoc_Cli]=useState("");
    const[upClinic_Doc,updateClinic_Doc]=useState("");
    const[upCabinet,updateCabinet]=useState("");
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
  function updateDoc_Clinic(formData: { get: (arg0: string) => any; }) {
    const upIdD_C=formData.get("upIdD_C");
    const updateIdDoc_Clinic=formData.get("upDoc_Clinic");
    const updateIdClinic_Doc=formData.get("upClinic_Doc");
    const cabinet=formData.get("upCabinet");

    window.electron.updateDoc_Clinic(upIdD_C,updateIdDoc_Clinic,updateIdClinic_Doc,cabinet);
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
       <form action={updateDoc_Clinic}>
        Моля въведете номера на докторската клиника, която желаете да редактирате:
            <input type="number" name="upIdD_C" onChange={(e)=>updateIdD_C(e.target.value)}/>
            Моля изберете лекар:
            <select name="upDoc_Clinic">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>
        Моля изберете клиника:
        <select name="upClinic_Doc">
          {clinics.map((clinic)=>(
            <option key={clinic.idClinic} value={clinic.idClinic}>
              {clinic.nameOfClinic}
            </option>
          ))}
        </select>
        Моля въведете кабинет:
        <input type="text" name='upCabinet' onChange={(e)=>updateCabinet(e.target.value)}/>
            <input type="submit" value="Редактирайте докторска клиника" />
        </form>
    </div>
    </>
    )
}
export default DoctorClinic;