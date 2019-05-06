import React from 'react';
import NoteForm from './NoteForm';
import { connect } from 'react-redux';
import { startAddNote } from '../actions/notes';

const AddNote = (props) => {

    const addNote = (note) => {
        props.startAddNote((note));
        props.history.push('/dashboard');
    }

    return (

        <NoteForm onSubmit={addNote}/>
        
    )
}

const mapDispatchToProps = (dispatch) => ({
    startAddNote: (note) => dispatch(startAddNote(note))
})

export default connect(undefined, mapDispatchToProps)(AddNote);