import React, { useEffect, useMemo, useState,memo,useReducer, StrictMode } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createRoot } from 'react-dom/client';
import Home from './App';

function App() {
  function connectToHome() {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Home/>
      </StrictMode>
    )
  }
  return (
    <>
      <div className="card">
       <h1>Copy!</h1>
      </div>
      <div>
        <form action={connectToHome}>
          <button>
            Home
          </button>
        </form>
      </div>
    </>
  )
}

export default App