import React from 'react';
import { connect } from 'react-redux';
import {  setSidebarToCollapsed, setSidebarToNotCollapsed, setHeaderToCollapsed, setHeaderToNotCollapsed } from '../actions/collapsers';

const SidebarCollapseButton = (props) => {
    const handleSidebarCollapse = (e) => {
        e.preventDefault();
        if(props.sidebarCollapsed) {
            props.setSidebarToNotCollapsed();
        }
        else {
            props.setSidebarToCollapsed();
        }
    };

    return (
        <button 
            onClick={handleSidebarCollapse}
            className='sidebar-collapser__btn h-border-sides'>
            <i className="ionicons ion-chevron-left"></i>
        </button>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setSidebarToCollapsed: () => dispatch(setSidebarToCollapsed()),
    setSidebarToNotCollapsed: () => dispatch(setSidebarToNotCollapsed())
})

const mapStateToProps = (state) => ({
    sidebarCollapsed: state.collapseStatus.sidebarCollapsed
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCollapseButton);