import React from 'react';
import {Link} from 'react-router-dom'

class SalesPersonRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            sales_persons: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        const salesUrl = "http://localhost:8090/api/sales/sale"
        const salesResponse = await fetch(salesUrl)
        const salesPersonUrl = "http://localhost:8090/api/sales/salesperson/"
        const salesPersonResponse = await fetch(salesPersonUrl)
        if (salesResponse.ok && salesPersonResponse.ok) {
            const salesData = await salesResponse.json();
            const salesPersonData = await salesPersonResponse.json()
            this.setState({sales: salesData.sales})
            this.setState({sales_persons: salesPersonData.sales_persons})
        }
    }

    handleChange(event) {
        const object = {}
        object[event.target.name] = event.target.value
        this.setState(object)
    }

    render() {
        return (
            <div>
                <select onChange={this.handleChange} value={this.state.sales_person} required name="sales_person" id="sales_person" className="form-select">
                <option value="">Select a Salesperson</option>
                {this.state.sales_persons.map(salesPerson => {
                    return (
                        <option key={salesPerson.id} value={salesPerson.id}>
                            {salesPerson.name}
                        </option>
                    )
                })}
                </select>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee ID</th>
                            <th>Customer</th>
                            <th>Vehicle VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.filter(
                            sale=> sale.sales_person.id.toString() === this.state.sales_person).map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_person.name}</td>
                                    <td>{sale.sales_person.number}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SalesPersonRecord
