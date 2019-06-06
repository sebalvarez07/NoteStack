import React from 'react';
import { startAddNote } from '../actions/notes';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import WidgetMessage from './WidgetMessage';

const WelcomeWidget = (props) => {

    const handleAddNote = () => {
        props.startAddNote().then(id => {
            history.push(`/edit/${id}`);
        });
    }
    return (
        <WidgetMessage 
            title={'Welcome!'}
            msg={'You have 0 notes to display'}
            imgPath={`/images/welcome-img.png`}
            widgetAction={handleAddNote}
            actionButtonTxt={'Create first note'}
        />
    )
}

const mapDispatchToProps = (dispatch) => ({
    startAddNote: () => dispatch(startAddNote())
})
        
export default connect(undefined, mapDispatchToProps)(WelcomeWidget);