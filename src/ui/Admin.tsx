import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App';

function Admin(){

  const [aSpecName,setASpecName]=useState("");
  const [idSpec,setIdSpec]=useState("");
  const [nameSpec,setNameSpec]=useState("");
  const [specs,setSpecs]=useState<any[]>([]);

  const[insertClinicName,setAClinicName]=useState("");
  const[insertClinicAddress,setAClinicAddress]=useState("");
  const[idClinic,setIdClinic]=useState("");
  const[updateClinicName,updateClinicNameF]=useState("");
  const[updateClinicAddress,updateClinicAddressF]=useState("");
  const[clinics,allClinics]=useState<any[]>([]);

  const[inTypeUser,insertTypeUser]=useState("");
  const[allTypesOfUsers,typesOfUsers]=useState<any[]>([]);

  const[inUsername,insertUsername]=useState("");
  const[inPass,insertPass]=useState("");
  const[inTypeOfUser,insertTypeU]=useState("");
  const[users,allUsers]=useState<any[]>([]);

  const[inFirstPName,insertFirstPName]=useState("");
  const[inMiddlePName,insertMiddlePName]=useState("");
  const[inLastPName,insertLastPName]=useState("");

  const[upIdDoc,updateIdDoc]=useState("");
  const[inFirstName,insertFirstName]=useState("");   const[upFirstName,updateFirstName]=useState("");
  const[inMiddleName,insertMiddleName]=useState(""); const[upMiddleName,updateMiddleName]=useState("");
  const[inLastName,insertLastName]=useState("");     const[upLastName,updateLastName]=useState("");
  const[inDoc_Spec,insertDoc_Spec]=useState("");     const[upDoctor_Spec,updateDoctor_Spec]=useState("");
  const[inDoc_Tel,insertDoc_Tel]=useState("");       const[upDoc_Tel,updateDoc_Tel]=useState("");
  const[inDoc_User,insertDoc_User]=useState("");     const[upDoc_User,updateDoc_User]=useState("");
  const[doctors,allDoctors]=useState<any[]>([]);

  const[upIdD_C,updateIdD_C]=useState("");
  const[inDoc_Clinic,insertDoc_Cli]=useState("");     const[upDoc_Clinic,updateDoc_Cli]=useState("");
  const[inClinic_Doc,insertClinic_Doc]=useState("");  const[upClinic_Doc,updateClinic_Doc]=useState("");
  const[inCabinet,insertCabinet]=useState("");        const[upCabinet,updateCabinet]=useState("");
  const[doc_clinics,allDoc_Clinics]=useState<any[]>([]);

  const[upIdD_S,updateIdD_S]=useState("");
  const[inSpec_Doc,insertSpec_Doc]=useState("");     const[upSpec_Doc,updateSpec_Doc]=useState("");
  const[inDoc_Speci,insertDoc_Speci]=useState("");   const[upDoc_Speci,updateDoc_Speci]=useState("");
  const[doc_specs,allDoc_Specs]=useState<any[]>([]);
  
//const[upIdDoc,updateIdDoc]=useState("");
const[inTypeName,insertTypeName]=useState("");  // const[upFirstName,updateFirstName]=useState("");
const[types,allTypes]=useState<any[]>([]);

const[inPurposeName,insertPurposeName]=useState(""); //const[upMiddleName,updateMiddleName]=useState("");
const[inDuration,insertDuration]=useState("");     //const[upLastName,updateLastName]=useState("");
const[purposes,allPurposes]=useState<any[]>([]);

const[inDoctor_Clinic,insertDoctor_Clinic]=useState("");
const[inBeginningTime,insertBeginningTime]=useState("");
const[inFinishTime,insertFinishTime]=useState("");
const[inData,insertData]=useState("");
const[inIdTy,insertIdTy]=useState("");
const[schedules,allSchedules]=useState<any[]>([]);

//const[upIdDoc,updateIdDoc]=useState("");
const[inStageName,insertStageName]=useState("");   //const[upFirstName,updateFirstName]=useState("");

const[stages,allStages]=useState<any[]>([]);

const[inIdType,insertIdType]=useState(""); //const[upMiddleName,updateMiddleName]=useState("");
const[inIdPurpose,insertidPurpose]=useState("");    // const[upLastName,updateLastName]=useState("");
const[inIdStage,insertIdStage]=useState("");
const[type_purposes,allType_Purpose]=useState<any[]>([]);

//const[]=useState<any[]>([]);

  useEffect(()=>{
    window.electron.readDoctor().then(allDoctors);
  },[]);

  useEffect(()=>{
    window.electron.readDoc_Clinic().then(allDoc_Clinics);
  },[]);

  useEffect(()=>{
    window.electron.readDoc_Spec().then(allDoc_Specs);
  },[]);
  
  
  useEffect(()=>{
    window.electron.readUser().then(allUsers);
  },[]);

  useEffect(()=>{
    window.electron.readTypeOfUser().then(typesOfUsers);
  },[]);

  useEffect(()=>{
    window.electron.readClinic().then(allClinics);
  },[]);

  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
  },[]);

  useEffect(()=>{
    window.electron.readType().then(allTypes);
  },[]);

  useEffect(()=>{
    window.electron.readType_Purpose().then(allType_Purpose);
  },[]);

  useEffect(()=>{
    window.electron.readPurpose().then(allPurposes);
  },[]);

  useEffect(()=>{
    window.electron.readSchedule().then(allSchedules);
  },[]);

  useEffect(()=>{
    window.electron.readStage().then(allStages);
  },[]);

    function insertPurpose(formData: { get: (arg0: string) => any; }) {
    const addPurposeName=formData.get("inPurposeName");
    const addDuration=formData.get("inDuration");

    window.electron.insertPurpose(addPurposeName,addDuration);
  }

  function insertSchedule(formData: { get: (arg0: string) => any; }){
    const addDoctor_Clinic=formData.get("inDoctor_Clinic");
    const addBeginningTime=formData.get("inBeginningTime");
    const addFinishTime=formData.get("inFinishTime");
    const addData=formData.get("inData");
    const addIdTy=formData.get("inIdTy");

    window.electron.insertSchedule(addDoctor_Clinic,addBeginningTime,addFinishTime,addData,addIdTy);
  }

    function insertStage(formData: { get: (arg0: string) => any; }) {
    const addStageName=formData.get("inStageName");

    window.electron.insertStage(addStageName);
  }

    function insertType(formData: { get: (arg0: string) => any; }) {
    const addTypeName=formData.get("inTypeName");

    window.electron.insertType(addTypeName);
  }

    function insertType_Purpose(formData: { get: (arg0: string) => any; }) {
    const addIdType=formData.get("inIdType");
    const addIdPurpose=formData.get("inIdPurpose");
    const addIdStage=formData.get("inIdStage");

    window.electron.insertType_Purpose(addIdType,addIdPurpose,addIdStage);
  }

  function insert_User(formData: { get: (arg0: string) => any; }) {
    const addUsername=formData.get("inUsername");
    const addPass=formData.get("inPass");
    const addTypeU=formData.get("inTypeOfUser");
    window.electron.insert_User(addUsername,addPass,addTypeU);
  }

