import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Status(){
  const[upIdStatus,updateIdStatus]=useState("");
    const[upStatusName,updateStatusName]=useState("");
    const[statuses,allStatus]=useState<any[]>([]);
    

      useEffect(()=>{
        window.electron.readStatus().then(allStatus);
      },[]);

    
      function updateStatus(formData: { get: (arg0: string) => any; }) {
        const addIdStatus=formData.get("upIdStatus");
        const addStatusName=formData.get("upStatusName");
        window.electron.updateStatus(addIdStatus,addStatusName);
      }
    
      return(
        <>
          <div>
          <h1>Статус</h1>
          <ul>{statuses.map((status,idx)=>(
            <li key={idx}>{JSON.stringify(status)}</li>
          ))}</ul>
        </div>   
    
      <div>
        <form action={updateStatus}>
          Моля въведете номера на статуса, който желаете да редактирате:
           <input type="number" name="upIdStatus" onChange={(e)=>updateIdStatus(e.target.value)}/>
           Моля въведете статус:
          <input type="text" name="upStatusName" onChange={(e)=>updateStatusName(e.target.value)}/>
          <input type="submit" value="Редактирайте статус" />
        </form>
      </div>

        </>
      )
}

export default Status;