import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { startRemoveNote } from '../actions/notes';
import { history } from '../routers/AppRouter';

ReactModal.setAppElement('#app');

const RemoveNoteButton = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleRemoveNote = (e) => {
        e.preventDefault();
        props.startRemoveNote(props.noteID);
        setShowModal(false);
        history.push('/dashboard');
    }

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleCancelRemove = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <button
                onClick={handleOpenModal}
                className='header-icon header-icon--xs'>
                <i className="ionicons ion-trash-b"></i>
            </button>
            <ReactModal 
                isOpen={showModal}
                >
                Are you sure you want to delete this note? This action cannot be undone.
                <button
                    onClick={handleCancelRemove}
                    >
                    Cancel
                </button>
                <button
                    onClick={handleRemoveNote}
                    >
                    Remove Note
                </button>
            </ReactModal>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveNote: (id) => dispatch(startRemoveNote(id))
})

export default connect(undefined, mapDispatchToProps)(RemoveNoteButton);