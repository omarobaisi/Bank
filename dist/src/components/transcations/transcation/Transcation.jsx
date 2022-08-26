import React, { Component } from 'react';
import './Transcation.css'

class Transcation extends Component {

    deleteTransaction = () => {
        this.props.deleteTransaction(this.props.transcation._id)
    }

    render() {
        return (
            <div className='card'>
                <div className='category'>{this.props.transcation.category}</div>
                <div className='vendor'>{this.props.transcation.vendor}</div>
                <div className='amount-delete'>
                    <button className='delete' onClick={this.deleteTransaction}>Delete</button>
                    {this.props.transcation.amount < 500 ? <div className='smallAmount amount'>${this.props.transcation.amount}</div> : <div className='bigAmount amount'>${this.props.transcation.amount}</div>}
                </div>
            </div>
        );
    }
}

export default Transcation;