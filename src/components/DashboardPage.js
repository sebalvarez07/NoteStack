import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const DashboardPage = (props) => (

    <div className='wrapper-inner'>
        <Header 
            sidebarCollapseButton={props.sidebarCollapseButton}
            left_side={
                <h1 className='d2'>Dashboard</h1>
            }
            right_side={
                <div className='header-right__added'>
                    <Link 
                        to='/addNote'
                        className='btn btn--blue'>
                        <span className='margin-right--sm'>+</span> Create Note
                    </Link>
                </div>
            }
        />


    </div>
);

export default DashboardPage;