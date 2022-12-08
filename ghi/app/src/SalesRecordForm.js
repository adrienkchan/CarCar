import React from 'react'

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: "",
            sales_persons: [],
            customers: [],
            automobiles: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.sales_persons
        delete data.customers
        delete data.automobiles
        console.log(data)
        const salesRecordUrl = 'http://localhost:8090/api/sales/sale/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(salesRecordUrl, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();
            console.log(newSalesRecord)

            const cleared = {
                name: '',
                sales_person: '',
                customer: '',
                automobile: '',
            }
            this.setState(cleared)
        }
    }

    handleChange(event) {
        const object = {}
        object[event.target.name] = event.target.value
        this.setState(object)
    }

    async componentDidMount() {
        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const autoResponse = await fetch(autoUrl)
        const salesPersonUrl = 'http://localhost:8090/api/sales/salesperson/'
        const salesPersonResponse = await fetch(salesPersonUrl)
        const customerUrl = 'http://localhost:8090/api/sales/customer/'
        const customerResponse = await fetch(customerUrl)

        if (autoResponse.ok && salesPersonResponse.ok && customerResponse.ok) {
            const autoData = await autoResponse.json()
            const salesPersonData = await salesPersonResponse.json()
            const customerData = await customerResponse.json()

            this.setState({automobiles: autoData.autos})
            this.setState({sales_persons: salesPersonData.sales_persons})
            this.setState({customers: customerData.customers})
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>New Sale Form</h1>
                            <form onSubmit={this.handleSubmit} id="create-customer-form">
                                <div className="form-floating mb-3">
                                    <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                        <option value="">Choose an automobile</option>
                                        {this.state.automobiles.map(automobile => {
                                            return (
                                                <option key={automobile.vin} value={automobile.vin}>
                                                    {automobile.vin}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <select onChange={this.handleChange} value={this.state.sales_person} required name="sales_person" id="sales_person" className="form-select">
                                        <option value="">Choose an Sales Person</option>
                                        {this.state.sales_persons.map(salesPerson => {
                                            return (
                                                <option key={salesPerson.id} value={salesPerson.id}>
                                                    {salesPerson.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <select onChange={this.handleChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                        <option value="">Choose a Customer</option>
                                        {this.state.customers.map(customer => {
                                            return (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                                    <label htmlFor="price">Price</label>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesRecordForm
