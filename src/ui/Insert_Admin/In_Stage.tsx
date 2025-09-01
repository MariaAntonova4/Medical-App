import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Stage(){
    const[inStageName,insertStageName]=useState("");   
    const[stages,allStages]=useState<any[]>([]);

    
      useEffect(()=>{
        window.electron.readStage().then(allStages);
      },[]);
    
        function insertStage(formData: { get: (arg0: string) => any; }) {
        const addStageName=formData.get("inStageName");
    
        window.electron.insertStage(addStageName);
      }
    
      return(
        <>  
    
        <div>
          <h1>Степени</h1>
          <ul>{stages.map((stage,idx)=>(
            <li key={idx}>{JSON.stringify(stage)}</li>
          ))}</ul>
        </div>

        <div>
          <form action={insertStage}>
            Добавете степен:
            <input type="text" name="inStageName" onChange={(e)=>insertStageName(e.target.value)}/>
            <input type="submit" value="Добавете степен" />
          </form>
        </div>
    
        </>
      )
}

export default Stage;