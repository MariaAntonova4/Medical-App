import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function TypeUser(){
  const[upIdTypeUser,updateIdTypeUser]=useState("");
  const[upTypeUser,updateTypeUser]=useState("");
  const[allTypesOfUsers,typesOfUsers]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readTypeOfUser().then(typesOfUsers);
  },[]);


  function updateTypeOfUser(formData: { get: (arg0: string) => any; }) {
    const addIdTypeUser=formData.get("upIdTypeUser");
    const addTypeUser=formData.get("upTypeUser");

    window.electron.updateTypeUser(addIdTypeUser,addTypeUser);
  }

  return(
    <>
    <div>
      <h1>Types Of Users</h1>
      <ul>{allTypesOfUsers.map((typeOfUser,idx)=>(
        <li key={idx}>{JSON.stringify(typeOfUser)}</li>
      ))}</ul>
    </div>

    <div>
      <form action={updateTypeOfUser}>
        <input type="number" name="upIdTypeUser" onChange={(e)=>updateIdTypeUser(e.target.value)}/>
        <input type="text" name="upTypeUser" onChange={(e)=>updateTypeUser(e.target.value)} />
        <input type="submit" value="Update Type Of User" />
      </form>
    </div>
    </>
  )
}

export default TypeUser;