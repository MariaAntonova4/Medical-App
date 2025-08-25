import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function DocSpec(){
  const [specs,setSpecs]=useState<any[]>([]);

  const[doctors,allDoctors]=useState<any[]>([]);

  const[upIdD_S,updateIdD_S]=useState("");
  const[upSpec_Doc,updateSpec_Doc]=useState("");
  const[upDoc_Speci,updateDoc_Speci]=useState("");
  const[doc_specs,allDoc_Specs]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readDoc_Spec().then(allDoc_Specs);
  },[]);

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

    useEffect(()=>{
    window.electron.readDoctor().then(allDoctors);
  },[]);

    function updateDoc_Spec(formData: { get: (arg0: string) => any; }) {
      const idD_S=formData.get("upIdD_S");
        const updateDoctor=formData.get("upDoc_Speci");
        const updateSpec=formData.get("upSpec_Doc");
        window.electron.updateDoc_Spec(idD_S,updateDoctor,updateSpec);
    }

  return(
    <>
    <div>
      <h1>Doctor's specialization</h1>
      <ul>{doc_specs.map((doc_spec,idx)=>(
        <li key={idx}>{JSON.stringify(doc_spec)}</li>
      ))}</ul>
    </div>

 <div>

        <form action={updateDoc_Spec}>
            <input type="number" name="upIdD_S" onChange={(e)=>updateIdD_S(e.target.value)}/>
            <select name="upDoc_Speci">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>  
            <select name="upSpec_Doc">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="submit" value="Update Doctor's specialization" />
        </form>
    </div>

    </>
  )
}

export default DocSpec;