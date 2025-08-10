import React from 'react';
import { useEffect,StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App';

function Admin(){
  const[upIdAppointment,updateIdAppointment]=useState("");
  const[upDoc_Cl,updateDoc_Cl]=useState("");
  const[upTime,updateTime]=useState("");
  const[upDate,updateDate]=useState("");
  const[upTy_Pur,updateTy_Pur]=useState("");
  const[ty_purSchedules,allTy_PurSchedules]=useState<any[]>([]);
  const[doctorsSchedules,allDoctorSchedules]=useState<any[]>([]);

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
  
const[inTypeName,insertTypeName]=useState("");  
const[types,allTypes]=useState<any[]>([]);

const[upIdPurpose,updateIdPurpose]=useState("");
const[inPurposeName,insertPurposeName]=useState(""); const[upPurposeName,updatePurposeName]=useState("");
const[inDuration,insertDuration]=useState("");  const[upDuration,updateDuration]=useState("");   
const[purposes,allPurposes]=useState<any[]>([]);

const[inDoctor_Clinic,insertDoctor_Clinic]=useState("");
const[inBeginningTime,insertBeginningTime]=useState("");
const[inFinishTime,insertFinishTime]=useState("");
const[inData,insertData]=useState("");
const[inIdTy,insertIdTy]=useState("");
const[schedules,allSchedules]=useState<any[]>([]);

const[upIdSchedule,updateIdSchedule]=useState("");
const[upDoctor_Clinic,updateDoctor_Clinic]=useState("");
const[upBeginningTime,updateBeginningTime]=useState("");
const[upFinishTime,updateFinishTime]=useState("");
const[upData,updateData]=useState("");
const[upIdTy,updateIdTy]=useState("");

const[inStageName,insertStageName]=useState("");   

const[stages,allStages]=useState<any[]>([]);

const[inIdType,insertIdType]=useState(""); 
const[inIdPurpose,insertidPurpose]=useState("");  
const[inIdStage,insertIdStage]=useState("");
const[type_purposes,allType_Purpose]=useState<any[]>([]);

const[appointments,allAppointments]=useState<any[]>([]);

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

const[inStatusName,insertStatusName]=useState("");
const[statuses,allStatus]=useState<any[]>([]);

const[]=useState<any[]>([]);

 useEffect(()=>{
    window.electron.readTy_PurSchedule().then(allTy_PurSchedules);
  },[]);

     useEffect(()=>{
    window.electron.readDoctorSchedule().then(allDoctorSchedules);
  },[]);
  
  useEffect(()=>{
    window.electron.readAppointment().then(allAppointments);
  },[]);

  useEffect(()=>{
    window.electron.readPatient().then(allPatients);
  },[]);

  useEffect(()=>{
    window.electron.readStatus().then(allStatus);
  },[]);

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

  function updateAppointment(formData: { get: (arg0: string) => any; }) {
    const updaIdAppointment=formData.get("upIdAppointment");
    const updaDoc_Cl=formData.get("upDoc_Cl");
    const updaTime=formData.get("upTime");
    const updaDate=formData.get("upDate");
    const updaTy_Pur=formData.get("upTy_Pur");
    
    window.electron.updateAppointment(updaIdAppointment,updaDoc_Cl,1,updaTime,updaDate,updaTy_Pur,1);
  }

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
    
    if (users.find((user)=>user.username===addIdUser&&user.userType===3)) {
      window.electron.insertPatient(addFirstName,addMiddleName,addLastName,addAge,addEGN,addGender,addAddress,addTelephone,addIdUser);
    }
    
  }

  function insertStatus(formData: { get: (arg0: string) => any; }) {
    const addStatusName=formData.get("inStatusName");

    window.electron.insertStatus(addStatusName);
  }

    function insertPurpose(formData: { get: (arg0: string) => any; }) {
    const addPurposeName=formData.get("inPurposeName");
    const addDuration=formData.get("inDuration");

    window.electron.insertPurpose(addPurposeName,addDuration);
  }

  function updatePurpose(formData: { get: (arg0: string) => any; }) {
    const updaIdPurpose=formData.get("upIdPurpose");
    const updaPurposeName=formData.get("upPurposeName");
    const updaDuration=formData.get("upDuration");

    window.electron.updatePurpose(updaIdPurpose,updaPurposeName,updaDuration);
  }

  function insertSchedule(formData: { get: (arg0: string) => any; }){
    const addDoctor_Clinic=formData.get("inDoctor_Clinic");
    const addBeginningTime=formData.get("inBeginningTime");
    const addFinishTime=formData.get("inFinishTime");
    const addData=formData.get("inData");
    const addIdTy=formData.get("inIdTy");

    window.electron.insertSchedule(addDoctor_Clinic,addBeginningTime,addFinishTime,addData,addIdTy);
  }

    function updateSchedule(formData: { get: (arg0: string) => any; }){
    const updaIdSchedule=formData.get("upIdSchedule");
    const updaDoctor_Clinic=formData.get("upDoctor_Clinic");
    const updaBeginningTime=formData.get("upBeginningTime");
    const updaFinishTime=formData.get("upFinishTime");
    const updaData=formData.get("upData");
    const updaIdTy=formData.get("upIdTy");

    window.electron.updateSchedule(updaIdSchedule,updaDoctor_Clinic,updaBeginningTime,updaFinishTime,updaData,updaIdTy);
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
        alert(idD_S,updateDoctor,updateSpec);
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
      <h1>Appointments</h1>
      <ul>{appointments.map((appointment,idx)=>(
        <li key={idx}>{JSON.stringify(appointment)}</li>
      ))}</ul>
    </div>     

     <div>
      <h1>Patients</h1>
      <ul>{patients.map((patient,idx)=>(
        <li key={idx}>{JSON.stringify(patient)}</li>
      ))}</ul>
    </div>   

      <div>
      <h1>Status</h1>
      <ul>{statuses.map((status,idx)=>(
        <li key={idx}>{JSON.stringify(status)}</li>
      ))}</ul>
    </div>   

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
        <li key={idx}>{JSON.stringify(doc_clinic)
        }</li>
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

{/* const[inDoc_Cli,insertDoc_cli]=useState("");
const[inStat,insertStat]=useState(""); 
const[inTy_Pur,insertTy_Pur]=useState("");
*/}
  
  <div>
    <form action={insertPatient}>
      <input type="text" name="inFirstPName" onChange={(e)=>insertFirstPName(e.target.value)}/>
      <input type="text" name="inMiddlePName" onChange={(e)=>insertMiddlePName(e.target.value)}/>
      <input type="text" name="inLastPName" onChange={(e)=>insertLastPName(e.target.value)}/>
      <input type="number" name="inAge" onChange={(e)=>insertAge(e.target.value)}/>
      <input type="text" name="inEGN" onChange={(e)=>insertEGN(e.target.value)}/>
      <input type="text" name="inGender" onChange={(e)=>insertGender(e.target.value)}/>
      <input type="text" name="inAddress" onChange={(e)=>insertAddress(e.target.value)}/>
      <input type="tel" name="inTelephone" onChange={(e)=>insertTelephone(e.target.value)}/>
      <input type="text" name="inIdUser" onChange={(e)=>insertIdUser(e.target.value)}/>
      <input type="submit" value="Insert Patient" />
    </form>
  </div>

  <div>
    <form action={insertStatus}>
      <input type="text" name="inStatusName" onChange={(e)=>insertStatusName(e.target.value)}/>
      <input type="submit" value="Insert Status" />
    </form>
  </div>
<div>
        <form action={insertType}>
            <input type="text" name="inTypeName" onChange={(e)=>insertTypeName(e.target.value)} />
            <input type="submit" value="Insert Type" />
        </form>

        {/* <form action={updateDoctor}>
            
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
        </div>
        <div>
        <form action={updatePurpose}>
            <input type="number" name="upIdPurpose" onChange={(e)=>updateIdPurpose(e.target.value)}/>
            <input type="text" name='upPurposeName' onChange={(e)=>updatePurposeName(e.target.value)}/>
            <input type="number" name="upDuration" onChange={(e)=>updateDuration(e.target.value)} />
            <input type="submit" value="Update Purpose" />
        </form>
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
      </div>
        <form action={updateAppointment}>
            <input type="number" name="upIdAppointment" onChange={(e)=>updateIdAppointment(e.target.value)}/>
            <select name="upDoc_Cl">
          {doctorsSchedules.map((schedule)=>(
            <option key={schedule.doctor_clinic} value={schedule.doctor_clinic}>
              {schedule.firstName} {schedule.middleName} {schedule.lastName}
            </option>
          ))}
        </select>  
        <input type="time" name="upTime" onChange={(e)=>updateTime(e.target.value)} />
        <input type="date" name="upDate" onChange={(e)=>updateDate(e.target.value)} />
            <select name="upTy_Pur">
          {ty_purSchedules.map((schedule)=>(
            <option key={schedule.idType_Purpose} value={schedule.idType_Purpose}>
              {schedule.typeName} - {schedule.purposeName}
            </option>
          ))}
        </select>
            <input type="submit" value="Update Appointment" />
        </form>
    

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
    <form action={updateSchedule}>
      <input type="number" name="upIdSchedule" onChange={(e)=>updateIdSchedule(e.target.value)}/>
      <select name="upDoctor_Clinic">
          {doc_clinics.map((doc_clinic)=>(
            <option key={doc_clinic.idDoc_Clinic} value={doc_clinic.idDoc_Clinic}>
              {doc_clinic.idDoc_Clinic}
            </option>
          ))}
        </select>  
      <input type="time" name="upBeginningTime" onChange={(e)=>insertBeginningTime(e.target.value)}/>
      <input type="time" name="upFinishTime" onChange={(e)=>insertFinishTime(e.target.value)}/>
      <input type="date" name="upData" onChange={(e)=>insertData(e.target.value)}/>
      <select name="upIdTy">
          {types.map((type)=>(
            <option key={type.idType} value={type.idType}>
              {type.typeName}
            </option>
          ))}
        </select> 
      <input type="submit" value="Update Schedule" />
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
{/* const idD_S=formData.get("");
        const updateDoctor=formData.get("upDoc_Speci");
        const updateSpec=formData.get("upSpec_Doc");
        alert(idD_S,updateDoctor,updateSpec); */}
        <form action={updateDoc_Spec}>
            <input type="number" name="upIdD_S" onChange={(e)=>updateIdD_S(e.target.value)}/>
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