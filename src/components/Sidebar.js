import React from 'react';
import NotesFilters from './NotesFilters';
import NotesList from './NotesList';
import SidebarCollapseButton from './SidebarCollapseButton';

const Sidebar = (props) => {

    return (
        <div className='sidebar'>
            <div className='sidebar__content'>
                <NotesFilters />
                <NotesList />
            </div>
            <span className={`sidebar-collapser--mobile`}>
                <SidebarCollapseButton />
            </span>
        </div>
    );
};

export default Sidebar;