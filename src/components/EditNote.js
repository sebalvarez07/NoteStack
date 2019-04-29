import React from 'react';
import NoteForm from './NoteForm';
import { connect } from 'react-redux';
import { editNote } from '../actions/notes';

const EditNote = (props) => {

    if(!(!!props.note)) {
        props.history.push('/*');
    }

    const handleOnSubmit = (updates) => {
        props.editNote(props.note.id, updates);
        props.history.push('/dashboard');
    };

    return(
        <div>
            <NoteForm onSubmit={handleOnSubmit} note={props.note}/>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    editNote: (id, updates) => dispatch(editNote(id, updates))
});

const mapStateToProps = (state, props) => ({
    note: state.notes.find(note => note.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
