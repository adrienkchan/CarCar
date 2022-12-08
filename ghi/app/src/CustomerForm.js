import React from 'react'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            address: "",
            phone_number: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        console.log(data)
        const customerUrl = 'http://localhost:8090/api/sales/customer/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer)

            const cleared = {
                name: '',
                address: '',
                phone_number: ''
            }
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name: value})
    }

    handleAddressChange(event) {
        const value = event.target.value
        this.setState({address: value})
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value
        this.setState({phone_number: value})
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>New Customer Form</h1>
                            <form onSubmit={this.handleSubmit} id="create-customer-form">
                                <div className="form-floating mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="name">Address</label>
                                    <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="adress" id="address" className="form-control" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="name">Phone Number</label>
                                    <input onChange={this.handlePhoneNumberChange} value={this.state.phone_number} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
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

export default CustomerForm
