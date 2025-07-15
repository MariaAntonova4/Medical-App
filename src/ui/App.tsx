import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useData } from './useData.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App2 from './App copy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App2 />
  </StrictMode>,
)



function App() {
  // const SpecList:React.FC=()=>{
  //   const [specss,settSpecs]=useState<Specialization[]>([]);
  //   useEffect(()=>{
  //     ipcRenderer.invoke('read-spec').then((data:Specialization[])=>{
  //       settSpecs(data);
  //     })
  //   },[]); return
  // }
  // SpecList
  const [count, setCount] = useState(0);
  const [specs,setSpecs]=useState<any[]>([]);
  useEffect(()=>{
    //window.electron.readSpec().then(setSpecs);
    //window.electron.getSpec('Dermatologist');
  },[]);
// useEffect(()=>{
   
 //  const unsub=window.electron.subscribeStatistics((num)=>console.log(num));
//   return unsub;
// });
// const dataa=useData(10);
// const a=useMemo(
//   ()=>dataa.map((b)=>b.num),[dataa]
// );
 const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count });
  const reset = () => dispatch({ type: "reset" });
const [addName, setName] = useState('');
const aFun=()=><Fun a='{addName}'/>;
// console.log(dataa);
  return (
    <>
    <div>
      <h1>
        Users
      </h1>
      <ul>
        {specs.map((spec,idx)=>(
          <li key={idx}>{JSON.stringify(spec)}</li>
        ))}
      </ul>
    </div>

      <div>
        <label>
         Name{': '}
         <input value={addName} onChange={e => setName(e.target.value)} />
         
       </label>
       <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
       <button onClick={()=>{}}>See name</button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Fun a="hey"/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Func/>
    </>
  )
}
function name() {
  // React.memo(props:any)=>{
  //   const active_spec=useMainStore(state=>state.active_spec);

  // }
}
function Func() {
  const [ime,setIme]=useState("");
  const handleSubmit=(event: { preventDefault: () => void; })=>{
    event.preventDefault();
    <><Fun a="{ime}" /><p>Name : </p></>
    alert(ime);
  }
  return(
    <form onSubmit={handleSubmit}>
      <input type="text"value={ime}onChange={(e)=>setIme(e.target.value)} />
      <input type="submit" />
    </form>
  );
}
function Fun({a}:{a:string}) {
  return(
    <p>The name is {a}</p>
  );
}
// export default function nameFun() {
//   
//   const [address, setAddress] = useState('');
//   return (
//     <>
//       
//       <label>
//         Address{': '}
//         <input value={address} onChange={e => setAddress(e.target.value)} />
//       </label>
//       {/* <Greeting name={addName} /> */}
//     </>
//   );
  
// }

// const Greeting = memo(function Greeting({ Person. }) {
//   console.log("Greeting was rendered at", new Date().toLocaleTimeString());
//   return <h3>Hello{name && ', '}{name}!</h3>;
// });


export default App
interface State {
   count: string
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: "h" };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}