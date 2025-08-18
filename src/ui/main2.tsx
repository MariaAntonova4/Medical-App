import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainWindow from './App';
import ChildWindow from './Child';
import './App.css';
import './index.css';
import Admin from './Admin';

import Type_Purpose from './../ui/Insert_Admin/In_Type_Purpose';
import Clinic from './../ui/Insert_Admin/In_Clinic';
import Doctor from './../ui/Insert_Admin/In_Doctor';
import DoctorClinic from './../ui/Insert_Admin/In_DoctorClinic';
import Patient from './../ui/Insert_Admin/In_Patient';
import Specialization from './../ui/Insert_Admin/In_Specialization';
import User from "./../ui/Insert_Admin/In_User";

import ClinicUpdate from './../ui/Update_Admin/Up_Clinic'
import DoctorUpdate from './../ui/Update_Admin/Up_Doctor'
import DoctorClinicUpdate from './../ui/Update_Admin/Up_DoctorClinic'
import PatientUpdate from "./../ui/Update_Admin/Up_Patient";
import SpecializationUpdate from "./../ui/Update_Admin/Up_Specialization";
import Type_PurposeUpdate from './../ui/Update_Admin/Up_Type_Purpose'
import UserUpdate from './../ui/Update_Admin/Up_User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWindow />} />
        <Route path="/child" element={<ChildWindow />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/insert_T_P" element={<Type_Purpose />} />
        <Route path="/insertClinic" element={<Clinic />} />
        <Route path="/insertDoctor" element={<Doctor />} />
        <Route path="/insertDoctorClinic" element={<DoctorClinic />} />
        <Route path="/insertPatient" element={<Patient />} />
        <Route path="/insertSpecialization" element={<Specialization />} />
        <Route path="/insertUser" element={<User />} />

        <Route path="/updateClinic" element={<ClinicUpdate />} />
        <Route path="/updateDoctor" element={<DoctorUpdate />} />
        <Route path="/updateDoctorClinic" element={<DoctorClinicUpdate />} />
        <Route path="/updatePatient" element={<PatientUpdate />} />
        <Route path="/updateSpecialization" element={<SpecializationUpdate />} />
        <Route path="/update_T_P" element={<Type_PurposeUpdate />} />
        <Route path="/updateUser" element={<UserUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
