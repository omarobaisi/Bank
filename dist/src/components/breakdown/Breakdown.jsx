import React, { Component } from 'react';
import axios from "axios";
import './Breakdown.css'

class Breakdown extends Component {

    constructor() {
        super();
        this.state = {
            categoriesAmount: []
        }
    }

    componentDidMount = async () => {
        let categories = await axios.get("http://localhost:3000/breakdown")
        this.setState({ categoriesAmount: categories.data })
    }

    render() {
        return (
            <div>
                <div className='table-heder'><h1>Venors Salaries Breakdown</h1></div>
                <table className='table'>
                    <thead className='table-head'>
                        <tr>
                            <th className='table-element'>Vendor</th>
                            <th className='table-element'>Total Salaries</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {this.state.categoriesAmount.map(cat => (
                            <tr className='table-row'>
                                <td className='table-element'>{cat._id}</td>
                                <td className='table-element'>{cat.totalSalaries}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Breakdown;