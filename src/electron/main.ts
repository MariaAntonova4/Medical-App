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
getAllDoctorSchedule,updateStage,updateStatus,
updateSchedule,
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
    handleCloseEvents(mainWindow);

    ipcMain.handle('open-child-window',()=>createChildWindow());
    ipcMain.handle('insert-spec',(event,specName)=>setSpec(specName));
    ipcMain.handle('insert-appointment',(event,doc_cli,status,time,date,ty_pur,idPatient)=>insertAppointment(doc_cli,status,time,date,ty_pur,idPatient));
    ipcMain.handle('insert-clinic',(event,clinicName, clinicAddress)=>insertClinic(clinicName,clinicAddress));
    ipcMain.handle('insert-doctor',(event,firstName,middleName,lastName,docSpecialization,docTelephone,docUser)=>insertDoctor(firstName,middleName,lastName,docSpecialization,docTelephone,docUser));
    ipcMain.handle('insert-doc-clinic',(event,idDoc_D_C,idClinic_D_C,cabinet)=>insertDoc_Clinic(idDoc_D_C,idClinic_D_C,cabinet));
    ipcMain.handle('insert-doc-spec',(event,idDoc_D_S,idSpec_D_S)=>insertDoc_Spec(idDoc_D_S,idSpec_D_S));
    ipcMain.handle('insert-patient',(event,firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser)=>insertPatient(firstName,middleName,lastName,age,EGN,gender,address,telephone,idUser));
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



        
const adminMenu:MenuItemConstructorOptions[] = [
  {
    label: 'Insert',
    submenu: [
      { label: 'Open', click: () => console.log('Open clicked') },
      { label: 'Exit', role: 'quit' }
    ]
  },{
    label:'Update',
    submenu:[
        {label:'ldl;'}
    ]
  }
];

const adMenu = Menu.buildFromTemplate(adminMenu);
 
function createAdminWindow() {
        const adminWindow=new BrowserWindow({
        parent:mainWindow,
        modal:false,
        show:true,
        webPreferences:{
            preload:getPreloadPath(),
        }
    });
    if (isDev()) {
        adminWindow.loadURL('http://localhost:7842/admin');
    }else{
        adminWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
    }
    adminWindow.setMenu(adMenu);
    }

    createMenu();
 const customMenuTemplate:MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      { label: 'Open', click: () => console.log('Open clicked') },
      { label: 'Exit', role: 'quit' }
    ]
  }
];

const customMenu = Menu.buildFromTemplate(customMenuTemplate);
    function createChildWindow() {
        const childWindow=new BrowserWindow({
        parent:mainWindow,
        modal:false,
        webPreferences:{
            preload:getPreloadPath()
        }
    });
    if (isDev()) {
        childWindow.loadURL('http://localhost:7842/showDoctorSchedule');
    }else{
        childWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
    }    childWindow.setMenu(customMenu);
    }
    ipcMain.on('',()=>{
        createChildWindow();
    });

function createMenu() {
        Menu.setApplicationMenu(Menu.buildFromTemplate([{
                label: "App",
                type: "submenu",
                submenu: [{
                        label: "Quit",
                        click: app.quit
                    },{
                            label:"Admin",
                            click:()=>{
        createAdminWindow(); 
                            }
                    }]
            }]));
    }
    function handleCloseEvents(mainWindow:BrowserWindow){
        let willClose=false;
    mainWindow.on("close",(e)=>{
        if (willClose) {
            return;
        }
        e.preventDefault();
        mainWindow.hide();
        if (app.dock) {
            app.dock.hide();
        }
    });    
    app.on('before-quit',()=>{
        willClose=true;
    });
    mainWindow.on('show',()=>{
        willClose=false;
    });
    }
    });