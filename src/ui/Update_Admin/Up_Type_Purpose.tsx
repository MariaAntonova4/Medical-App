import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function Type_Purpose(){
  
const[types,allTypes]=useState<any[]>([]);

const[purposes,allPurposes]=useState<any[]>([]);

const[stages,allStages]=useState<any[]>([]);
const[upIdT_P,updateIdT_P]=useState("");
const[upIdType,updateIdType]=useState(""); 
const[upIdPurpose,updateidPurpose]=useState("");  
const[upIdStage,updateIdStage]=useState("");
const[type_purposes,allType_Purpose]=useState<any[]>([]);

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

    function updateType_Purpose(formData: { get: (arg0: string) => any; }) {
    const addIdT_P=formData.get("upIdT_P");
    const addIdType=formData.get("upIdType");
    const addIdPurpose=formData.get("upIdPurpose");
    const addIdStage=formData.get("upIdStage");

    window.electron.updateType_Purpose(addIdT_P,addIdType,addIdPurpose,addIdStage);
  }

  return(
    <>
    <div>
      <h1>Type_Purpose</h1>
      <ul>{type_purposes.map((type_purpose,idx)=>(
        <li key={idx}>{JSON.stringify(type_purpose)}</li>
      ))}</ul>
    </div>

 <div>
        <form action={updateType_Purpose}>
          <input type="number" name="upIdT_P" onChange={(e)=>updateIdT_P(e.target.value)}/>
          <select name="upIdType">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select>  
            <select name="upIdPurpose">
          {purposes.map((purpose)=>(
            <option key={purpose.idPurpose} value={purpose.idPurpose}>
              {purpose.purposeName}
            </option>
          ))}
        </select> 
            <select name="upIdStage">
          {stages.map((stage)=>(
            <option key={stage.idStage} value={stage.idStage}>
              {stage.stageName}
            </option>
          ))}
        </select>
            <input type="submit" value="Update Type_Purpose" />
        </form>
      </div>
    </>
  )
}

export default Type_Purpose;