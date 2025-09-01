import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Type(){
const[upIdType,updateIdType]=useState("");
const[upTypeName,updateTypeName]=useState("");  
const[types,allTypes]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readType().then(allTypes);
  },[]);


    function updateType(formData: { get: (arg0: string) => any; }) {
    const addIdType=formData.get("upIdType");
    const addTypeName=formData.get("upTypeName");

    window.electron.updateType(addIdType,addTypeName);
  }


  return(
    <>

<div>
      <h1>Типове</h1>
      <ul>{types.map((type,idx)=>(
        <li key={idx}>{JSON.stringify(type)}</li>
      ))}</ul>
    </div>

<div>
        <form action={updateType}>
          Моля въведете номера на типа, който желаете да редактирате:
           <input type="number" name="upIdType" onChange={(e)=>updateIdType(e.target.value)}/>
           Моля въведете тип:
            <input type="text" name="upTypeName" onChange={(e)=>updateTypeName(e.target.value)} />
            <input type="submit" value="Редактирайте тип" />
        </form>

    </div>
    </>
  )
}

export default Type;