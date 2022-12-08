import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers}/>} />
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm/>} />
          </Route>
          <Route path="models" element={<VehicleModelList models={props.models}/>} />
          <Route path="models">
            <Route path="new" element={<VehicleModelForm/>} />
          </Route>
          <Route path="automobiles" element={<AutomobileList automobiles={props.automobiles}/>} />
          <Route path="automobiles">
            <Route path="new" element={<AutomobileForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
