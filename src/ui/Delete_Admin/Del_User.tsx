import React from 'react';
import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function DeleteUser(){
const[delIdUser,deleteIdUser]=useState("");

const[users,allUsers]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readUser().then(allUsers);
},[]);

  function deleteUser(formData: { get: (arg0: string) => any; }) {
    const deliduser=formData.get("delIdUser");
    
    window.electron.deleteUser(deliduser);
  }

  return(
    <>
     <div>
      <h1>Потребители</h1>
      <ul>{users.map((user,idx)=>(
        <li key={idx}>{JSON.stringify(user)}</li>
      ))}</ul>
    </div>     

    <form action={deleteUser}>
        Моля въведете номера на потребителя, който желаете да премахнете: 
        <input type="number" name="delIdUser" onChange={(e)=>deleteIdUser(e.target.value)}/>
        <input type="submit" value="Премахване на потребител" />
    </form>
    </>
  )
}

export default DeleteUser;