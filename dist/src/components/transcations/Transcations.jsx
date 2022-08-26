import React, { Component } from 'react';
import Transcation from './transcation/Transcation';
import './Transcations.css'

class Transcations extends Component {

    render() {
        return (
            <div className='cards'>
                {this.props.transcations.map((t, i) => <Transcation transcation={t} key={i} deleteTransaction={this.props.deleteTransaction} />)}
            </div>
        );
    }
}

export default Transcations;