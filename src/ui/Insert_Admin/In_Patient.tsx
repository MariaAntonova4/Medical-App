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
    //const user=users.find((user)=>user.username==username&&user.pass==addIdUser&&user.userType==3);


  const data1 = { username:username,pass:addIdUser,userType:3};
  const data2 = { firstName:addFirstName,middleName:addMiddleName,lastName:addLastName,age:addAge,EGN:addEGN,gender:addGender,address:addAddress,telephone:addTelephone };

  const result = window.electron.insertPatientUser(data1,data2);
  // if (result.success) {
  //   console.log('Data added successfully');
  // } else {
  //   console.error('Error:', result.error);
  // }




    //window.electron.insertPatientUser(addFirstName,addMiddleName,addLastName,addAge,addEGN,addGender,addAddress,addTelephone,41,username,addIdUser,3);
    //}
    
  }

  return(
    <>
     <div>
      <h1>Пациенти</h1>
      <ul>{patients.map((patient,idx)=>(
        <li key={idx}>{JSON.stringify(patient)}</li>
      ))}</ul>
    </div>   

 <div>
    <form action={insertPatient}>
      Моля добавете първото име на пациента:
      <input type="text" name="inFirstPName" onChange={(e)=>insertFirstPName(e.target.value)}/>
      Моля добавете второто име на пациента:
      <input type="text" name="inMiddlePName" onChange={(e)=>insertMiddlePName(e.target.value)}/>
      Моля добавете фамилното име на пациента:
      <input type="text" name="inLastPName" onChange={(e)=>insertLastPName(e.target.value)}/>
      Моля добавете годините на пациента:
      <input type="number" name="inAge" onChange={(e)=>insertAge(e.target.value)}/>
      Моля добавете ЕГН на пациента:
      <input type="text" name="inEGN" onChange={(e)=>insertEGN(e.target.value)}/>
      Моля запишете пола на пациента:
      <input type="text" name="inGender" onChange={(e)=>insertGender(e.target.value)}/>
      Моля добавете адреса на пациента:
      <input type="text" name="inAddress" onChange={(e)=>insertAddress(e.target.value)}/>
      Моля добавете телефонния номер на пациента:
      <input type="tel" name="inTelephone" onChange={(e)=>insertTelephone(e.target.value)}/>
      Моля добавете паролата за профила на пациента:
      <input type="password" name="inIdUser" onChange={(e)=>insertIdUser(e.target.value)}/>
      <input type="submit" value="Добави пациент" />
    </form>
  </div>
    </>
  )
}

export default Patient;