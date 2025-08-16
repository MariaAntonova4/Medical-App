import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Clinic(){
  const[idClinic,setIdClinic]=useState("");
  const[updateClinicName,updateClinicNameF]=useState("");
  const[updateClinicAddress,updateClinicAddressF]=useState("");
  const[clinics,allClinics]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readClinic().then(allClinics);
  },[]);


    function updateClinic(formData: { get: (arg0: string) => any; }) {
        const idClinic=formData.get("idClinic");
        const clinicName=formData.get("updateClinicName");
        const clinicAddress=formData.get("updateClinicAddress");

        window.electron.updateClinic(idClinic,updateClinicName,updateClinicAddress);
    }

  return(
    <>

    <div>
        <h1>Клиники:</h1>
        <ul>
            {clinics.map((clinic,idx)=>(
                <li key={idx}>{JSON.stringify(clinic)}</li>
            ))}
        </ul>
    </div>

    <div>
        <form action={updateClinic}>
            Моля въведете номера на клиниката, която желаете да редактирате:
            <input type="number" name="idClinic" onChange={(e)=>setIdClinic(e.target.value)}/>
            Моля въведете име на клиниката:
            <input type="text" name="updateClinicName" onChange={(e)=>updateClinicNameF(e.target.value)} />
            Моля въведете адреса на клиниката:
            <input type="text" name="updateClinicAddress" onChange={(e)=>updateClinicAddressF(e.target.value)} />
            <input type="submit" value="Редактирайте клиника" />
        </form>
    </div>

  
    </>
  )
}

export default Clinic;