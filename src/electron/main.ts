import {app,BrowserWindow, ipcMain}from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './util.js';
import { pollResources,getA } from './resourceManager.js';
import { getAssetPath, getPreloadPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';


// type test = string;

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
    createWindow(mainWindow);
    })

    createMenu();
    

    function createWindow(mainWindow:BrowserWindow) {
        let secondWindow=new BrowserWindow({
            parent:mainWindow,
            webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //enableRemoteModule: true,
    },
        });
        secondWindow.loadFile('C:/Users/Asus/Desktop/Project Intern/index2.html');
        //secondWindow.show();
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
    
// });
// function handleGetA(callback:()=>Atype){
//             ipcMain.handle('getA',callback); }
