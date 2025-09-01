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
      <h1>Типове потребители</h1>
      <ul>{allTypesOfUsers.map((typeOfUser,idx)=>(
        <li key={idx}>{JSON.stringify(typeOfUser)}</li>
      ))}</ul>
    </div>

    <div>
      <form action={updateTypeOfUser}>
        Моля въведете номера на типа потребител, който желаете да редактирате:
        <input type="number" name="upIdTypeUser" onChange={(e)=>updateIdTypeUser(e.target.value)}/>
        Моля въведете тип потребител:
        <input type="text" name="upTypeUser" onChange={(e)=>updateTypeUser(e.target.value)} />
        <input type="submit" value="Редактирайте тип потребител" />
      </form>
    </div>
    </>
  )
}

export default TypeUser;