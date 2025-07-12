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
    }
}
type EventPayloadMapping = {
  sendInfo: SendInfo;
  getA: Atype;
  changeView: View;
  sendFrameAction: FrameWindowAction;
};
export interface specialization{
    id:number|null,
    specName:string;
}