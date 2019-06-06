import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { setSidebarToCollapsed, setHeaderToNotCollapsed } from '../actions/collapsers';
import WidgetMessage from './WidgetMessage';

const NotFoundPage = (props) => {

    const returnToDashboard = () => {
        props.history.push('/');
    }

    return (
        <div>
            <div 
                id='wrapper'
                className={`wrapper ${ props.sidebarCollapsed ? 'sidebar-collapse' : '' } ${ props.headerCollapsed ? 'header-collapse' : '' }` }>
                <Sidebar />
                { !props.sidebarCollapsed && <div className='sidebar-overlay--mobile'></div> }
                <div className='content-page'>
                    <div className='header-wrapper'>
                        <Header />
                    </div>

                    <div className='dashboard-container'>
                        <div className='content-container'>
                            <WidgetMessage 
                                title={'Whoops!'}
                                msg={'Can’t find what you’re looking for...'}
                                imgPath={`/images/404-icon.png`}
                                widgetAction={returnToDashboard}
                                actionButtonTxt={'Return to Dashboard'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    headerCollapsed: state.collapseStatus.headerCollapsed,
    sidebarCollapsed: state.collapseStatus.sidebarCollapsed,
});

const mapDispatchToProps = (dispatch) => ({
    setSidebarToCollapsed: () => dispatch(setSidebarToCollapsed()),
    setHeaderToNotCollapsed: () => dispatch(setHeaderToNotCollapsed())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);