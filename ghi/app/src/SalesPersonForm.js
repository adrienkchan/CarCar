import React from 'react'

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            number: "",
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        console.log(data)
        const salesPersonUrl = 'http://localhost:8090/api/sales/salesperson/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            console.log(newSalesPerson)

            const cleared = {
                name: '',
                number: '',
            }
            this.setState(cleared)
        }
    }

    handleChange(event) {
        const object = {}
        object[event.target.name] = event.target.value
        this.setState(object)
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Become a Sales Person</h1>
                            <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                                <div>
                                    <input onChange={this.handleChange} value={this.state.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                    <label htmlFor="name">Name</label>
                                    <input onChange={this.handleChange} value={this.state.number} placeholder="number" required type="text" name="number" id="number" className="form-control" />
                                    <label htmlFor="name">Employee Number</label>
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

export default SalesPersonForm
