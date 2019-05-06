import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLoginOut } from '../actions/auth';
import { firebase } from '../firebase/firebase';

const ProfileDropdown = (props) => (
    <div className='profile-dropdown'>
        <span 
            onClick={(e) => e.target.parentElement.querySelector('.profile-dropdown__options').classList.toggle('active')}
            className='profile-icon btn--icon' 
            style={{ background: `url(${firebase.auth().currentUser.photoURL})` }}></span>
        <ul className='profile-dropdown__options'>
            <li className='profile-dropdown__single-option'>
                <button 
                    className="profile-dropdown__logout"
                    onClick={props.startLoginOut}
                    >
                    Logout
                </button>
            </li>
        </ul>
    </div>
);

export const Header = (props) => {

    return (
        <header className='header'>
            <div className='content-container'>
                <div className='header__content'>
                    <div className='header__left-side'>
                        {props.left_side}
                    </div>
                    
                    <div className='header__right-side'>
                        <div className='header__right-content'>
                            { props.right_side }
                            <ProfileDropdown startLoginOut={props.startLoginOut}/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoginOut: () => dispatch(startLoginOut())
    }
}
 
export default connect(undefined, mapDispatchToProps)(Header);