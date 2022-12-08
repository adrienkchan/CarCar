import React from 'react';
import {Link} from 'react-router-dom'

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/sales/sale"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({sales: data.sales})
        }
    }


    render() {
        return (
            <div>
                <h1>Vehicle Sales</h1>
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
                        {this.state.sales.map(sale => {
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

export default SalesList
