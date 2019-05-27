import React from 'react';
import NotePage from './NotePage';
import { connect } from 'react-redux';
import { startEditNote } from '../actions/notes';

class EditNote extends React.Component {
 
    componentWillMount () {
        if(!(!!this.props.note)) {
            this.props.history.push('/error-404');
        }
    }

    handleEditNote = (updates) => {
        this.props.startEditNote(this.props.note.id, updates);
    };

    render() {
        return (
            <React.Fragment>
                { !!this.props.note && 
                    <NotePage
                        onSubmit={this.handleEditNote} 
                        note={this.props.note}
                    />
                }
            </React.Fragment>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    startEditNote: (id, updates) => dispatch(startEditNote(id, updates))
});

const mapStateToProps = (state, props) => ({
    note: state.notes.find(note => note.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
