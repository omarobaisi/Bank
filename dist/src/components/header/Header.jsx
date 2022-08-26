import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <div className='header'>
                    <h1 className='logo'>Logo</h1>
                    <div className='headerLinks'>
                        <Link className='headerLink' to={'/operation'}>New Operation</Link>
                        <Link className='headerLink' to={'/breakdown'}>Breakdown</Link>
                    </div>
                    <div className='balance-div'>
                        <div>Balance</div>
                        <div className='balance'>${this.props.Balance} USD</div>
                    </div>
                </div>
                <div className='mobileHeader'>
                    <h1 className='logoMobile'>Logo</h1>
                    <div className='headerLinksMobile'>
                        <Link className='headerLinkMobile' to={'/operation'}>New Operation</Link>
                        <Link className='headerLinkMobile' to={'/breakdown'}>Breakdown</Link>
                    </div>
                </div>
                <div className='mobile-balance-div'>
                    <div>Balance</div>
                    <div className='mobile-balance'>${this.props.Balance} USD</div>
                </div>
            </div>
        );
    }
}

export default Header;