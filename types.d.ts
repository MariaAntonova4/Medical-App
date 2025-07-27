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
        readClinic:()=>Promise<any>;
        readDoctor:()=>Promise<any>;
        readDoc_Clinic:()=>Promise<any>;
        readDoc_Spec:()=>Promise<any>;
        readPurpose:()=>Promise<any>;
        readSchedule:()=>Promise<any>;
        readStage:()=>Promise<any>;
        readType:()=>Promise<any>;
        readTypeOfUser:()=>Promise<any>;
        readType_Purpose:()=>Promise<any>;
        readUser:()=>Promise<any>;
        getSpec:(specName)=>Promise<any>;
        insertClinic:(clinicName,clinicAddress)=>Promise<any>;
        insertDoctor:(firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>Promise<any>;
        insertDoc_Clinic:(idDoc_D_C,idClinic_D_C,cabinet)=>Promise<any>;
        insertDoc_Spec:(idDoc_D_S,idSpec_D_S)=>Promise<any>;
        insertPurpose:(purposeName,duration)=>Promise<any>;
        insertSchedule:(doctor_clinic,beginningTime,finishTime,data,idType)=>Promise<any>;
        insertStage:(stageName)=>Promise<any>;
        insertType:(typeName)=>Promise<any>;
        insertTypeOfUser:(userTypeName)=>Promise<any>;
        insertType_Purpose:(idType,idPurpose,idStage)=>Promise<any>;
        insert_User:(username,password,typeOfUser)=>Promise<any>;
        updateClinic:(idClinic,updateClinicName,updateClinicAddress)=>Promise<any>;
        updateDoc_Clinic:(idD_C,idDoc_D_C,idClinic_D_C,cabinet)=>Promise<any>;
        updateDoc_Spec:(idD_S,idDoc_D_S,idSpec_D_S)=>Promise<any>;
        updateDoctor:(idDoc,firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>Promise<any>;
        updateSpec:(idNum,specName)=>Promise<any>;
        update_User:(upIdUser,upUsername,upPass,upTypeU)=>Promise<any>;
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