import React, { Component } from 'react';
import './Flash.css'

class Flash extends Component {
    render() {
        return (
            <div className='flash-parent'>
                <div className='flash' style={{backgroundColor: `${this.props.flash.color}`, display: `${this.props.flash.display}`}}>
                    <div className='flash-message'>{this.props.flash.message}</div>
                </div>
            </div>
        );
    }
}

export default Flash;