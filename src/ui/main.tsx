//  import { StrictMode } from 'react'
//  import { createRoot, hydrateRoot } from 'react-dom/client'
//  import './index.css'
// import App from './App.js'
// // import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
// import Child from './PatientWindows/ShowDoctorSchedule.js'
// import Chi from './main2';
// function name(params:type) {
//   createRoot(document.getElementById('root')!).render(
//   return(
//   <StrictMode>
//     <Chi />
//   </StrictMode>,
// ))
// }

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// const router = createBrowserRouter([
//   {
//     path: '/:appTypeId?',
//     element: <AppLayout />,
//     loader: defaulNewAPIs,
//     children: [
//       {
//         index: true,
//         element: <ReferralDetails status="new" />,
//       },
//     ],
//   },
// ]);

// function Router() {
//   return <RouterProvider router={router} />;
// }

//   createBrowserRouter()
//     <BrowserRouter>
//       <Routes>

//         <Route path="/child" element={<Child />} />
//       </Routes>
//     </BrowserRouter>

// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,

//     children: [
//       { path:"/",
//         element:<App />
//       },
//       {
//         path: "./child",
//         element: <Child />,
//       },
//     ],
//   },
// ]);

// //createRoot(document.getElementById("root")).render(
//  createRoot(document.getElementById('root')!).render(
//   <RouterProvider router={router} />
// );