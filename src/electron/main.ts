import {app,BrowserWindow, ipcMain, MenuItemConstructorOptions,Menu}from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './util.js';
import { pollResources,getA } from './resourceManager.js';
import { getAssetPath, getPreloadPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';
import  sqlite3  from 'sqlite3';
import { getAllSpec, setSpec, updateSpec,insertClinic,getAllClinics,updateClinic, insertTypeOfUser, getAllTypesOfUsers
, insert_User, update_User, insertDoctor, insertDoc_Clinic, insertDoc_Spec, getAllUsers, getAllDoctors, getAllDoc_Clinic,
getAllDoc_Spec, updateDoc_Spec, updateDoc_Clinic, updateDoctor, insertPurpose, insertStage, insertType, insertType_Purpose
, getAllTypes, getAllStage, getAllPurpose, getAllType_Purpose, insertSchedule, getAllSchedule, insertAppointment, 
insertPatient, insertStatus, getAllAppointments, getAllPatinets, getAllStatus,getAllDoctor_ClinicAppointments,
updatePurpose,getAllDoctorDoc_Clinic,getMakeAppointment,getAllDoctorDateSchedule,getAllUserAppointments,updateType,
getAllTy_PurSchedule, getAllDateAppointments,deleteAppointment,updatePatient,updateType_Purpose,updateTypeOfUser,
getAllDoctorSchedule,updateStage,updateStatus,deleteClinic,deleteDoctor,deletePatient,deleteTypeOfUser,deleteUser,
updateSchedule,insertPatientUser,insertDoctorUser,
updateAppointment} from "../database/db.js";


app.on('ready',()=>{
    const mainWindow=new BrowserWindow({
        webPreferences:{
            preload:getPreloadPath()
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:7842/');
    }else{
        mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
    }

    pollResources(mainWindow);
    ipcMainHandle('getA',()=>{
        return getA();
    });
    createTray(mainWindow);
    //handleCloseEvents(mainWindow);

    //ipcMain.handle('open-child-window',()=>createChildWindow());
    ipcMain.handle('insert-spec',(event,specName)=>setSpec(specName));
    ipcMain.handle('insert-appointment',(event,doc_cli,status,time,date,ty_pur,idPatient)=>insertAppointment(doc_cli,status,time,date,ty_pur,idPatient));
    ipcMain.handle('insert-clinic',(event,clinicName, clinicAddress)=>insertClinic(clinicName,clinicAddress));
    ipcMain.handle('insert-doctor',(event,firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>insertDoctor(firstName,middleName,lastName,docSpecialization,docTelephone,docUser));
            ipcMain.handle('add-doctor', async (_event,data1,data2) => {
      try {
        await insertDoctorUser(data1,data2);
        return { success: true };
      } catch (error:any) {
        return { success: false, error: error.message };
      }
    });
    ipcMain.handle('insert-doc-clinic',(event,idDoc_D_C,idClinic_D_C,cabinet)=>insertDoc_Clinic(idDoc_D_C,idClinic_D_C,cabinet));
    ipcMain.handle('insert-doc-spec',(event,idDoc_D_S,idSpec_D_S)=>insertDoc_Spec(idDoc_D_S,idSpec_D_S));
    ipcMain.handle('insert-patient',(event,firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser)=>insertPatient(firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser));
        ipcMain.handle('add-patient', async (_event,data1,data2) => {
      try {
        await insertPatientUser(data1,data2);
        return { success: true };
      } catch (error:any) {
        return { success: false, error: error.message };
      }
    });
    ipcMain.handle('insert-purpose',(event,purposeName,duration)=>insertPurpose(purposeName,duration));
    ipcMain.handle('insert-schedule',(event,doctor_clinic,beginningTime,finishTime,data,idType)=>insertSchedule(doctor_clinic,beginningTime,finishTime,data,idType));
    ipcMain.handle('insert-stage',(event,stageName)=>insertStage(stageName));
    ipcMain.handle('insert-status',(event,statusName)=>insertStatus(statusName));
    ipcMain.handle('insert-type',(event,typeName)=>insertType(typeName));
    ipcMain.handle('insert-type-user',(event,userTypeName)=>insertTypeOfUser(userTypeName));
    ipcMain.handle('insert-type-purpose',(event,idType,idPurpose,idStage)=>insertType_Purpose(idType,idPurpose,idStage));
    ipcMain.handle('insert-user',(event,userName,pass,userType)=>insert_User(userName,pass,userType));
    ipcMain.handle('update-spec',(event,idNum,specName)=>updateSpec(idNum,specName));
    ipcMain.handle('update-appointment',(event,idAppointment,doc_cli, status,time,date,ty_pur,idPatient)=>updateAppointment(idAppointment,doc_cli, status,time,date,ty_pur,idPatient));
    ipcMain.handle('update-clinic',(event,idClinic,updateClinicName,updateClinicAddress)=>updateClinic(idClinic,updateClinicName,updateClinicAddress));
    ipcMain.handle('update-doctor',(event,idDoc,firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>updateDoctor(idDoc,firstName,middleName,lastName,docSpecialization,docTelephone,docUser));
    ipcMain.handle('update-doctor-clinic',(event,idD_C,idDoc_D_C,idClinic_D_C,cabinet)=>updateDoc_Clinic(idD_C,idDoc_D_C,idClinic_D_C,cabinet));
    ipcMain.handle('update-doctor-spec',(event,idD_S,idDoc_D_S,idSpec_D_S)=>updateDoc_Spec(idD_S,idDoc_D_S,idSpec_D_S));
    ipcMain.handle('update-patient',(event,idPatient,firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser)=>updatePatient(idPatient,firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser));
    ipcMain.handle('update-purpose',(event,idPurpose,purposeName,duration)=>updatePurpose(idPurpose,purposeName,duration));
    ipcMain.handle('update-schedule',(event,upIdSchedule,upDoc_Cli,upBeginningTime,upFinishTime, upDate, upType)=>updateSchedule(upIdSchedule,upDoc_Cli,upBeginningTime,upFinishTime, upDate, upType));
    ipcMain.handle('update-stage',(event,upIdStage,upStageName)=>updateStage(upIdStage,upStageName));
    ipcMain.handle('update-status',(event,upIdStatus,upStatusName)=>updateStatus(upIdStatus,upStatusName));
    ipcMain.handle('update-type',(event,idType,typeName)=>updateType(idType,typeName));
    ipcMain.handle('update-type-purpose',(event,idType_Purpose,idType,idPurpose,idStage)=>updateType_Purpose(idType_Purpose,idType,idPurpose,idStage));
    ipcMain.handle('update-type-user',(event,idTypeUser,typeUserName)=>updateTypeOfUser(idTypeUser,typeUserName));
    ipcMain.handle('update-user',(event,upIdUser,upUsername,upPass,upTypeOfUser)=>update_User(upIdUser,upUsername,upPass,upTypeOfUser));
    ipcMain.handle('delete-appointment',(event,idAppointment)=>deleteAppointment(idAppointment));
        ipcMain.handle('delete-clinic',(event,idClinic)=>deleteClinic(idClinic));
        ipcMain.handle('delete-doctor',(event,idDoctor)=>deleteDoctor(idDoctor));
        ipcMain.handle('delete-patient',(event,idPatient)=>deletePatient(idPatient));
        ipcMain.handle('delete-type-user',(event,idTypeUser)=>deleteTypeOfUser(idTypeUser));
        ipcMain.handle('delete-user',(event,idUser)=>deleteUser(idUser));
    ipcMain.handle('read-spec',async()=>{
        const specs=await getAllSpec();
        return specs;
    });
    ipcMain.handle('read-clinic',async()=>{
            const clinics=await getAllClinics();
            return clinics;
        });
    ipcMain.handle('read-type-user',async()=>{
        const typesOfUsers=await getAllTypesOfUsers();
        return typesOfUsers;
    });
        ipcMain.handle('read-user',async()=>{
        const users=await getAllUsers();
        return users;
    });

 ipcMain.handle('read-type',async()=>{
            const type=await getAllTypes();
            return type;
        });
    ipcMain.handle('read-stage',async()=>{
        const stage=await getAllStage();
        return stage;
    });
        ipcMain.handle('read-purpose',async()=>{
        const purpose=await getAllPurpose();
        return purpose;
    });

        ipcMain.handle('read-type-purpose',async()=>{
        const type_purpose=await getAllType_Purpose();
        return type_purpose;
    });
        ipcMain.handle('read-schedule',async()=>{
        const users=await getAllSchedule();
        return users;
    });
        ipcMain.handle('read-ty-pur-schedule',async()=>{
        const users=await getAllTy_PurSchedule();
        return users;
    });
    ipcMain.handle('read-doc-schedule',async()=>{
        const users=await getAllDoctorSchedule();
        return users;
    });

     ipcMain.handle('read-doc-date-schedule',async(event,doctor,date)=>{
        const users=await getAllDoctorDateSchedule(doctor,date);
        return users;
    });

     ipcMain.handle('read-doctor',async()=>{
                const doctor=await getAllDoctors();
                return doctor;
            });
    ipcMain.handle('read-doctor-clinic',async()=>{
            const doc_Clinics=await getAllDoc_Clinic();
            return doc_Clinics;
        });
         ipcMain.handle('read-doc-doctor-clinic',async(event,doctor)=>{
                    const doc_Clinics=await getAllDoctorDoc_Clinic(doctor);
                    return doc_Clinics;
                });
    ipcMain.handle('read-doctor-spec',async()=>{
            const doc_Spec=await getAllDoc_Spec();
            return doc_Spec;
        });

    ipcMain.handle('read-appointment',async()=>{
        const doctor=await getAllAppointments();
        return doctor;
    });
    ipcMain.handle('read-date-appointment',(event,date)=>{
        const dateAppointment=getAllDateAppointments(date);
        return dateAppointment;
    });
    ipcMain.handle('read-user-appointment',(event,idUser)=>{
        const userAppointment=getAllUserAppointments(idUser);
        return userAppointment;
    });
    ipcMain.handle('read-doctor-clinic-appointment',(event,doctor_clinic,date)=>{
                    const doctorAppointment=getAllDoctor_ClinicAppointments(doctor_clinic,date);
                    return doctorAppointment;
                });

    ipcMain.handle('read-make-appointment',(event,doctor_clinic,time,date)=>{
                        const makeAppointment=getMakeAppointment(doctor_clinic,time,date);
                        return makeAppointment;
                    });

    ipcMain.handle('read-patient',async()=>{
            const doc_Clinics=await getAllPatinets();
            return doc_Clinics;
        });
    ipcMain.handle('read-status',async()=>{
            const doc_Spec=await getAllStatus();
            return doc_Spec;
        });

// const adminMenu = [
//   {
//     label: 'Добавяне',
//     submenu: [
//       { label: 'Добавяне на график',click:()=>createInsertScheduleWindow()},
//       { label: 'Добавяне на доктор',click:()=>createInsertDoctorWindow()},
//       { label: 'Добавяне на докторска клиника',click:()=>createInsertDoctorClinicWindow()},
//       { label: 'Добавяне на докторска специализация',click:()=>createInsertDoctorSpecWindow()},
//       { label: 'Добавяне на клиника', click:()=>createInsertClinicWindow() },
//       { label: 'Добавяне на пациент',click:()=>createInsertPatientWindow()},
//       { label: 'Добавяне на потребител',click:()=>createInsertUserWindow()},
//       { label: 'Добавяне на причина на посещение',click:()=>createInsertPurposeWindow()},
//       { label: 'Добавяне на специализация',click:()=>createInsertSpecializationWindow()},
//       { label: 'Добавяне на статус',click:()=>createInsertStatusWindow()},
//       { label: 'Добавяне на степен',click:()=>createInsertStageWindow()},
//       { label: 'Добавяне на тип', click: () => createInsertTypeWindow() },
//       { label: 'Добавяне на тип и причина', click: () => createInsert_T_P_Window() },
//       { label: 'Добавяне на тип потребител', click: () => createInsertTypeUserWindow() }
      
//     ]
//   },{
//     label:'Редактиране',
//     submenu:[
//         {label:'Редакция на график',click:()=>createUpdateScheduleWindow()},
//         {label:'Редакция на доктори',click:()=>createUpdateDoctorWindow()},
//         {label:'Редакция на докторска клиника',click:()=>createUpdateDoctorClinicWindow()},
//         {label:'Редакция на докторска специализация',click:()=>createUpdateDoctorSpecWindow()},
//         {label:'Редакция на клиники',click:()=>createUpdateClinicWindow()},
//         {label:'Редакция на пациент',click:()=>createUpdatePatientWindow()},
//         {label:'Редакция на потребител',click:()=>createUpdateUserWindow()},
//         {label:'Редакция на причина на посещение',click:()=>createUpdatePurposeWindow()},
//         {label:'Редакция на специализация',click:()=>createUpdateSpecializationWindow()},
//         {label:'Редакция на статус',click:()=>createUpdateStatusWindow()},
//         {label:'Редакция на степен',click:()=>createUpdateStageWindow()},
//         {label:'Редакция на тип',click:()=>createUpdateTypeWindow()},
//         {label:'Редакция на тип и причина',click:()=>createUpdate_T_P_Window()},
//         {label:'Редакция на тип потребител',click:()=>createUpdateTypeUserWindow()},
//     ]
//   },{
//     label:'Изтриване',
//     submenu:[
//         {label:'Изтриване на доктор',click:()=>createDeleteDoctorWindow()},
//         {label:'Изтриване на клиники',click:()=>createDeleteClinicWindow()},
//         // {label:'Редакция на doctors\'s clinic',click:()=>createUpdateDoctorClinicWindow()},
//         // {label:'Редакция на doctors\'s specialization',click:()=>createUpdateDoctorSpecWindow()},
//         {label:'Изтриване на пациент',click:()=>createDeletePatientWindow()},
//         // {label:'Редакция на purpose',click:()=>createUpdatePurposeWindow()},
//         // {label:'Редакция на schedule',click:()=>createUpdateScheduleWindow()},
//         // {label:'Редакция на specialization',click:()=>createUpdateSpecializationWindow()},
//         // {label:'Редакция на stage',click:()=>createUpdateStageWindow()},
//         // {label:'Редакция на status',click:()=>createUpdateStatusWindow()},
//         // {label:'Редакция на type',click:()=>createUpdateTypeWindow()},
//         // {label:'Редакция на type_purpose',click:()=>createUpdate_T_P_Window()},
//         {label:'Изтриване на потребител',click:()=>createDeleteUserWindow()},
//         {label:'Изтриване на тип пациент',click:()=>createDeleteTypeUserWindow()},
//     ]
//   }
// ];

// const adMenu = Menu.buildFromTemplate(adminMenu);


// function createInsertStageWindow() {
//         const inStageWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inStageWindow.loadURL('http://localhost:7842/insertStage');
//     }else{
//         inStageWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateStageWindow() {
//         const upStageWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upStageWindow.loadURL('http://localhost:7842/updateStage');
//     }else{
//         upStageWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertStatusWindow() {
//         const inStatusWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inStatusWindow.loadURL('http://localhost:7842/insertStatus');
//     }else{
//         inStatusWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateStatusWindow() {
//         const upStatusWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upStatusWindow.loadURL('http://localhost:7842/updateStatus');
//     }else{
//         upStatusWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }




// function createInsertScheduleWindow() {
//         const inScheduleWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inScheduleWindow.loadURL('http://localhost:7842/insertSchedule');
//     }else{
//         inScheduleWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateScheduleWindow() {
//         const upScheduleWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upScheduleWindow.loadURL('http://localhost:7842/updateSchedule');
//     }else{
//         upScheduleWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertSpecializationWindow() {
//         const inSpecializationWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inSpecializationWindow.loadURL('http://localhost:7842/insertSpecialization');
//     }else{
//         inSpecializationWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateSpecializationWindow() {
//         const upSpecializationWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upSpecializationWindow.loadURL('http://localhost:7842/updateSpecialization');
//     }else{
//         upSpecializationWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertUserWindow() {
//         const inUserWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inUserWindow.loadURL('http://localhost:7842/insertUser');
//     }else{
//         inUserWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateUserWindow() {
//         const upUserWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upUserWindow.loadURL('http://localhost:7842/updateUser');
//     }else{
//         upUserWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//  function createDeleteUserWindow() {
//         const delUserWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         delUserWindow.loadURL('http://localhost:7842/deleteUser');
//     }else{
//         delUserWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertDoctorWindow() {
//         const inDoctorWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inDoctorWindow.loadURL('http://localhost:7842/insertDoctor');
//     }else{
//         inDoctorWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateDoctorWindow() {
//         const upDoctorWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upDoctorWindow.loadURL('http://localhost:7842/updateDoctor');
//     }else{
//         upDoctorWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createDeleteDoctorWindow() {
//         const delDoctorWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         delDoctorWindow.loadURL('http://localhost:7842/deleteDoctor');
//     }else{
//         delDoctorWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertDoctorClinicWindow() {
//         const inDoctorClinicWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inDoctorClinicWindow.loadURL('http://localhost:7842/insertDoctorClinic');
//     }else{
//         inDoctorClinicWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateDoctorClinicWindow() {
//         const upDoctorClinicWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upDoctorClinicWindow.loadURL('http://localhost:7842/updateDoctorClinic');
//     }else{
//         upDoctorClinicWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertDoctorSpecWindow() {
//         const inDoctorSpecWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inDoctorSpecWindow.loadURL('http://localhost:7842/insertDoctorSpecialization');
//     }else{
//         inDoctorSpecWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateDoctorSpecWindow() {
//         const upDoctorSpecWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upDoctorSpecWindow.loadURL('http://localhost:7842/updateDoctorSpecialization');
//     }else{
//         upDoctorSpecWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createInsertPatientWindow() {
//         const inPatientWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inPatientWindow.loadURL('http://localhost:7842/insertPatient');
//     }else{
//         inPatientWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdatePatientWindow() {
//         const upPatientWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upPatientWindow.loadURL('http://localhost:7842/updatePatient');
//     }else{
//         upPatientWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createDeletePatientWindow() {
//         const delPatientWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         delPatientWindow.loadURL('http://localhost:7842/deletePatient');
//     }else{
//         delPatientWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createInsertPurposeWindow() {
//         const inPurposeWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inPurposeWindow.loadURL('http://localhost:7842/insertPurpose');
//     }else{
//         inPurposeWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdatePurposeWindow() {
//         const upPurposeWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upPurposeWindow.loadURL('http://localhost:7842/updatePurpose');
//     }else{
//         upPurposeWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertClinicWindow() {
//         const inClinicWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inClinicWindow.loadURL('http://localhost:7842/insertClinic');
//     }else{
//         inClinicWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateClinicWindow() {
//         const upClinicWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upClinicWindow.loadURL('http://localhost:7842/updateClinic');
//     }else{
//         upClinicWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createDeleteClinicWindow() {
//         const delClinicWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         delClinicWindow.loadURL('http://localhost:7842/deleteClinic');
//     }else{
//         delClinicWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsert_T_P_Window() {
//         const in_T_P_Window=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         in_T_P_Window.loadURL('http://localhost:7842/insert_T_P');
//     }else{
//         in_T_P_Window.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdate_T_P_Window() {
//         const up_T_P_Window=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         up_T_P_Window.loadURL('http://localhost:7842/update_T_P');
//     }else{
//         up_T_P_Window.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createInsertTypeWindow() {
//         const inTypeWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inTypeWindow.loadURL('http://localhost:7842/insertType');
//     }else{
//         inTypeWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateTypeWindow() {
//         const upTypeWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upTypeWindow.loadURL('http://localhost:7842/updateType');
//     }else{
//         upTypeWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createInsertTypeUserWindow() {
//         const inTypeUserWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         inTypeUserWindow.loadURL('http://localhost:7842/insertTypeUser');
//     }else{
//         inTypeUserWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createUpdateTypeUserWindow() {
//         const upTypeUserWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         upTypeUserWindow.loadURL('http://localhost:7842/updateTypeUser');
//     }else{
//         upTypeUserWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

//     function createDeleteTypeUserWindow() {
//         const delTypeUserWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         delTypeUserWindow.loadURL('http://localhost:7842/deleteTypeUser');
//     }else{
//         delTypeUserWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     }

// function createAdminWindow() {
//         const adminWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         adminWindow.loadURL('http://localhost:7842/admin');
//     }else{
//         adminWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     adminWindow.setMenu(adMenu);
//     }


//     function createChildWindow() {
//         const childWindow=new BrowserWindow({
//         parent:mainWindow,
//         modal:false,
//         show:true,
//         webPreferences:{
//             preload:getPreloadPath(),
//         }
//     });
//     if (isDev()) {
//         childWindow.loadURL('http://localhost:7842/showDoctorSchedule');
//     }else{
//         childWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
//     }
//     //childWindow.setMenu(customMenu);
   
//     }
// function createMenu() {
//         Menu.setApplicationMenu(Menu.buildFromTemplate([{
//                 label: "App",
//                 type: "submenu",
//                 submenu: [{
//                         label: "Quit",
//                         click: app.quit
//                     },{
//                             label:"Admin",
//                             click:()=>{
//                              //ipcMain.on('open-child-window',()=>{
//         createAdminWindow();
//   //  }
// //);   
//                             }
//                     }]
//             }]));
//     }
//     createMenu();
// //     function handleCloseEvents(mainWindow) {
// //         let willClose = false;
// //         mainWindow.on("close", (e) => {
// //             if (willClose) {
// //                 return;
// //             }
// //             e.preventDefault();
// //             mainWindow.hide();
// //             if (app.dock) {
// //                 app.dock.hide();
// //             }
// //         });
// //         app.on('before-quit', () => {
// //             willClose = true;
// //         });
// //         mainWindow.on('show', () => {
// //             willClose = false;
// //         });
// //     }
// // });


        
// // const adminMenu:MenuItemConstructorOptions[] = [
// //   {
// //     label: 'Insert',
// //     submenu: [
// //       { label: 'Open', click: () => console.log('Open clicked') },
// //       { label: 'Exit', role: 'quit' }
// //     ]
// //   },{
// //     label:'Update',
// //     submenu:[
// //         {label:'ldl;'}
// //     ]
// //   }
// // ];

// // const adMenu = Menu.buildFromTemplate(adminMenu);
 
// // function createAdminWindow() {
// //         const adminWindow=new BrowserWindow({
// //         parent:mainWindow,
// //         modal:false,
// //         show:true,
// //         webPreferences:{
// //             preload:getPreloadPath(),
// //         }
// //     });
// //     if (isDev()) {
// //         adminWindow.loadURL('http://localhost:7842/admin');
// //     }else{
// //         adminWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
// //     }
// //     adminWindow.setMenu(adMenu);
// //     }

// //     createMenu();
// //  const customMenuTemplate:MenuItemConstructorOptions[] = [
// //   {
// //     label: 'File',
// //     submenu: [
// //       { label: 'Open', click: () => console.log('Open clicked') },
// //       { label: 'Exit', role: 'quit' }
// //     ]
// //   }
// // ];

// // const customMenu = Menu.buildFromTemplate(customMenuTemplate);
// //     function createChildWindow() {
// //         const childWindow=new BrowserWindow({
// //         parent:mainWindow,
// //         modal:false,
// //         webPreferences:{
// //             preload:getPreloadPath()
// //         }
// //     });
// //     if (isDev()) {
// //         childWindow.loadURL('http://localhost:7842/showDoctorSchedule');
// //     }else{
// //         childWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
// //     }    childWindow.setMenu(customMenu);
// //     }
// //     ipcMain.on('',()=>{
// //         createChildWindow();
// //     });

// // function createMenu() {
// //         Menu.setApplicationMenu(Menu.buildFromTemplate([{
// //                 label: "App",
// //                 type: "submenu",
// //                 submenu: [{
// //                         label: "Quit",
// //                         click: app.quit
// //                     },{
// //                             label:"Admin",
// //                             click:()=>{
// //         createAdminWindow(); 
// //                             }
// //                     }]
// //             }]));
// //     }
// //     function handleCloseEvents(mainWindow:BrowserWindow){
// //         let willClose=false;
// //     mainWindow.on("close",(e)=>{
// //         if (willClose) {
// //             return;
// //         }
// //         e.preventDefault();
// //         mainWindow.hide();
// //         if (app.dock) {
// //             app.dock.hide();
// //         }
// //     });    
// //     app.on('before-quit',()=>{
// //         willClose=true;
// //     });
// //     mainWindow.on('show',()=>{
// //         willClose=false;
// //     });
// //     }
     });