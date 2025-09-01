import React from 'react';
import { useEffect, useState} from 'react'
import './../index.css'
import './../App.css';

function DeleteTypeUser(){
const[delIdTypeUser,deleteIdTypeUser]=useState("");

const[typeUsers,allTypeUsers]=useState<any[]>([]);

useEffect(()=>{
    window.electron.readTypeOfUser().then(allTypeUsers);
},[]);

  function deleteTypeUser(formData: { get: (arg0: string) => any; }) {
    const delidtypeuser=formData.get("delIdTypeUser");
    
    window.electron.deleteTypeOfUser(delidtypeuser);
  }

  return(
    <>
     <div>
      <h1>Типове потребители</h1>
      <ul>{typeUsers.map((typeUser,idx)=>(
        <li key={idx}>{JSON.stringify(typeUser)}</li>
      ))}</ul>
    </div>     

    <form action={deleteTypeUser}>
        Моля въведете номера на типове потребители, която желаете да премахнете:
        <input type="number" name="delIdTypeUser" onChange={(e)=>deleteIdTypeUser(e.target.value)}/>
        <input type="submit" value="Премахване на тип потребител" />
    </form>
    </>
  )
}

export default DeleteTypeUser;