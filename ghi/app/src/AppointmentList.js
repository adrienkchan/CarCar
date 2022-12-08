import React from 'react';
import { Link } from 'react-router-dom'


class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            appointment: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/appointments/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ appointment: data.appointment })
        }
    }


    async deleteItem(event) {
        const id = event.target.value
        const url = `http://localhost:8080/api/appointments/${id}/`
        const fetchConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const finishedStatus = await response.json();
            console.log('status', finishedStatus)
        }
        window.location.reload(false);
    }

    async finishedApp(event) {
        const id = event.target.value
        const url = `http://localhost:8080/api/appointments/${id}/`
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({ status: true }),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const finishedStatus = await response.json();
            console.log('status', finishedStatus)
        }
    }


    render() {
        return (
            <div>
                <h1>Appointments</h1>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-right">
                    <Link to="/appointments/new/" className="btn btn-primary btn-md px-4 gap-3">Create an appointment</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Owner</th>
                            <th>Appointment Date/Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>VIP</th>
                            <th>Cancel</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointment.map(appt => {
                            return (
                                <tr key={appt.id}>
                                    <td>{appt.automobile.vin}</td>
                                    <td>{appt.customer_name}</td>
                                    <td>{appt.starts}</td>
                                    <td>{appt.technician.name}</td>
                                    <td>{appt.reason}</td>
                                    <td>{appt.is_vip.toString()}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={this.deleteItem} id={appt.id} value={appt.id} >Cancel</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success" onClick={this.finishedApp} id={appt.id} value={appt.id} >Completed</button>
                                    </td>


                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AppointmentList;
