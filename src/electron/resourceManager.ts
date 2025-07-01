const POLLING_INTERVAL=500;

export function pollResources(){
    setInterval(()=>{},POLLING_INTERVAL);
}

interface Number{
    id:number
}

function getA(user:Number){
    console.log(user.id)
}