import React from 'react';
import { startAddNote } from '../actions/notes';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';

const WelcomeWidget = (props) => {

    const handleAddNote = () => {
        props.startAddNote().then(id => {
            history.push(`/edit/${id}`);
        });
    }

    return (
        <div className='welcome-widget'>
            <h3 className='welcome__title'>
                Welcome!
            </h3>
            <span className='welcome__note-count'>
                You have 0 notes to display
            </span>
            <img className='welcome__image' src={`/images/welcome-img.png`}/>
            <button 
                onClick={handleAddNote}
                className='btn btn--blue'>
                Create first note
            </button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startAddNote: () => dispatch(startAddNote())
})
        
export default connect(undefined, mapDispatchToProps)(WelcomeWidget);