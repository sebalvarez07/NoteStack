import React from 'react';
import NoteForm from './NoteForm';
import { connect } from 'react-redux';
import { addNote } from '../actions/notes';

const AddNote = (props) => {

    const onSubmit = (note) => {
        props.addNote((note));
        props.history.push('/dashboard');
    }

    return (
        <NoteForm onSubmit={onSubmit}/>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addNote: (note) => dispatch(addNote(note))
})

export default connect(undefined, mapDispatchToProps)(AddNote);