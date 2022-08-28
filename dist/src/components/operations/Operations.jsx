import React, { Component } from 'react';

import './Operations.css'

class Operations extends Component {

    constructor() {
        super();
        this.state = {
            currentButton: "deposit"
        }
    }

    selectButton = e => {
        this.setState({
            currentButton: e.target.name
        })
    }

    operation = e => {
        e.preventDefault()
        const amount = this.state.currentButton === "deposit" 
            ? parseInt(e.target.amount.value) 
            : Math.abs(e.target.amount.value) * -1
        const transaction = {
            amount: amount,
            vendor: e.target.vendor.value,
            category: e.target.category.value,
            date: e.target.date.value
        }
        this.props.operation(transaction)
    }

    render() {

        return (
            <div>
                <form onSubmit={this.operation} className='operation'>
                    <div className='input-header'>
                        <h1>New Operation</h1>
                    </div>
                    <input className='amount-input' type="number" name='amount' placeholder='Amount' min={1} required />
                    <input className='vendor-input' type="text" name='vendor' placeholder='Vendor' required />
                    <input className='category-input' type="text" name='category' placeholder='Category' required />
                    <input className='date-input' type="date" name='date' required />
                    <button
                        onClick={this.selectButton}
                        type="submit"
                        name="deposit"
                        className='deposit-button'
                     >Deposit</button>
                     <button
                        onClick={this.selectButton}
                        type="submit"
                        name="withdraw"
                        className='withdraw-button'
                     >Withdraw</button>
                </form>
            </div>
        );
    }
}

export default Operations;