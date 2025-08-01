import { ipcRenderer } from "electron/renderer";
import { insertDoc_Clinic, insertDoc_Spec, insertDoctor, insertPurpose, insertStage, insertType, insertTypeOfUser, updateDoc_Clinic, updateDoc_Spec, updateDoctor } from "../database/db";

const electron=require('electron');

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics:(callback: (arg0: SendInfo) => void)=>{
       return ipcOn("sendInfo",(num)=>{
        callback(num) 
       }) 
    },
    createChildWindow:()=>ipcRenderer.invoke('open-child-window'),
    readSpec:()=>ipcRenderer.invoke('read-spec'),
    readAppointment:()=>ipcRenderer.invoke('read-appointment'),
    readClinic:()=>ipcRenderer.invoke('read-clinic'),
    readDoctor:()=>ipcRenderer.invoke('read-doctor'),
    readDoc_Clinic:()=>ipcRenderer.invoke('read-doctor-clinic'),
    readDoc_Spec:()=>ipcRenderer.invoke('read-doctor-spec'),
    readPatinet:()=>ipcRenderer.invoke('read-patinet'),
    readPurpose:()=>ipcRenderer.invoke('read-purpose'),
    readSchedule:()=>ipcRenderer.invoke('read-schedule'),
    readStage:()=>ipcRenderer.invoke('read-stage'),
    readStatus:()=>ipcRenderer.invoke('read-status'),
    readType:()=>ipcRenderer.invoke('read-type'),
    readTypeOfUser:()=>ipcRenderer.invoke('read-type-user'),
    readType_Purpose:()=>ipcRenderer.invoke('read-type-purpose'),
    readUser:()=>ipcRenderer.invoke('read-user'),
    getSpec:(specName:string)=>ipcRenderer.invoke('insert-spec',specName),
    insertClinic:(clinicName:string,clinicAddress:string)=>ipcRenderer.invoke('insert-clinic',clinicName,clinicAddress),
    insertAppointment:(doc_cli:number, status:number,time:Date,date:Date,ty_pur:number,idPatient:number)=>ipcRenderer.invoke('insert-appointment',doc_cli,status,time,date,ty_pur,idPatient),
    insertDoctor:(firstName:string,middleName:string,lastName:string,docSpecialization:number,docTelephone:string,docUser:number)=>ipcRenderer.invoke('insert-doctor',firstName,middleName,lastName,docSpecialization,docTelephone,docUser),
    insertDoc_Clinic:(idDoc_D_C:number,idClinic_D_C:number,cabinet:string)=>ipcRenderer.invoke('insert-doc-clinic',idDoc_D_C,idClinic_D_C,cabinet),
    insertDoc_Spec:(idDoc_D_S:number,idSpec_D_S:number)=>ipcRenderer.invoke('insert-doc-spec',idDoc_D_S,idSpec_D_S),
    insertPatient:(firstName:string,middleName:string,lastName:string,age:number,EGN:string,gender:string,address:string,telephone:string,idUser:number)=>ipcRenderer.invoke('insert-patient',firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser),
    insertPurpose:(purposeName:string,duration:number)=>ipcRenderer.invoke('insert-purpose',purposeName,duration),
    insertSchedule:(doctor_clinic:number,beginningTime:Date,finishTime:Date,data:Date,idType:number)=>ipcRenderer.invoke('insert-schedule',doctor_clinic,beginningTime,finishTime,data,idType),
    insertStage:(stageName:string)=>ipcRenderer.invoke('insert-stage',stageName),
    insertStatus:(statusName:string)=>ipcRenderer.invoke('insert-status',statusName),
    insertType:(typeName:string)=>ipcRenderer.invoke('insert-type',typeName),
    insertTypeOfUser:(userTypeName:string)=>ipcRenderer.invoke('insert-type-user',userTypeName),
    insertType_Purpose:(idType:number,idPurpose:number,idStage:number)=>ipcRenderer.invoke('insert-type-purpose',idType,idPurpose,idStage),
    insert_User:(username:string,password:string,typeOfUser:number)=>ipcRenderer.invoke('insert-user'),
    updateSpec:(idNum:number,specName:string)=>ipcRenderer.invoke('update-spec',idNum,specName),
    updateClinic:(idClinic:number,updateClinicName:string,updateClinicAddress:string)=>ipcRenderer.invoke('update-clinic',idClinic,updateClinicName,updateClinicAddress),
    updateDoctor:(idDoc:number,firstName:string,middleName:string,lastName:string,docSpecialization:number,docTelephone:string,docUser:number)=>ipcRenderer.invoke('update-doctor',idDoc,firstName,middleName,lastName,docSpecialization,docTelephone,docUser),
    updateDoc_Clinic:(idD_C:number,idDoc_D_C:number,idClinic_D_C:number,cabinet:string)=>ipcRenderer.invoke('update-doctor-clinic',idD_C,idDoc_D_C,idClinic_D_C,cabinet),
    updateDoc_Spec:(idD_S:number,idDoc_D_S:number,idSpec_D_S:number)=>ipcRenderer.invoke('update-doctor-spec',idD_S,idDoc_D_S,idSpec_D_S),
    updatePurpose:(idPurpose:number,purposeName:string,duration:Date)=>ipcRenderer.invoke('update-purpose',idPurpose,purposeName,duration),
    update_User:(upIdUser:number,upUsername:string,upPass:string,upTypeOfUser:number)=>ipcRenderer.invoke('update-user',upIdUser,upUsername,upPass,upTypeOfUser),
    // getA:()=>ipcInvoke('getA'),
}//satisfies Window['electron']
);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
    key:Key
):Promise<EventPayloadMapping[Key]>{return electron.ipcRenderer.invoke(key);}

function ipcOn<Key extends keyof EventPayloadMapping>(
    key:Key,
    callback:(payload:EventPayloadMapping[Key])=>void
){
    const cb=(_: Electron.IpcRendererEvent,payload: any)=>callback(payload);
    electron.ipcRenderer.on(key,cb);
    return ()=>electron.ipcRenderer.off(key,cb);
}