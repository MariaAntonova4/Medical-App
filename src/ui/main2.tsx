import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainWindow from './App';
import ChildWindow from './PatientWindows/ShowDoctorSchedule';
import './App.css';
import './index.css';
import Admin from './Admin';

import Type_Purpose from './../ui/Insert_Admin/In_Type_Purpose';
import Clinic from './../ui/Insert_Admin/In_Clinic';
import Doctor from './../ui/Insert_Admin/In_Doctor';
import DoctorClinic from './../ui/Insert_Admin/In_DoctorClinic';
import DoctorSpecialization from './../ui/Insert_Admin/In_DocSpec';
import Patient from './../ui/Insert_Admin/In_Patient';
import Purpose from './../ui/Insert_Admin/In_Purpose';
import Schedule from './../ui/Insert_Admin/In_Schedule';
import Specialization from './../ui/Insert_Admin/In_Specialization';
import Stage from './../ui/Insert_Admin/In_Stage';
import Status from './../ui/Insert_Admin/In_Status';
import Type from './../ui/Insert_Admin/In_Type';
import TypeUser from './../ui/Insert_Admin/In_TypeUser';
import User from "./../ui/Insert_Admin/In_User";

import ClinicUpdate from './../ui/Update_Admin/Up_Clinic'
import DoctorUpdate from './../ui/Update_Admin/Up_Doctor'
import DoctorClinicUpdate from './../ui/Update_Admin/Up_DoctorClinic'
import DoctorSpecializationUpdate from './../ui/Update_Admin/Up_DocSpec'
import PatientUpdate from "./../ui/Update_Admin/Up_Patient";
import PurposeUpdate from './../ui/Update_Admin/Up_Purpose';
import ScheduleUpdate from "./../ui/Update_Admin/Up_Schedule";
import SpecializationUpdate from "./../ui/Update_Admin/Up_Specialization";
import StageUpdate from "./../ui/Update_Admin/Up_Stage";
import StatusUpdate from "./../ui/Update_Admin/Up_Status";
import Type_PurposeUpdate from './../ui/Update_Admin/Up_Type_Purpose'
import TypeUpdate from './../ui/Update_Admin/Up_Type'
import TypeUserUpdate from './../ui/Update_Admin/Up_TypeUser'
import UserUpdate from './../ui/Update_Admin/Up_User'

import ClinicDelete from './../ui/Delete_Admin/Del_Clinic';
import DoctorDelete from './../ui/Delete_Admin/Del_Doctor';
import PatientDelete from './../ui/Delete_Admin/Del_Patient';
import TypeUserDelete from './../ui/Delete_Admin/Del_TypeUser';
import UserDelete from './../ui/Delete_Admin/Del_User';
import DeleteDoctor from './../ui/Delete_Admin/Del_Doctor';
import DeleteClinic from './../ui/Delete_Admin/Del_Clinic';
import DeletePatient from './../ui/Delete_Admin/Del_Patient';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
function App() {
  return (
    createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainWindow/>
  </StrictMode>,
) )
  }
    // <BrowserRouter>
    //   <Routes>
    //     ReactDOM.render(<MainWindow />, document.getElementById('root'));

    //     <Route path="/" element={<MainWindow />} />
    //     <Route path="/showDoctorSchedule" element={<ChildWindow />} />
    //     <Route path="/admin" element={<Admin />} />

    //     <Route path="/insert_T_P" element={<Type_Purpose />} />
    //     <Route path="/insertClinic" element={<Clinic />} />
    //     <Route path="/insertDoctor" element={<Doctor />} />
    //     <Route path="/insertDoctorClinic" element={<DoctorClinic />} />
    //     <Route path="/insertDoctorSpecialization" element={<DoctorSpecialization/>} />
    //     <Route path="/insertPatient" element={<Patient />} />
    //     <Route path="/insertPurpose" element={<Purpose />} />
    //     <Route path="/insertSchedule" element={<Schedule />} />
    //     <Route path="/insertSpecialization" element={<Specialization />} />
    //     <Route path="/insertStage" element={<Stage />} />
    //     <Route path="/insertStatus" element={<Status />} />
    //     <Route path="/insertType" element={<Type />} />
    //     <Route path="/insertTypeUser" element={<TypeUser />} />
    //     <Route path="/insertUser" element={<User />} />

    //     <Route path="/updateClinic" element={<ClinicUpdate />} />
    //     <Route path="/updateDoctor" element={<DoctorUpdate />} />
    //     <Route path="/updateDoctorClinic" element={<DoctorClinicUpdate />} />
    //     <Route path="/updateDoctorSpecialization" element={<DoctorSpecializationUpdate />} />
    //     <Route path="/updatePatient" element={<PatientUpdate />} />
    //     <Route path="/updatePurpose" element={<PurposeUpdate />} />
    //     <Route path="/updateSchedule" element={<ScheduleUpdate />} />
    //     <Route path="/updateSpecialization" element={<SpecializationUpdate />} />
    //     <Route path="/updateStage" element={<StageUpdate />} />
    //     <Route path="/updateStatus" element={<StatusUpdate />} />
    //     <Route path="/update_T_P" element={<Type_PurposeUpdate />} />
    //     <Route path="/updateType" element={<TypeUpdate />} />
    //     <Route path="/updateTypeUser" element={<TypeUserUpdate />} />
    //     <Route path="/updateUser" element={<UserUpdate />} />

    //     <Route path='/deleteClinic'element={<ClinicDelete/>}/>
    //     <Route path='/deleteDoctor'element={<DoctorDelete/>}/>
    //     <Route path='/deletePatient'element={<PatientDelete/>}/>
    //     <Route path='/deleteTypeUser'element={<TypeUserDelete/>}/>
    //     <Route path='/deleteUser'element={<UserDelete/>}/>
    //   </Routes>  );

    // </BrowserRouter>


export default App;
