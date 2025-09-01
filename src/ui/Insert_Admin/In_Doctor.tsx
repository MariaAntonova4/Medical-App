import { useEffect,StrictMode, useState} from 'react'
import './../index.css'
import './../App.css';

function Doctor(){
 
  const [specs,setSpecs]=useState<any[]>([]);

  const[users,allUsers]=useState<any[]>([]);

  const[upIdDoc,updateIdDoc]=useState("");
  const[inFirstName,insertFirstName]=useState("");
  const[inMiddleName,insertMiddleName]=useState(""); 
  const[inLastName,insertLastName]=useState("");     
  const[inDoc_Spec,insertDoc_Spec]=useState("");  
  const[inDoc_Tel,insertDoc_Tel]=useState("");       
  const[inDoc_User,insertDoc_User]=useState("");     
  const[doctors,allDoctors]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readDoctor().then(allDoctors);
  },[]);

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);


    function insertDoctor(formData: { get: (arg0: string) => any; }) {
    const inFirstName=formData.get("inFirstName");
    const inMiddleName=formData.get("inMiddleName");
    const inLastName=formData.get("inLastName");
    const inDoc_Spec=formData.get("inDoc_Spec");
    const inDoc_Tel=formData.get("inDoc_Tel");
    const inDoc_User=formData.get("inDoc_User");
    const username=inFirstName+" "+inMiddleName+" "+inLastName;

    const data1 = { username:username,pass:inDoc_User,userType:2};
  const data2 = { firstName:inFirstName,middleName:inMiddleName,lastName:inLastName,doctorSpecialization:inDoc_Spec,docTelephone:inDoc_Tel };

  const result = window.electron.insertDoctorUser(data1,data2);

    // if (users.find((user)=>user.username===inDoc_User&&user.userType===2)) {
      
    //   window.electron.insertDoctor(inFirstName,inMiddleName,inLastName,inDoc_Spec,inDoc_Tel,inDoc_User);
    // }
    // else{
    //   alert("This user doesn't exist")
    // }
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
        <form action={insertDoctor}>
          Моля добавете първото има на лекуващия лекар:
            <input type="text" name="inFirstName" onChange={(e)=>insertFirstName(e.target.value)} />
            Моля добавете второто има на лекуващия лекар:
            <input type="text" name="inMiddleName" onChange={(e)=>insertMiddleName(e.target.value)} />
            Моля добавете третото има на лекуващия лекар:
            <input type="text" name="inLastName" onChange={(e)=>insertLastName(e.target.value)} />
            Моля добавете парола за профила на лекуващия лекар:
            <input type="password" name='inDoc_User' onChange={(e)=>insertDoc_User(e.target.value)}/>
            <select name="inDoc_Spec">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
        Моля добавете телефонен номер на лекуващия лекарМ
            <input type="tel" name="inDoc_Tel" onChange={(e)=>insertDoc_Tel(e.target.value)} />
            <input type="submit" value="Добави лекар" />
        </form>
    </div>

    </>
  )
}

export default Doctor;