import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Status(){
    const[inStatusName,insertStatusName]=useState("");
    const[statuses,allStatus]=useState<any[]>([]);
    

      useEffect(()=>{
        window.electron.readStatus().then(allStatus);
      },[]);

    
      function insertStatus(formData: { get: (arg0: string) => any; }) {
        const addStatusName=formData.get("inStatusName");
        window.electron.insertStatus(addStatusName);
      }
    
      return(
        <>
          <div>
          <h1>Статус:</h1>
          <ul>{statuses.map((status,idx)=>(
            <li key={idx}>{JSON.stringify(status)}</li>
          ))}</ul>
        </div>   
    
      <div>
        <form action={insertStatus}>
          Добавете статус:
          <input type="text" name="inStatusName" onChange={(e)=>insertStatusName(e.target.value)}/>
          <input type="submit" value="Добавете статус" />
        </form>
      </div>

        </>
      )
}

export default Status;