import React, { useEffect, useMemo, useState,memo,useReducer } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useData } from './useData.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App2 from './App copy'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App2 />
//   </StrictMode>,
// )



function App() {
  const [specs,setSpecs]=useState<any[]>([]);
  useEffect(()=>{
    window.electron.readSpec().then(setSpecs);
    //window.electron.getSpec('Anesthesiologist');
  },[]);
const [ime,setIme]=useState("");
const [idnum,setIdNum]=useState("");
const [nameSpec,setNameSpec]=useState("");
function search(formData: { get: (arg0: string) => any; }) {
    const namw = formData.get("namw");
    window.electron.getSpec(namw);
    //alert(`You searched for '${namw}'`);
  }
  function update(formData: { get: (arg0: string) => any; }) {
    const idnum=formData.get("idnum");
    const specname=formData.get("specname");
    window.electron.updateSpec(idnum,specname);
  }
  return (
    <>
    <div>
      <h1>
        Specialization
      </h1>
      <ul>
        {specs.map((spec,idx)=>(
          <li key={idx}>{JSON.stringify(spec)}</li>
        ))}
      </ul>
    </div>
    <div>
        <form action={search}>
      <input type="text"name="namw"value={ime}onChange={(e)=>setIme(e.target.value)} />
      <input type="submit" />
    </form>
    <form action={update}>
      <input type="number" name="idnum" onChange={(e)=>setIdNum(e.target.value)}/>
      <input type="text"name="specname"onChange={(e)=>setNameSpec(e.target.value)} />
      <input type="submit" />
    </form>
    </div>
      
        
       <div>
      
    </div>
       {/* <div><button onClick={()=>{}}>See name</button>
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
      </div> */}
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
    <p></p>
    // <form onSubmit={handleSubmit}>
    //   <input type="text"value={ime}onChange={(e)=>setIme(e.target.value)} />
    //   <input type="submit" />
    // </form>
  );
}
function Fun({a}:{a:string}) {
  return(
    <p>The name is {a}</p>
  );
}

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