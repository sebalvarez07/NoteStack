import React from 'react';
import NotesFilters from './NotesFilters';
import NotesList from './NotesList';
import { Link } from 'react-router-dom';

const DashboardPage = (props) => (

    <div>
        <section className='page-header'>
            <div className='content-container'> 
                <h2>
                    Notes Dashboard
                </h2>
                <Link 
                    to='/addNote'
                    className='btn btn--blue'>
                    Add Note
                </Link>
            </div>
        </section>

        <div className='content-container'> 
            <NotesFilters />
            <NotesList {...props} />
        </div>
    </div>
);

export default DashboardPage;