import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Purpose(){
const[upIdPurpose,updateIdPurpose]=useState("");
const[upPurposeName,updatePurposeName]=useState("");
const[upDuration,updateDuration]=useState("");   
const[purposes,allPurposes]=useState<any[]>([]);
    

      useEffect(()=>{
        window.electron.readPurpose().then(allPurposes);
      },[]);
    
    
      function updatePurpose(formData: { get: (arg0: string) => any; }) {
        const updaIdPurpose=formData.get("upIdPurpose");
        const updaPurposeName=formData.get("upPurposeName");
        const updaDuration=formData.get("upDuration");
    
        window.electron.updatePurpose(updaIdPurpose,updaPurposeName,updaDuration);
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
            <form action={updatePurpose}>
              Моля въведете номера на причината за посещение, която желаете да редактирате:
                <input type="number" name="upIdPurpose" onChange={(e)=>updateIdPurpose(e.target.value)}/>
                Моля въведете причината:
                <input type="text" name='upPurposeName' onChange={(e)=>updatePurposeName(e.target.value)}/>
                Моля въведете продължителност:
                <input type="number" name="upDuration" onChange={(e)=>updateDuration(e.target.value)} />
                <input type="submit" value="Редактирайте причина" />
            </form>
        </div>
    </>)
}

export default Purpose;