import React from 'react';
import NoteListItem from './NoteListItem';
import { connect } from 'react-redux';
import filteredNotes from '../selectors/filterNotes';

const NotesList = (props) => {

    return (
        <div className='notes-list'>
            {
                props.notes.map( note => <NoteListItem key={note.id} note={note} />)
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    notes: filteredNotes(state.notes, state.filters)
})
    

export default connect(mapStateToProps)(NotesList);