import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLoginOut } from '../actions/auth';

export const Header = ({ startLoginOut }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard" >
                    <h1>NoteStack</h1>
                </Link>
                <button 
                    className="btn btn--link"
                    onClick={startLoginOut}
                    >
                    Logout
                </button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => {
    return {
        startLoginOut: () => dispatch(startLoginOut())
    }
}
 
export default connect(undefined, mapDispatchToProps)(Header);