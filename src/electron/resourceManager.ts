import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";
const POLLING_INTERVAL=500;

export function pollResources(mainWindow:BrowserWindow){
    setInterval(()=>{
        const num=7;
        ipcWebContentsSend('sendInfo',mainWindow.webContents,{
            num
         }//.send("sendInfo",);
         );
        
    },POLLING_INTERVAL);
}

// interface Number{
//     id:numberuser:Number
// }

export function getA(){
    const num=64;
    const exampleString="hello";
    // console.log(user.id)
    return {num,exampleString};
} 