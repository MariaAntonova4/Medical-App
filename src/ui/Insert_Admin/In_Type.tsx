import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Type(){
const[inTypeName,insertTypeName]=useState("");  
const[types,allTypes]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readType().then(allTypes);
  },[]);


    function insertType(formData: { get: (arg0: string) => any; }) {
    const addTypeName=formData.get("inTypeName");

    window.electron.insertType(addTypeName);
  }


  return(
    <>

<div>
      <h1>Типове:</h1>
      <ul>{types.map((type,idx)=>(
        <li key={idx}>{JSON.stringify(type)}</li>
      ))}</ul>
    </div>

<div>
        <form action={insertType}>
          Добавете тип:
            <input type="text" name="inTypeName" onChange={(e)=>insertTypeName(e.target.value)} />
            <input type="submit" value="Добавете тип" />
        </form>

    </div>
    </>
  )
}

export default Type;