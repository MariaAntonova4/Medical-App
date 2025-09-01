import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function Type_Purpose(){
  
const[types,allTypes]=useState<any[]>([]);

const[purposes,allPurposes]=useState<any[]>([]);

const[stages,allStages]=useState<any[]>([]);

const[inIdType,insertIdType]=useState(""); 
const[inIdPurpose,insertidPurpose]=useState("");  
const[inIdStage,insertIdStage]=useState("");
const[type_purposes,allType_Purpose]=useState<any[]>([]);

const[statuses,allStatus]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readType().then(allTypes);
  },[]);
  
  useEffect(()=>{
    window.electron.readPurpose().then(allPurposes);
  },[]);

  useEffect(()=>{
    window.electron.readStage().then(allStages);
  },[]);

  useEffect(()=>{
    window.electron.readType_Purpose().then(allType_Purpose);
  },[]);

    function insertType_Purpose(formData: { get: (arg0: string) => any; }) {
    const addIdType=formData.get("inIdType");
    const addIdPurpose=formData.get("inIdPurpose");
    const addIdStage=formData.get("inIdStage");

    window.electron.insertType_Purpose(addIdType,addIdPurpose,addIdStage);
  }

  return(
    <>
    <div>
      <h1>Видове и причини</h1>
      <ul>{type_purposes.map((type_purpose,idx)=>(
        <li key={idx}>{JSON.stringify(type_purpose)}</li>
      ))}</ul>
    </div>

 <div>
        <form action={insertType_Purpose}>
          Изберете вид:
          <select name="inIdType">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select>  
        Изберете причина:
            <select name="inIdPurpose">
          {purposes.map((purpose)=>(
            <option key={purpose.idPurpose} value={purpose.idPurpose}>
              {purpose.purposeName}
            </option>
          ))}
        </select> 
        Изберете степен:
            <select name="inIdStage">
          {stages.map((stage)=>(
            <option key={stage.idStage} value={stage.idStage}>
              {stage.stageName}
            </option>
          ))}
        </select>
            <input type="submit" value="Добавете вид и причина" />
        </form>
      </div>
    </>
  )
}

export default Type_Purpose;