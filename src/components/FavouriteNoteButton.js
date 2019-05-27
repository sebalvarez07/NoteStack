import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import { startEditNote } from '../actions/notes';

const FavouriteNoteButton = (props) => {

    const handleFavouriteNote = (e) => {
        e.preventDefault();
        props.startEditNote(props.noteID, {isFavourite: !props.note.isFavourite});
    }

    return (
        <React.Fragment>
            <span
                onMouseDown={handleFavouriteNote}
                className={`header-icon header-icon--xs ${props.note.isFavourite ? 'active' : ''}`}>
                <i className="ionicons ion-android-favorite"></i>
            </span>
        </React.Fragment>
    )
}

const mapStateToProps = (state, props) => ({
    note: state.notes.find(note => note.id === props.noteID)
});

const mapDispatchToProps = (dispatch) => ({
    startEditNote: (id, updates) => dispatch(startEditNote(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteNoteButton);