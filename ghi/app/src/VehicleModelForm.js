import React from 'react';

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture_url: "",
            manufacturers: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.manufacturers;

        const locationUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        console.log("sumbit", response)
        if (response.ok) {
            const newVehicleModel = await response.json();
            console.log(newVehicleModel);
            this.setState({
                name: "",
                picture_url: "",
                manufacturers: [],
            });
        }
    }
    handleChange(event) {
        const value = {};
        value[event.target.name] = event.target.value
        this.setState(value);
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a vehicle model</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.picture_url} placeholder="Picture" required type="url" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChange} value={this.state.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                                    <option value="">Choose a Manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleModelForm;
