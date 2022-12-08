import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inventory/Cars</a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink>
                <NavLink className="dropdown-item" to="/models">Vehicle Models</NavLink>
                <NavLink className="dropdown-item" to="/automobiles">Automobiles</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/customer">New Customers</NavLink>
                <NavLink className="dropdown-item" to="/sales">List Of Our Sales</NavLink>
                <NavLink className="dropdown-item" to="/sales/new">New Sale</NavLink>
                <NavLink className="dropdown-item" to="/salesperson">Sales Persons Records</NavLink>
                <NavLink className="dropdown-item" to="/salesperson/new">Become a Sales Person</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/appointments/new">Make a Service Appointment</NavLink>
                <NavLink className="dropdown-item" to="/appointments">List of Appointments</NavLink>
                <NavLink className="dropdown-item" to="/appointments/search">Appointment by Vehicle</NavLink>
                <NavLink className="dropdown-item" to="/technicians/new">Become a Technician</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
