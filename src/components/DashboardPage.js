import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import FavouriteList from './FavouriteList';
import filterNotes from '../selectors/filterNotes';
import WelcomeWidget from './WelcomeWidget';

const DashboardPage = (props) => (

    <React.Fragment>
        <div className='header-wrapper'>
            <Header 
                sidebarCollapseButton={props.sidebarCollapseButton}
                left_side={
                    <h1 className='d2'>Dashboard</h1>
                }
            />
        </div>

        <div className='dashboard-container'>
            <div className='content-container'>

            { props.latestNotes.length === 0 && props.faveNotes.length === 0 && 
                <WelcomeWidget />
            }
                
            { props.faveNotes.length !== 0 && 
                <div className='dash-group'>
                    <h2 className='d4'>
                        Favourite Notes
                    </h2>
                    <FavouriteList notes={props.faveNotes}/>
                </div>
            }
                
            { props.latestNotes.length !== 0 && 
                <div className='dash-group'>
                    <h2 className='d4'>
                        Most Recently Updated/Created
                    </h2>
                    <FavouriteList notes={props.latestNotes}/>
                </div>
            }
            </div>
        </div>
    </React.Fragment>
);

const latestFiler = {
    text: '',
    title: '',
    textContent: '',
    subject: 'all_subjects',
    sortBy: 'latest'

}

const mapStateToProps = (state) => ({
    faveNotes: state.notes.filter(note => note.isFavourite === true),
    latestNotes: filterNotes(state.notes, latestFiler),
});

export default connect(mapStateToProps)(DashboardPage);