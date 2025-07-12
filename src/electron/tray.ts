import { app, BrowserWindow, Tray } from "electron";
import { getAssetPath } from "./pathResolver.js";
import path from 'path';
import { Menu } from "electron/main";
export function createTray(mainWindow:BrowserWindow){
    const tray=new Tray(path.join(getAssetPath(),'desktopIcon.png'));

    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label:"Show",
            click:()=>{
                mainWindow.show();
            }
        },
        {
        label:"Quit",
        click:()=>app.quit(),
    }]));

}