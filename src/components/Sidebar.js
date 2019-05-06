import React from 'react';
import NotesFilters from './NotesFilters';
import NotesList from './NotesList';

const Sidebar = () => {

    return (
        <div className='sidebar'>
            <NotesFilters />
            <NotesList />
        </div>
    );
};

export default Sidebar;