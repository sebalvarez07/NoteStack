import React from 'react';
import NoteForm from './NoteForm';
import { connect } from 'react-redux';
import { startEditNote } from '../actions/notes';

const EditNote = (props) => {

    if(!(!!props.note)) {
        props.history.push('/error-404');
    }

    const handleEditNote = (updates) => {
        props.startEditNote(props.note.id, updates);
        props.history.push('/dashboard');
    };

    return (
        <div>
            <NoteForm onSubmit={handleEditNote} note={props.note}/>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startEditNote: (id, updates) => dispatch(startEditNote(id, updates))
});

const mapStateToProps = (state, props) => ({
    note: state.notes.find(note => note.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
