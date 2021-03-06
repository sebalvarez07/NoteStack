import React from 'react';
import { connect } from 'react-redux';
import {  setHeaderToCollapsed, setHeaderToNotCollapsed } from '../actions/collapsers';

const HeaderCollapseButton = (props) => {
    const handleHeaderCollapse = (e) => {
        e.preventDefault();
        if(props.headerCollapsed) {
            props.setHeaderToNotCollapsed();
        }
        else {
            props.setHeaderToCollapsed();
        }
    };

    return (
        <span 
            onMouseDown={handleHeaderCollapse}
            className='cursor-pointer h-border-sides h-w80 flex-middle header-icon header-icon--xs'>
            {
                props.headerCollapsed ? 
                <i className="ionicons ion-chevron-down"></i>
                :
                <i className="ionicons ion-chevron-up"></i>
            }
            
        </span>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setHeaderToCollapsed: () => dispatch(setHeaderToCollapsed()),
    setHeaderToNotCollapsed: () => dispatch(setHeaderToNotCollapsed())
})

const mapStateToProps = (state) => ({
    headerCollapsed: state.collapseStatus.headerCollapsed
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCollapseButton);