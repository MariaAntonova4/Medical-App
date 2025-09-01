import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Doctor(){
 
  const [specs,setSpecs]=useState<any[]>([]);

  const[users,allUsers]=useState<any[]>([]);

  const[upIdDoc,updateIdDoc]=useState("");
  const[upFirstName,updateFirstName]=useState("");
  const[upMiddleName,updateMiddleName]=useState("");
  const[upLastName,updateLastName]=useState("");
  const[upDoctor_Spec,updateDoctor_Spec]=useState("");
  const[upDoc_Tel,updateDoc_Tel]=useState("");
  const[upDoc_User,updateDoc_User]=useState("");
  const[doctors,allDoctors]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readDoctor().then(allDoctors);
  },[]);

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  function updateDoctor(formData: { get: (arg0: string) => any; }) {
    const upIdDoc=formData.get("upIdDoc");
    const upFirstName=formData.get("upFirstName");
    const upMiddleName=formData.get("upMiddleName");
    const upLastName=formData.get("upLastName");
    const upDoc_Spec=formData.get("upDoctor_Spec");
    const upDoc_Tel=formData.get("upDoc_Tel");
    const upDoc_User=formData.get("upDoc_User");
    if (users.find((user)=>user.username===upDoc_User&&user.userType===2)) {
      
      window.electron.updateDoctor(upIdDoc,upFirstName,upMiddleName,upLastName,upDoc_Spec,upDoc_Tel,upDoc_User);
    }
    else{
      alert("This user doesn't exist")
    }
  }

  return(
    <>

    <div>
      <h1>Лекари</h1>
      <ul>{doctors.map((doctor,idx)=>(
        <li key={idx}>{JSON.stringify(doctor)}</li>
      ))}</ul>
    </div>

    <div>

        <form action={updateDoctor}>
          Моля веведете номера на лекаря, който желаете да редактирате:
            <input type="number" name="upIdDoc" onChange={(e)=>updateIdDoc(e.target.value)}/>
            Моля въведете първото име на лекаря:
            <input type="text" name="upFirstName" onChange={(e)=>updateFirstName(e.target.value)} />
            Моля въведете презимето на лекаря:
            <input type="text" name="upMiddleName" onChange={(e)=>updateMiddleName(e.target.value)} />
            Моля въведете фамилното име на лекаря:
            <input type="text" name="upLastName" onChange={(e)=>updateLastName(e.target.value)} />
            Моля въведете потребител:
            <input type="text" name='upDoc_User' onChange={(e)=>updateDoc_User(e.target.value)}/>
            Моля изберете специализация:
            <select name="upDoctor_Spec">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
        Моля въведете телефонен номер на лекаря:
            <input type="tel" name="upDoc_Tel" onChange={(e)=>updateDoc_Tel(e.target.value)} />
            <input type="submit" value="Редактирайте лекаря" />
        </form>
    </div>

    </>
  )
}

export default Doctor;