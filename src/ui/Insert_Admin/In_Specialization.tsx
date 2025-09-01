import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function Specialization(){
const [aSpecName,setASpecName]=useState("");
  const [idSpec,setIdSpec]=useState("");
  const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);
  
  const [searchEGN,search_egn]=useState("");
const [patients,allPatients]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

  function addSpec(formData: { get: (arg0: string) => any; }) {
      const addSpecName = formData.get("addSpecName");
      window.electron.getSpec(addSpecName);
    }

  return(
    <>
    <div>
      <h1>
        Специализации
      </h1>
      <ul>
        {specs.map((spec,idx)=>(
          <li key={idx}>{JSON.stringify(spec)}</li>
        ))}
      </ul>
    </div>
    <div>
        <form action={addSpec}>
      Моля добавете име на специализацията:
      <input type="text"name="addSpecName"onChange={(e)=>setASpecName(e.target.value)} />
      <input type="submit" value="Добавете специализация"/>
    </form>
    </div>
    </>
  )
}

export default Specialization;