function update_User(formData: { get: (arg0: string) => any; }) {
    const upIdUser=formData.get("upIdUser");
    const upUsername=formData.get("upUsername");
    const upPass=formData.get("upPass");
    const upTypeU=formData.get("upTypeOfUser");
    window.electron.update_User(upIdUser,upUsername,upPass,upTypeU);
  }

  function insertTypeOfUser(formData: { get: (arg0: string) => any; }) {
    const addTypeUser=formData.get("inTypeUser");

    window.electron.insertTypeOfUser(addTypeUser);
  }
    function insertClinic(formData: { get: (arg0: string) => any; }) {
        const addClinicName=formData.get("insertClinicName");
        const addClinicAddress=formData.get("insertClinicAddress");

        window.electron.insertClinic(addClinicName,addClinicAddress);
    }


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

  function updateDoc_Clinic(formData: { get: (arg0: string) => any; }) {
    const upIdD_C=formData.get("upIdD_C");
    const updateIdDoc_Clinic=formData.get("upDoc_Clinic");
    const updateIdClinic_Doc=formData.get("upClinic_Doc");
    const cabinet=formData.get("upCabinet");

    window.electron.updateDoc_Clinic(upIdD_C,updateIdDoc_Clinic,updateIdClinic_Doc,cabinet);
  }
    function updateDoc_Spec(formData: { get: (arg0: string) => any; }) {
      const idD_S=formData.get("upIdD_S");
        const updateDoctor=formData.get("upDoc_Speci");
        const updateSpec=formData.get("upSpec_Doc");

        window.electron.updateDoc_Spec(idD_S,updateDoctor,updateSpec);
    }

    function insertDoctor(formData: { get: (arg0: string) => any; }) {
    const inFirstName=formData.get("inFirstName");
    const inMiddleName=formData.get("inMiddleName");
    const inLastName=formData.get("inLastName");
    const inDoc_Spec=formData.get("inDoc_Spec");
    const inDoc_Tel=formData.get("inDoc_Tel");
    const inDoc_User=formData.get("inDoc_User");
    if (users.find((user)=>user.username===inDoc_User&&user.userType===2)) {
      
      window.electron.insertDoctor(inFirstName,inMiddleName,inLastName,inDoc_Spec,inDoc_Tel,inDoc_User);
    }
    else{
      alert("This user doesn't exist")
    }
  }

  function insertDoc_Clinic(formData: { get: (arg0: string) => any; }) {
    const addIdDoc_Clinic=formData.get("inDoc_Clinic");
    const addIdClinic_Doc=formData.get("inClinic_Doc");
    const cabinet=formData.get("inCabinet");

    window.electron.insertDoc_Clinic(addIdDoc_Clinic,addIdClinic_Doc,cabinet);
  }
    function insert_Doc_Spec(formData: { get: (arg0: string) => any; }) {
        const addDoctor=formData.get("inDoc_Speci");
        const addSpec=formData.get("inSpec_Doc");

        window.electron.insertDoc_Spec(addDoctor,addSpec);
    }

    function updateClinic(formData: { get: (arg0: string) => any; }) {
        const idClinic=formData.get("idClinic");
        const clinicName=formData.get("updateClinicName");
        const clinicAddress=formData.get("updateClinicAddress");

        window.electron.updateClinic(idClinic,updateClinicName,updateClinicAddress);
    }

  function addSpec(formData: { get: (arg0: string) => any; }) {
      const addSpecName = formData.get("addSpecName");
      window.electron.getSpec(addSpecName);
    }
  
    function updateSpec(formData: { get: (arg0: string) => any; }) {
      const idSpec=formData.get("idSpec");
      const specname=formData.get("specname");
      window.electron.updateSpec(idSpec,specname);
    }
  function returnApp() {
   createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 
  }

  return(
    <>
    
<div>
      <h1>Schedules</h1>
      <ul>{schedules.map((schedule,idx)=>(
        <li key={idx}>{JSON.stringify(schedule)}</li>
      ))}</ul>
    </div>

<div>
      <h1>Types</h1>
      <ul>{types.map((type,idx)=>(
        <li key={idx}>{JSON.stringify(type)}</li>
      ))}</ul>
    </div>
    
    <div>
      <h1>Purpose</h1>
      <ul>{purposes.map((purpose,idx)=>(
        <li key={idx}>{JSON.stringify(purpose)}</li>
      ))}</ul>
    </div>

    <div>
      <h1>Stage</h1>
      <ul>{stages.map((stage,idx)=>(
        <li key={idx}>{JSON.stringify(stage)}</li>
      ))}</ul>
    </div>
    
    {/* <div>
      <h1>Users</h1>
      <ul>{users.map((user,idx)=>(
        <li key={idx}>{JSON.stringify(user)}</li>
      ))}</ul>
    </div> */}

    <div>
      <h1>Type_Purpose</h1>
      <ul>{type_purposes.map((type_purpose,idx)=>(
        <li key={idx}>{JSON.stringify(type_purpose)}</li>
      ))}</ul>
    </div>


    <div>
      <h1>Doctors</h1>
      <ul>{doctors.map((doctor,idx)=>(
        <li key={idx}>{JSON.stringify(doctor)}</li>
      ))}</ul>
    </div>
    
    <div>
      <h1>Doctor's clinic</h1>
      <ul>{doc_clinics.map((doc_clinic,idx)=>(
        <li key={idx}>{JSON.stringify(doc_clinic)}</li>
      ))}</ul>
    </div>

    <div>
      <h1>Doctor's specialization</h1>
      <ul>{doc_specs.map((doc_spec,idx)=>(
        <li key={idx}>{JSON.stringify(doc_spec)}</li>
      ))}</ul>
    </div>
    
    <div>
      <h1>Users</h1>
      <ul>{users.map((user,idx)=>(
        <li key={idx}>{JSON.stringify(user)}</li>
      ))}</ul>
    </div>

    <div>
      <h1>Types Of Users</h1>
      <ul>{allTypesOfUsers.map((typeOfUser,idx)=>(
        <li key={idx}>{JSON.stringify(typeOfUser)}</li>
      ))}</ul>
    </div>

    <div>
        <h1>Clinics</h1>
        <ul>
            {clinics.map((clinic,idx)=>(
                <li key={idx}>{JSON.stringify(clinic)}</li>
            ))}
        </ul>
    </div>

    <div>
      <h1>
        Specialization
      </h1>
      <ul>
        {specs.map((spec,idx)=>(
          <li key={idx}>{JSON.stringify(spec)}</li>
        ))}
      </ul>
    </div>

<div>
        <form action={insertType}>
            <input type="text" name="inTypeName" onChange={(e)=>insertTypeName(e.target.value)} />
            <input type="submit" value="Insert Type" />
        </form>

        {/* <form action={updateDoctor}>
            <input type="number" name="upIdDoc" onChange={(e)=>updateIdDoc(e.target.value)}/>
            <input type="text" name="upFirstName" onChange={(e)=>updateFirstName(e.target.value)} />
            <input type="text" name="upMiddleName" onChange={(e)=>updateMiddleName(e.target.value)} />
            <input type="text" name="upLastName" onChange={(e)=>updateLastName(e.target.value)} />
            <input type="text" name='upDoc_User' onChange={(e)=>updateDoc_User(e.target.value)}/>
            <select name="upDoctor_Spec">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="tel" name="upDoc_Tel" onChange={(e)=>updateDoc_Tel(e.target.value)} />
            <input type="submit" value="Update Doctor" />
        </form> */}
    </div>

    <div>
        <form action={insertPurpose}>
        <input type="text" name='inPurposeName' onChange={(e)=>insertPurposeName(e.target.value)}/>
        <input type="number" name="inDuration" onChange={(e)=>insertDuration(e.target.value)} />
            <input type="submit" value="Insert Purpose" />
        </form>

        {/* <form action={updateDoc_Clinic}>
            <input type="number" name="upIdD_C" onChange={(e)=>updateIdD_C(e.target.value)}/>
        <input type="text" name='upCabinet' onChange={(e)=>updateCabinet(e.target.value)}/>
            <input type="submit" value="Update Doctor's clinic" />
        </form> */}
    </div>

 <div>
        <form action={insertType_Purpose}>
          <select name="inIdType">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select>  
            <select name="inIdPurpose">
          {purposes.map((purpose)=>(
            <option key={purpose.idPurpose} value={purpose.idPurpose}>
              {purpose.purposeName}
            </option>
          ))}
        </select> 
            <select name="inIdStage">
          {stages.map((stage)=>(
            <option key={stage.idStage} value={stage.idStage}>
              {stage.stageName}
            </option>
          ))}
        </select>
            <input type="submit" value="Insert Type_Purpose" />
        </form>

        {/* <form action={updateDoc_Spec}>
            <input type="number" name="idClinic" onChange={(e)=>setIdClinic(e.target.value)}/>
            <select name="upDoc_Speci">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>  
            <select name="upSpec_Doc">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="submit" value="Update Doctor's specialization" />
        </form> */}
    </div>

  <div>
    <form action={insertSchedule}>
      <select name="inDoctor_Clinic">
          {doc_clinics.map((doc_clinic)=>(
            <option key={doc_clinic.idDoc_Clinic} value={doc_clinic.idDoc_Clinic}>
              {doc_clinic.idDoc_Clinic}
            </option>
          ))}
        </select>  
      <input type="time" name="inBeginningTime" onChange={(e)=>insertBeginningTime(e.target.value)}/>
      <input type="time" name="inFinishTime" onChange={(e)=>insertFinishTime(e.target.value)}/>
      <input type="date" name="inData" onChange={(e)=>insertData(e.target.value)}/>
      <select name="inIdTy">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select> 
      <input type="submit" value="Insert Schedule" />
    </form>
  </div>

    <div>
      <form action={insertStage}>
        <input type="text" name="inStageName" onChange={(e)=>insertStageName(e.target.value)}/>
        <input type="submit" value="Insert Stage" />
      </form>
    </div>

<div>
      {/* <form action={update_User}>
        <input type="number" name="upIdUser"/>
        <input type="text" name="upUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="submit" value="Update User" />
      </form> */}
    </div>
{/* 
    <div>
      <form action={insertType_Purpose}>
        <input type="text" name="inTypeUser" onChange={(e)=>insertTypeUser(e.target.value)} />
        
        <input type="submit" value="Insert Type Of User" />
      </form>
    </div> */}


    <div>
        <form action={insertDoctor}>
            <input type="text" name="inFirstName" onChange={(e)=>insertFirstName(e.target.value)} />
            <input type="text" name="inMiddleName" onChange={(e)=>insertMiddleName(e.target.value)} />
            <input type="text" name="inLastName" onChange={(e)=>insertLastName(e.target.value)} />
            <input type="text" name='inDoc_User' onChange={(e)=>insertDoc_User(e.target.value)}/>
            <select name="inDoc_Spec">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="tel" name="inDoc_Tel" onChange={(e)=>insertDoc_Tel(e.target.value)} />
            <input type="submit" value="Insert Doctor" />
        </form>

        <form action={updateDoctor}>
            <input type="number" name="upIdDoc" onChange={(e)=>updateIdDoc(e.target.value)}/>
            <input type="text" name="upFirstName" onChange={(e)=>updateFirstName(e.target.value)} />
            <input type="text" name="upMiddleName" onChange={(e)=>updateMiddleName(e.target.value)} />
            <input type="text" name="upLastName" onChange={(e)=>updateLastName(e.target.value)} />
            <input type="text" name='upDoc_User' onChange={(e)=>updateDoc_User(e.target.value)}/>
            <select name="upDoctor_Spec">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="tel" name="upDoc_Tel" onChange={(e)=>updateDoc_Tel(e.target.value)} />
            <input type="submit" value="Update Doctor" />
        </form>
    </div>

    <div>
        <form action={insertDoc_Clinic}>
            <select name="inDoc_Clinic">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>
        <select name="inClinic_Doc">
          {clinics.map((clinic)=>(
            <option key={clinic.idClinic} value={clinic.idClinic}>
              {clinic.nameOfClinic}
            </option>
          ))}
        </select>
        <input type="text" name='inCabinet' onChange={(e)=>insertCabinet(e.target.value)}/>
            <input type="submit" value="Insert Doctor Clinic" />
        </form>

        <form action={updateDoc_Clinic}>
            <input type="number" name="upIdD_C" onChange={(e)=>updateIdD_C(e.target.value)}/>
            <select name="upDoc_Clinic">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>
        <select name="upClinic_Doc">
          {clinics.map((clinic)=>(
            <option key={clinic.idClinic} value={clinic.idClinic}>
              {clinic.nameOfClinic}
            </option>
          ))}
        </select>
        <input type="text" name='upCabinet' onChange={(e)=>updateCabinet(e.target.value)}/>
            <input type="submit" value="Update Doctor's clinic" />
        </form>
    </div>

 <div>
        <form action={insert_Doc_Spec}>
          <select name="inDoc_Speci">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>  
            <select name="inSpec_Doc">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="submit" value="Insert Doctor" />
        </form>

        <form action={updateDoc_Spec}>
            <input type="number" name="idClinic" onChange={(e)=>setIdClinic(e.target.value)}/>
            <select name="upDoc_Speci">
          {doctors.map((doctor)=>(
            <option key={doctor.idDoc} value={doctor.idDoc}>
              {doctor.firstName} {doctor.middleName} {doctor.lastName}
            </option>
          ))}
        </select>  
            <select name="upSpec_Doc">
          {specs.map((specialization)=>(
            <option key={specialization.id} value={specialization.id}>
              {specialization.specName}
            </option>
          ))}
        </select>
            <input type="submit" value="Update Doctor's specialization" />
        </form>
    </div>

    <div>
      <form action={insert_User}>
        <input type="text" name="inUsername" onChange={(e)=>insertUsername(e.target.value)}/>
        <input type="password" name="inPass" onChange={(e)=>insertPass(e.target.value)} />
        <select name="inTypeOfUser">
          {allTypesOfUsers.map((tyUser)=>(
            <option key={tyUser.idTypeUser} value={tyUser.idTypeUser}>
              {tyUser.typeUserName}
            </option>
          ))}
        </select>
        <input type="submit" value="Insert User" />
      </form>
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

    <div>
      <form action={insertTypeOfUser}>
        <input type="text" name="inTypeUser" onChange={(e)=>insertTypeUser(e.target.value)} />
        <input type="submit" value="Insert Type Of User" />
      </form>
    </div>

    <div>
        <form action={insertClinic}>
            <input type="text" name="insertClinicName" onChange={(e)=>setAClinicName(e.target.value)} />
            <input type="text" name="insertClinicAddress" onChange={(e)=>setAClinicAddress(e.target.value)} />
            <input type="submit" value="Insert Clinic" />
        </form>

        <form action={updateClinic}>
            <input type="number" name="idClinic" onChange={(e)=>setIdClinic(e.target.value)}/>
            <input type="text" name="updateClinicName" onChange={(e)=>updateClinicNameF(e.target.value)} />
            <input type="text" name="updateClinicAddress" onChange={(e)=>updateClinicAddressF(e.target.value)} />
            <input type="submit" value="Update Clinic" />
        </form>
    </div>

    <div>
        <form action={addSpec}>
      <input type="text"name="addSpecName"onChange={(e)=>setASpecName(e.target.value)} />
      <input type="submit" value="Insert specialization"/>
    </form>
    <form action={updateSpec}>
      <input type="number" name="idSpec" onChange={(e)=>setIdSpec(e.target.value)}/>
      <input type="text"name="specname"onChange={(e)=>setNameSpec(e.target.value)} />
      <input type="submit" value="Update specialization"/>
    </form>
    </div>

    <form action={returnApp}>
      <button>Return Home</button>
    </form>
    </>
  )
}

export default Admin;