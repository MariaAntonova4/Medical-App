import { insertDoc_Clinic, insertDoc_Spec, insertDoctor, insertSchedule } from "./src/database/db";

 export{}
declare global{
 type SendInfo={
    num:number
};
type Atype={
    num:number
    exampleString:string
};
type UnsubscribeFunction=()=>void;


   interface Window{
    electron:{
        subscribeStatistics:(callback:(sendInfo:SendInfo)=>void)=>UnsubscribeFunction;
        getA:()=>Promise<Atype>;
        readSpec:()=>Promise<any>;
        readAppointment:()=>Promise<any>;
        readDateAppointment:(date)=>Promise<any>;
        readDoctor_ClinicAppointment:(doctor_clinic,date)=>Promise<any>;
        readUserAppointment:(idUser)=>Promise<any>;
        readMakeAppointment:(doctor_clinic,time,date)=>Promise<any>;
        readClinic:()=>Promise<any>;
        readDoctor:()=>Promise<any>;
        readDoc_Clinic:()=>Promise<any>;
        readDoctorDoc_Clinic:(doctor)=>Promise<any>,
        readDoc_Spec:()=>Promise<any>;
        readPatient:()=>Promise<any>;
        readPurpose:()=>Promise<any>;
        readSchedule:()=>Promise<any>;
        readTy_PurSchedule:()=>Promise<any>;
        readDoctorSchedule:()=>Promise<any>;
        readDoctorDateSchedule:(doctor,date)=>Promise<any>;
        readStage:()=>Promise<any>;
        readStatus:()=>Promise<any>;
        readType:()=>Promise<any>;
        readTypeOfUser:()=>Promise<any>;
        readType_Purpose:()=>Promise<any>;
        readUser:()=>Promise<any>;
        getSpec:(specName)=>Promise<any>;
        insertClinic:(clinicName,clinicAddress)=>Promise<any>;
        insertAppointment:(doc_cli, status,time,date,ty_pur,idPatient)=>Promise<any>;
        insertDoctor:(firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>Promise<any>;
        insertDoc_Clinic:(idDoc_D_C,idClinic_D_C,cabinet)=>Promise<any>;
        insertDoc_Spec:(idDoc_D_S,idSpec_D_S)=>Promise<any>;
        insertPatient:(firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser)=>Promise<any>;
        insertPurpose:(purposeName,duration)=>Promise<any>;
        insertSchedule:(doctor_clinic,beginningTime,finishTime,data,idType)=>Promise<any>;
        insertStage:(stageName)=>Promise<any>;
        insertStatus:(statusName)=>Promise<any>;
        insertType:(typeName)=>Promise<any>;
        insertTypeOfUser:(userTypeName)=>Promise<any>;
        insertType_Purpose:(idType,idPurpose,idStage)=>Promise<any>;
        insert_User:(username,password,typeOfUser)=>Promise<any>;
        updateAppointment:(idAppointment,doc_cli, status,time,date,ty_pur,idPatient)=>Promise<any>;
        updateClinic:(idClinic,updateClinicName,updateClinicAddress)=>Promise<any>;
        updateDoc_Clinic:(idD_C,idDoc_D_C,idClinic_D_C,cabinet)=>Promise<any>;
        updateDoc_Spec:(idD_S,idDoc_D_S,idSpec_D_S)=>Promise<any>;
        updateDoctor:(idDoc,firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>Promise<any>;
        updatePatient:(idPatient,firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser)=>Promise<any>;
        updatePurpose:(idPurpose,purposeName,duration)=>Promise<any>;
        updateSchedule:(upIdSchedule,upDoc_Cli,upBeginningTime,upFinishTime, upDate, upType)=>Promise<any>;
        updateSpec:(idNum,specName)=>Promise<any>;
        updateStage:(idStage,stageName)=>Promise<any>;
        updateStatus:(idStatus,statusName)=>Promise<any>;
        updateType:(idType,typeName)=>Promise<any>;
        updateType_Purpose:(idType_Purpose,idType,idPurpose,idStage)=>Promise<any>;
        updateTypeUser:(idTypeUser,typeUserName)=>Promise<any>;
        update_User:(upIdUser,upUsername,upPass,upTypeU)=>Promise<any>;
        deleteAppointment:(idAppointment)=>Promise<any>;
        deleteClinic:(idClinic)=>Promise<any>;
        deleteDoctor:(idDoctor)=>Promise<any>;
        deletePatient:(idPatient)=>Promise<any>;
        deleteTypeOfUser:(idTypeOfUser)=>Promise<any>;
        deleteUser:(idUser)=>Promise<any>;
        createChildWindow:()=>Promise<any>;
    }
}  


type Person={
    name:string
}
type EventPayloadMapping = {
  sendInfo: SendInfo;
  getA: Atype;
  changeView: View;
  sendFrameAction: FrameWindowAction;
};
 interface Specialization{
    id:number|null,
    specName:string;
}} 