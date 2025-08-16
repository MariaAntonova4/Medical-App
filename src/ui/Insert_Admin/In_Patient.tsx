import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Patient(){

    const[users,allUsers]=useState<any[]>([]);

    const[inFirstPName,insertFirstPName]=useState("");
    const[inMiddlePName,insertMiddlePName]=useState("");
    const[inLastPName,insertLastPName]=useState("");
    const[inAge,insertAge]=useState("");
    const[inEGN,insertEGN]=useState("");
    const[inGender,insertGender]=useState("");
    const[inAddress,insertAddress]=useState("");
    const[inTelephone,insertTelephone]=useState("");
    const[inIdUser,insertIdUser]=useState("");
    const[patients,allPatients]=useState<any[]>([]);

      useEffect(()=>{
        window.electron.readPatient().then(allPatients);
      },[]);

      useEffect(()=>{
        window.electron.readUser().then(allUsers);
      },[]);

  function insertPatient(formData: { get: (arg0: string) => any; }) {
    const addFirstName=formData.get("inFirstPName");
    const addMiddleName=formData.get("inMiddlePName");
    const addLastName=formData.get("inLastPName");
    const addAge=formData.get("inAge");
    const addEGN=formData.get("inEGN");
    const addGender=formData.get("inGender");
    const addAddress=formData.get("inAddress");
    const addTelephone=formData.get("inTelephone");
    const addIdUser=formData.get("inIdUser");
    const username=addFirstName+" "+addMiddleName+" "+addLastName;
    //window.electron.insert_User(username,addIdUser,3);
    //if (users.find((user)=>user.username==username&&user.pass==addIdUser&&user.userType==3)) {
    const user=users.find((user)=>user.username==username&&user.pass==addIdUser&&user.userType==3);
    //window.electron.insertPatient(addFirstName,addMiddleName,addLastName,addAge,addEGN,addGender,addAddress,addTelephone,user.idUser);
    //}
    
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
    <form action={insertPatient}>
      First Name:
      <input type="text" name="inFirstPName" onChange={(e)=>insertFirstPName(e.target.value)}/>
      Middle Name:
      <input type="text" name="inMiddlePName" onChange={(e)=>insertMiddlePName(e.target.value)}/>
      Last Name:
      <input type="text" name="inLastPName" onChange={(e)=>insertLastPName(e.target.value)}/>
      Age:
      <input type="number" name="inAge" onChange={(e)=>insertAge(e.target.value)}/>
      EGN:
      <input type="text" name="inEGN" onChange={(e)=>insertEGN(e.target.value)}/>
      Gender:
      <input type="text" name="inGender" onChange={(e)=>insertGender(e.target.value)}/>
      Address:
      <input type="text" name="inAddress" onChange={(e)=>insertAddress(e.target.value)}/>
      Telephone:
      <input type="tel" name="inTelephone" onChange={(e)=>insertTelephone(e.target.value)}/>
      User's password:
      <input type="password" name="inIdUser" onChange={(e)=>insertIdUser(e.target.value)}/>
      <input type="submit" value="Insert Patient" />
    </form>
  </div>
    </>
  )
}

export default Patient;