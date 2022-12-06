import React, { useState, useEffect } from 'react';
import './index.css';


function AutomobileList() {
    const [automobileList, setAutomobileList] = useState([]);
    const fetchAutomobileList = async () => {
        const url = "http://localhost:8100/api/automobiles/";
        const response = await fetch(url);

        if (response.ok) {
            const listAutomobiles = await response.json();
            setAutomobileList(listAutomobiles.automobiles);
        }
    };
    useEffect(() => { fetchAutomobileList() }, []);



    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Year</th>
                    <th>VIN</th>
                    <th>Model</th>
                </tr>
            </thead>
            <tbody>
                {automobileList.map(auto => {
                    return (
                        <tr key={auto.href}>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.vin}</td>
                            <td>{auto.model}</td>
                            <td>
                                <button onClick={deleteHat(auto.href)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )

}

export default AutomobileList;
