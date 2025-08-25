import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Patient(){

    const[users,allUsers]=useState<any[]>([]);

    const[upIdPatient,updateIdPatient]=useState("");
    const[upFirstPName,updateFirstPName]=useState("");
    const[upMiddlePName,updateMiddlePName]=useState("");
    const[upLastPName,updateLastPName]=useState("");
    const[upAge,updateAge]=useState("");
    const[upEGN,updateEGN]=useState("");
    const[upGender,updateGender]=useState("");
    const[upAddress,updateAddress]=useState("");
    const[upTelephone,updateTelephone]=useState("");
    const[upIdUser,updateIdUser]=useState("");
    const[patients,allPatients]=useState<any[]>([]);

      useEffect(()=>{
        window.electron.readPatient().then(allPatients);
      },[]);

      useEffect(()=>{
        window.electron.readUser().then(allUsers);
      },[]);

  function updatePatient(formData: { get: (arg0: string) => any; }) {
    const addidPatient=formData.get("upIdPatient");
    const addFirstName=formData.get("upFirstPName");
    const addMiddleName=formData.get("upMiddlePName");
    const addLastName=formData.get("upLastPName");
    const addAge=formData.get("upAge");
    const addEGN=formData.get("upEGN");
    const addGender=formData.get("upGender");
    const addAddress=formData.get("upAddress");
    const addTelephone=formData.get("upTelephone");
    const addIdUser=formData.get("upIdUser");
    window.electron.updatePatient(addidPatient,addFirstName,addMiddleName,addLastName,addAge,addEGN,addGender,addAddress,addTelephone,addIdUser);
    
  }

  return(
    <>
     <div>
      <h1>Patients</h1>
      <ul>{patients.map((patient,idx)=>(
        <li key={idx}>{JSON.stringify(patient)}</li>
      ))}</ul>
    </div>   

 <div>
    <form action={updatePatient}>
      Id:
      <input type="number" name="upIdPatient" onChange={(e)=>updateIdPatient(e.target.value)}/>
      First Name:
      <input type="text" name="upFirstPName" onChange={(e)=>updateFirstPName(e.target.value)}/>
      Middle Name:
      <input type="text" name="upMiddlePName" onChange={(e)=>updateMiddlePName(e.target.value)}/>
      Last Name:
      <input type="text" name="upLastPName" onChange={(e)=>updateLastPName(e.target.value)}/>
      Age:
      <input type="number" name="upAge" onChange={(e)=>updateAge(e.target.value)}/>
      EGN:
      <input type="text" name="upEGN" onChange={(e)=>updateEGN(e.target.value)}/>
      Gender:
      <input type="text" name="upGender" onChange={(e)=>updateGender(e.target.value)}/>
      Address:
      <input type="text" name="upAddress" onChange={(e)=>updateAddress(e.target.value)}/>
      Telephone:
      <input type="tel" name="upTelephone" onChange={(e)=>updateTelephone(e.target.value)}/>
      User's id:
      <input type="number" name="upIdUser" onChange={(e)=>updateIdUser(e.target.value)}/>
      <input type="submit" value="Update Patient" />
    </form>
  </div>
    </>
  )
}

export default Patient;