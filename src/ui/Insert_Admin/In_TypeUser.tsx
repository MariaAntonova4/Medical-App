import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function TypeUser(){
  const[inTypeUser,insertTypeUser]=useState("");
  const[allTypesOfUsers,typesOfUsers]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readTypeOfUser().then(typesOfUsers);
  },[]);


  function insertTypeOfUser(formData: { get: (arg0: string) => any; }) {
    const addTypeUser=formData.get("inTypeUser");

    window.electron.insertTypeOfUser(addTypeUser);
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
      <form action={insertTypeOfUser}>
        <input type="text" name="inTypeUser" onChange={(e)=>insertTypeUser(e.target.value)} />
        <input type="submit" value="Insert Type Of User" />
      </form>
    </div>
    </>
  )
}

export default TypeUser;