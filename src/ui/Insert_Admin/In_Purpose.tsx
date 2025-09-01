import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Purpose(){
    const[upIdPurpose,updateIdPurpose]=useState("");
    const[inPurposeName,insertPurposeName]=useState("");
    const[inDuration,insertDuration]=useState(""); 
    const[purposes,allPurposes]=useState<any[]>([]);
    

      useEffect(()=>{
        window.electron.readPurpose().then(allPurposes);
      },[]);
    
    
        function insertPurpose(formData: { get: (arg0: string) => any; }) {
        const addPurposeName=formData.get("inPurposeName");
        const addDuration=formData.get("inDuration");
    
        window.electron.insertPurpose(addPurposeName,addDuration);
      }
    
      return(
        <>    
        <div>
          <h1>Причини на посещение</h1>
          <ul>{purposes.map((purpose,idx)=>(
            <li key={idx}>{JSON.stringify(purpose)}</li>
          ))}</ul>
        </div>
    
        <div>
            <form action={insertPurpose}>
              Моля въведете причина за посещение:
            <input type="text" name='inPurposeName' onChange={(e)=>insertPurposeName(e.target.value)}/>
            Моля въведете продължителност:
            <input type="number" name="inDuration" onChange={(e)=>insertDuration(e.target.value)} />
                <input type="submit" value="Добавете причина" />
            </form>
            </div>

    </>)
}

export default Purpose;