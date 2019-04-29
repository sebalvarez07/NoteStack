import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeNote } from '../actions/notes';

class ViewNote extends React.Component  {

    validNote = !!this.props.note;

    componentWillMount() {
        if(!(this.validNote)) {
            this.props.history.push('/*');
        };
    };

    componentDidMount() {
        if(this.validNote) {
            document.getElementById('content-wrapper').insertAdjacentHTML('beforeend', this.props.note.content);
        }
    };

    handleOnDelete = () => {
        this.props.removeNote(this.props.note.id);
        this.props.history.push('/dashboard');
    };

    render () {
        return (
            <div>
                {this.validNote && 
                    <div>
                        <h1>{this.props.note.title}</h1>
                        <Link to={`/edit/${this.props.note.id}`}>Edit Note</Link>
                        <button 
                            onClick={this.handleOnDelete}
                            className='btn btn--grey'>delete note
                        </button>
                        <div id='content-wrapper'></div>
                    </div>
                }
            </div>
        )
    }
};

const mapStateToProps = (state, props) => ({
    note: state.notes.find(note => note.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    removeNote: (id) => dispatch(removeNote(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewNote);