import React from 'react';
import NotesFilters from './NotesFilters';
import NotesList from './NotesList';

const Sidebar = (props) => {

    return (
        <div className='sidebar'>
            <div className='sidebar__content'>
                <NotesFilters />
                <NotesList />
            </div>
        </div>
    );
};

export default Sidebar;