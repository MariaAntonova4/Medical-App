import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function Specialization(){
const [aSpecName,setASpecName]=useState("");
  const [idSpec,setIdSpec]=useState("");
  const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);
  
  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);
  
    function updateSpec(formData: { get: (arg0: string) => any; }) {
      const idSpec=formData.get("idSpec");
      const specname=formData.get("specname");
      window.electron.updateSpec(idSpec,specname);
    }

  return(
    <>
    <div>
      <h1>
        Специализация
      </h1>
      <ul>
        {specs.map((spec,idx)=>(
          <li key={idx}>{JSON.stringify(spec)}</li>
        ))}
      </ul>
    </div>
    <div>
    <form action={updateSpec}>
      Моля въведете номера на специализацията, която желаете да редактирате:
      <input type="number" name="idSpec" onChange={(e)=>setIdSpec(e.target.value)}/>
      Моля въведете специализация:
      <input type="text"name="specname"onChange={(e)=>setNameSpec(e.target.value)} />
      <input type="submit" value="Редактирайте специализация"/>
    </form>
    </div>
    </>
  )
}

export default Specialization;