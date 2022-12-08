import React from 'react';
import { Link } from 'react-router-dom'


class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointment: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/appointments/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ autos: data.appointment })
        }
    }


    render() {
        return (
            <div>
                <h1>Appointments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Owner</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointment.map(appt => {
                            return (
                                <tr key={appt.id}>
                                    <td>{appt.automobile.vin}</td>
                                    <td>{appt.customer_name}</td>
                                    <td>{appt.appt_date}</td>
                                    <td>{appt.appt_time}</td>
                                    <td>{appt.technician.name}</td>
                                    <td>{appt.reason}</td>
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
