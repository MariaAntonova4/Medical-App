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
          <h1>Status</h1>
          <ul>{statuses.map((status,idx)=>(
            <li key={idx}>{JSON.stringify(status)}</li>
          ))}</ul>
        </div>   
    
      <div>
        <form action={updateStatus}>
           <input type="number" name="upIdStatus" onChange={(e)=>updateIdStatus(e.target.value)}/>
          <input type="text" name="upStatusName" onChange={(e)=>updateStatusName(e.target.value)}/>
          <input type="submit" value="Update Status" />
        </form>
      </div>

        </>
      )
}

export default Status;