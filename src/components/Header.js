import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLoginOut } from '../actions/auth';
import { startAddNote } from '../actions/notes';
import { firebase } from '../firebase/firebase';
import SidebarCollapseButton from './SidebarCollapseButton';
import { history } from '../routers/AppRouter';

const ProfileDropdown = (props) => {

    const [activeDropdown, setActiveDropdown] = useState(false);
    const handleActiveDropdown = (e) => {
        e.preventDefault();
        setActiveDropdown(!activeDropdown);
    }
    return (
        <div className='profile-dropdown h-w80 flex-middle h-border-sides'>
            <span 
                onMouseDown={handleActiveDropdown}
                className='profile-icon btn--icon' 
                style={{ background: `url(${firebase.auth().currentUser.photoURL})` }}>
            </span>
            { activeDropdown && 
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
            }
        </div>
    )
};
 
export const Header = (props) => {

    const handleAddNote = (e) => {
        e.preventDefault();
        props.startAddNote().then(noteId => {
            history.push(`/edit/${noteId}`);
        });
    };

    return (
        <header className={ `header` }>
        
            <div className='sidebar-collapser'>
                <SidebarCollapseButton />
            </div>

            <div className='content-container'>
                <div className='header__content header__content-layout'>
                    <div className='header__left-side'>
                        {props.left_side}
                    </div>
                    
                    <div className='header__right-side'>
                        <div className='add-note-container flex-middle'>
                            <button 
                                onClick={handleAddNote}
                                className='btn btn--blue'>
                                + New Note
                            </button>
                        </div>
                        <Link
                            to='/dashboard'
                            className='h-border-sides h-w80 flex-middle header-icon header-icon--lg'>
                            <i className="ionicons ion-android-home"></i>
                        </Link>
                        <ProfileDropdown startLoginOut={props.startLoginOut}/>
                    </div>
                    
                </div>
            </div>
        </header>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startLoginOut: () => dispatch(startLoginOut()),
    startAddNote: () => dispatch(startAddNote())
})
        
 
export default connect(undefined, mapDispatchToProps)(Header);