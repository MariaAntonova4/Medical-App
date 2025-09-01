import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function User(){
  const[allTypesOfUsers,typesOfUsers]=useState<any[]>([]);

  const[inUsername,insertUsername]=useState("");
  const[inPass,insertPass]=useState("");
  const[inTypeOfUser,insertTypeU]=useState("");
  const[users,allUsers]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readUser().then(allUsers);
  },[]);

    useEffect(()=>{
      window.electron.readTypeOfUser().then(typesOfUsers);
    },[]);

  function insert_User(formData: { get: (arg0: string) => any; }) {
    const addUsername=formData.get("inUsername");
    const addPass=formData.get("inPass");
    const addTypeU=formData.get("inTypeOfUser");
    window.electron.insert_User(addUsername,addPass,addTypeU);
  }


  return(
    <>
    
    <div>
      <h1>Потребители</h1>
      <ul>{users.map((user,idx)=>(
        <li key={idx}>{JSON.stringify(user)}</li>
      ))}</ul>
    </div>

    <div>
      <form action={insert_User}>
        Добавете потребителско име:
        <input type="text" name="inUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        Добавете парола:
        <input type="password" name="inPass" onChange={(e)=>insertPass(e.target.value)} />
        Изберете тип на потребителя:
        <select name="inTypeOfUser">
          {allTypesOfUsers.map((tyUser)=>(
            <option key={tyUser.idTypeUser} value={tyUser.idTypeUser}>
              {tyUser.typeUserName}
            </option>
          ))}
        </select>
        <input type="submit" value="Добавете потребител" />
      </form>
    </div>

</>
  )
}

export default User;