import{useEffect,useState}from'react';

export function useData(dataPointCount:number):SendInfo[]{
    const[value,setValue]=useState<SendInfo[]>([]);
    useEffect(()=>{
        const unsub=window.electron.subscribeStatistics((num)=>
        setValue((prev)=>{
        const newData= [...prev,num];
        return newData;
        }));
        return unsub;
    },[]);
    return value;
}