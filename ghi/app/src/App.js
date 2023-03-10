import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import TechnicianForm from './TechnicianForm';
import ServiceHistory from './ServiceHistory';
import SalesRecordForm from './SalesRecordForm';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
import SalesList from './SalesList';
import SalesPersonRecord from './SalesPersonRecord';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models" element={<VehicleModelList models={props.models} />} />
          <Route path="models">
            <Route path="new" element={<VehicleModelForm />} />
          </Route>
          <Route path="automobiles" element={<AutomobileList automobiles={props.automobiles} />} />
          <Route path="automobiles">
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="appointments" element={<AppointmentList appointments={props.appointments} />} />
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route path="search" element={<ServiceHistory />} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="salesperson" element={<SalesPersonRecord/>} />
          <Route path="salesperson">
              <Route path="new" element={<SalesPersonForm/>} />
          </Route>
          <Route path="customer" element={<CustomerForm/>} />
          <Route path="sales" element={<SalesList/>} />
          <Route path="sales">
              <Route path="new" element={<SalesRecordForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
