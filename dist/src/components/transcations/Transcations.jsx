import React, { Component } from 'react';
import Transcation from './transcation/Transcation';
import './Transcations.css'

class Transcations extends Component {

    constructor() {
        super();
        this.state = {
            transcations: [],
            month: ''
        }
    }

    componentDidMount = () => {
        this.setState({transcations: [...this.props.transcations]})
    }

    filterTransactions = e => {
        const selectedMonth = e.target.value;
        if(selectedMonth === '') {
            this.setState({transcations: [...this.props.transcations]})
        } else {
            let filteredTransactions = []
            this.props.transcations.forEach(t => {
                if(t.date[5]+t.date[6] === selectedMonth) {
                    filteredTransactions.push(t)
                }
            })
            this.setState({transcations: [...filteredTransactions]})
        }
    }

    render() {
        return (
            <div>
                <div>
                    <select name="" id="" onChange={this.filterTransactions}>
                        <option selected value=''>--Select Month--</option>
                        <option value='01'>Janaury</option>
                        <option value='02'>February</option>
                        <option value='03'>March</option>
                        <option value='04'>April</option>
                        <option value='05'>May</option>
                        <option value='06'>June</option>
                        <option value='07'>July</option>
                        <option value='08'>August</option>
                        <option value='09'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select>
                </div>
                <div className='cards'>
                    {this.state.transcations.map((t, i) => <Transcation transcation={t} key={i} deleteTransaction={this.props.deleteTransaction} />)}
                </div>
            </div>
        );
    }
}

export default Transcations;