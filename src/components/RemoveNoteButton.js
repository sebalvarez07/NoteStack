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
            <span
                onMouseDown={handleOpenModal}
                className='header-icon header-icon--xs'>
                <i className="ionicons ion-trash-b"></i>
            </span>
            <ReactModal 
                className='modal modal--remove-note'
                isOpen={showModal}
                overlayClassName='modal__overlay'
                >    
                <span 
                    onMouseDown={handleCancelRemove}
                    className='modal__close'>
                    <i className="ionicons ion-close"></i>
                </span>
                

                <div className='modal__body'>
                    <span className='warning-icon'>
                        <i class="ionicons ion-android-alert"></i>
                    </span>
                    <div className='modal-remove__msg'>
                        <span className='d3'>
                            Are you sure you want to delete this note?
                        </span>
                        <span className='d5'>
                            This action cannot be undone.
                        </span>
                    </div>
                </div>
                <div className='modal__footer'>
                    <span
                        className='btn btn--grey'
                        onMouseDown={handleCancelRemove}
                        >
                        Cancel
                    </span>
                    <span
                        className='btn btn--blue'
                        onMouseDown={handleRemoveNote}
                        >
                        Remove Note
                    </span>
                </div>
            </ReactModal>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveNote: (id) => dispatch(startRemoveNote(id))
})

export default connect(undefined, mapDispatchToProps)(RemoveNoteButton);