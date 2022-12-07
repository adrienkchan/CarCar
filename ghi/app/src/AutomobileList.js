import React from 'react';
import { Link } from 'react-router-dom'

class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if (response.ok) {
            let data = await response.json();
            this.setState({ automobiles: data.automobiles })
        }
    }


    render() {
        return (
            <div>
                <h1>Automobiles</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Vin</th>
                            <th>Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.automobiles.map(auto => {
                            return (
                                <tr key={auto.id}>
                                    <td>{auto.color}</td>
                                    <td>{auto.year}</td>
                                    <td>{auto.vin}</td>
                                    <td>{auto.model.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AutomobileList
