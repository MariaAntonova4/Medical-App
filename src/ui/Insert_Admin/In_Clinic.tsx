import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Clinic(){

  const[insertClinicName,setAClinicName]=useState("");
  const[insertClinicAddress,setAClinicAddress]=useState("");
  const[clinics,allClinics]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readClinic().then(allClinics);
  },[]);

    function insertClinic(formData: { get: (arg0: string) => any; }) {
        const addClinicName=formData.get("insertClinicName");
        const addClinicAddress=formData.get("insertClinicAddress");

        window.electron.insertClinic(addClinicName,addClinicAddress);
    }

  return(
    <>

    <div>
        <h1>Клиники</h1>
        <ul>
            {clinics.map((clinic,idx)=>(
                <li key={idx}>{JSON.stringify(clinic)}</li>
            ))}
        </ul>
    </div>

    <div>
        <form action={insertClinic}>
          Моля добавете името на клиниката:
            <input type="text" name="insertClinicName" onChange={(e)=>setAClinicName(e.target.value)} />
            Моля добавете адреса на клиниката:
            <input type="text" name="insertClinicAddress" onChange={(e)=>setAClinicAddress(e.target.value)} />
            <input type="submit" value="Добави клиника" />
        </form>
    </div>

  
    </>
  )
}

export default Clinic;