import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function DocSpec(){
  const [specs,setSpecs]=useState<any[]>([]);

  const[doctors,allDoctors]=useState<any[]>([]);

  const[upIdD_S,updateIdD_S]=useState("");
  const[inSpec_Doc,insertSpec_Doc]=useState("");
  const[inDoc_Speci,insertDoc_Speci]=useState(""); 
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

    function insert_Doc_Spec(formData: { get: (arg0: string) => any; }) {
        const addDoctor=formData.get("inDoc_Speci");
        const addSpec=formData.get("inSpec_Doc");

        window.electron.insertDoc_Spec(addDoctor,addSpec);
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
        <form action={insert_Doc_Spec}>
          <select name="inDoc_Speci">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>  
            <select name="inSpec_Doc">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="submit" value="Insert Doctor" />
        </form>
    </div>

    </>
  )
}

export default DocSpec;