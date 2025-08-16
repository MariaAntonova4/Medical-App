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


function update_User(formData: { get: (arg0: string) => any; }) {
    const upIdUser=formData.get("upIdUser");
    const upUsername=formData.get("upUsername");
    const upPass=formData.get("upPass");
    const upTypeU=formData.get("upTypeOfUser");
    window.electron.update_User(upIdUser,upUsername,upPass,upTypeU);
  }

  return(
    <>
    
    <div>
      <h1>Users</h1>
      <ul>{users.map((user,idx)=>(
        <li key={idx}>{JSON.stringify(user)}</li>
      ))}</ul>
    </div>

<div>
      <form action={update_User}>
        <input type="number" name="upIdUser"/>
        <input type="text" name="upUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="password" name="upPass" onChange={(e)=>insertPass(e.target.value)} />
        <select name="upTypeOfUser">
          {allTypesOfUsers.map((tyUser)=>(
            <option key={tyUser.idTypeUser} value={tyUser.idTypeUser}>
              {tyUser.typeUserName}
            </option>
          ))}
        </select>
        <input type="submit" value="Update User" />
      </form>
    </div>

</>
  )
}

export default User;