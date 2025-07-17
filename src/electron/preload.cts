import { ipcRenderer } from "electron/renderer";

const electron=require('electron');

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics:(callback: (arg0: SendInfo) => void)=>{
       return ipcOn("sendInfo",(num)=>{
        callback(num) 
       }) 
    },
    createChildWindow:()=>ipcRenderer.invoke('open-child-window'),
    readSpec:()=>ipcRenderer.invoke('read-spec'),
    readClinic:()=>ipcRenderer.invoke('read-clinic'),
    getSpec:(specName:string)=>ipcRenderer.invoke('insert-spec',specName),
    insertClinic:(clinicName:string,clinicAddress:string)=>ipcRenderer.invoke('insert-clinic',clinicName,clinicAddress),
    updateSpec:(idNum:number,specName:string)=>ipcRenderer.invoke('update-spec',idNum,specName),
    updateClinic:(idClinic:number,updateClinicName:string,updateClinicAddress:string)=>ipcRenderer.invoke('update-clinic',idClinic,updateClinicName,updateClinicAddress),
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