import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Stage(){
  const[upIdStage,updateIdStage]=useState("");
    const[upStageName,updateStageName]=useState("");   
    const[stages,allStages]=useState<any[]>([]);
    
      useEffect(()=>{
        window.electron.readStage().then(allStages);
      },[]);
    
        function updateStage(formData: { get: (arg0: string) => any; }) {
          const addIdStage=formData.get("upIdStage");
        const addStageName=formData.get("upStageName");
    
        window.electron.updateStage(addIdStage,addStageName);
      }
    
      return(
        <>    
        <div>
          <h1>Stage</h1>
          <ul>{stages.map((stage,idx)=>(
            <li key={idx}>{JSON.stringify(stage)}</li>
          ))}</ul>
        </div>

        <div>
          <form action={updateStage}>
             <input type="number" name="upIdStage" onChange={(e)=>updateIdStage(e.target.value)}/>
            <input type="text" name="upStageName" onChange={(e)=>updateStageName(e.target.value)}/>
            <input type="submit" value="Update Stage" />
          </form>
        </div>
    
        </>
      )
}

export default Stage;