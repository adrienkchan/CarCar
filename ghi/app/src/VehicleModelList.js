import React from 'react';
import {Link} from 'react-router-dom'

class VehicleModelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url)
        if (response.ok) {
            let data = await response.json();
            this.setState({models: data.models})
        }
    }


    render() {
        return (
            <div>
                <h1>Vehicel Models</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Name</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.models.map(model => {
                            return (
                                <tr key={model.id}>
                                    <td>{model.manufacturer.name}</td>
                                    <td>{model.name}</td>
                                    <td><img className="vehicle-img" src={model.picture_url} alt=""/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default VehicleModelList
