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
        readTypeOfUser:()=>Promise<any>;
        readUser:()=>Promise<any>;
        getSpec:(specName)=>Promise<any>;
        insertClinic:(clinicName,clinicAddress)=>Promise<any>;
        insertTypeOfUser:(userTypeName)=>Promise<any>;
        insert_User:(username,password,typeOfUser)=>Promise<any>;
        updateClinic:(idClinic,updateClinicName,updateClinicAddress)=>Promise<any>;
        updateSpec:(idNum,specName)=>Promise<any>;
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