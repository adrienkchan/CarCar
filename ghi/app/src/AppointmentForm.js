import React from "react";
import { Link } from 'react-router-dom'

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            automobile: "",
            customer_name: "",
            starts: "",
            reason: "",
            technician: "",
            technicians: [],

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.technicians
        console.log(data)
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);
            const cleared = {
                automobile: "",
                customer_name: "",
                starts: "",
                reason: "",
                technician: "",
            }
            this.setState(cleared);
        }
    }

    handleChange(event) {
        const value = {};
        value[event.target.name] = event.target.value
        this.setState(value);
    }


    async componentDidMount() {
        const techUrl = "http://localhost:8080/api/technicians/";
        const response = await fetch(techUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });
        }
    }



    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create an Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-appointment-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.automobile} placeholder="automobile" required type="text" name="automobile" id="automobile" className="form-control" />
                                <label htmlFor="automobile">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                                <label htmlFor="customer_name">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.starts} placeholder="starts" required type="datetime-local" name="starts" id="starts" className="form-control" />
                                <label htmlFor="starts">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.reason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <select onChange={this.handleChange} value={this.state.technician} required id="technician" name="technician" className="form-select">
                                <option value="">Choose a technician</option>
                                {this.state.technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentForm;
