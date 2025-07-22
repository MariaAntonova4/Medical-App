import {app,BrowserWindow, ipcMain}from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './util.js';
import { pollResources,getA } from './resourceManager.js';
import { getAssetPath, getPreloadPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';
import  sqlite3  from 'sqlite3';
import { getAllSpec, setSpec, updateSpec,insertClinic,getAllClinics,updateClinic, insertTypeOfUser, getAllTypesOfUsers, insert_User, update_User} from "../database/db.js";


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
    ipcMain.handle('insert-clinic',(event,clinicName, clinicAddress)=>insertClinic(clinicName,clinicAddress));
    ipcMain.handle('insert-type-user',(event,userTypeName)=>insertTypeOfUser(userTypeName));
    ipcMain.handle('insert-user',(event,userName,pass,userType)=>insert_User(userName,pass,userType));
    ipcMain.handle('update-spec',(event,idNum,specName)=>updateSpec(idNum,specName));
    ipcMain.handle('update-clinic',(event,idClinic,updateClinicName,updateClinicAddress)=>updateClinic(idClinic,updateClinicName,updateClinicAddress));
    ipcMain.handle('update-user',(event,upIdUser,upUsername,upPass,upTypeOfUser)=>update_User(upIdUser,upUsername,upPass,upTypeOfUser));
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
        // const users=await getUsers();
        // return users;
    });
    //     async()=>{
//     return new Promise((resolve,reject)=>{
        
//         db.all('SELECT * FROM specialization',[],(err: any,rows: unknown)=>{
//             if (err) {
//                 reject(err);
//             }else resolve(rows);
//         })
//     })
// })


    // ipcMain.handle('dbSpec',async(ev,argz)=>{
    //     return await new Promise((res,rej)=>{
    //         setSpec(argz,(data:any)=>{
    //             res(data);
    //         });
    //     });
    // });
    // }

    createMenu();

    function createChildWindow() {
        const childWindow=new BrowserWindow({
        parent:mainWindow,
        modal:false,
        webPreferences:{
            preload:getPreloadPath()
        }
    });
    if (isDev()) {
        childWindow.loadURL('http://localhost:7842/child');
    }else{
        childWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
    }
    }
    ipcMain.on('',()=>{
        createChildWindow();
    });


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
// }
// function handleGetA(callback:()=>Atype){
//             ipcMain.handle('getA',callback); 
