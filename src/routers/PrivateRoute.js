import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { setSidebarToCollapsed, setHeaderToNotCollapsed } from '../actions/collapsers';

export class PrivateRoute extends React.Component {

    componentDidMount () {
        if(window.innerWidth < 1200 ){
            this.props.setSidebarToCollapsed();
        }
    }
    
    componentDidUpdate () {
        this.props.setHeaderToNotCollapsed();
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.sidebarCollapsed !== nextProps.sidebarCollapsed) {
            document.getElementById('wrapper').classList.toggle('sidebar-collapse');
            return false;
        }
        else if(this.props.headerCollapsed !== nextProps.headerCollapsed) {
            document.getElementById('wrapper').classList.toggle('header-collapse');
            return false;
        }
        else {
            return true;
        }
    }

    render () {
        const { isAuthenticated, component: Component, ...rest } = this.props;
        return (
            <Route {...rest} component={(props) => (
                isAuthenticated ? (
                    <div 
                        id='wrapper' 
                        className={`wrapper ${ rest.sidebarCollapsed ? 'sidebar-collapse' : '' } ${ rest.headerCollapsed ? 'header-collapse' : '' }` }>
                        <Sidebar />
                        { !rest.sidebarCollapsed && <div className='sidebar-overlay--mobile'></div> }
                        <div className='content-page'>
                            <Component {...props} />
                        </div>
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            )}/>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    headerCollapsed: state.collapseStatus.headerCollapsed,
    sidebarCollapsed: state.collapseStatus.sidebarCollapsed,
});

const mapDispatchToProps = (dispatch) => ({
    setSidebarToCollapsed: () => dispatch(setSidebarToCollapsed()),
    setHeaderToNotCollapsed: () => dispatch(setHeaderToNotCollapsed())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

/*
    NOTES:

    component props. Analyze the following lines

    <Route path="/randPage" component={HomeButton}

    const HomeButton = (props) => {
        return (
            <button onClick={ () => props.history.push('/')}> 
                Go Home
            </button>
        );
    };

    Same as saying:

    <Route path="/randPage" component={ (props) => {
        return (
            <button {...props} onClick={ () => props.history.push('/')}> 
                Go Home
            </button>
        );
    } }

    See that what is passed inside component={} is basically a callBack function (or object with constructor)
    And the CB function gets the props arguments passed down by default
    That is why in the PrivateRoute code we must provide the {...props} and the reason why we can 
    get them, is because they are passed down automatically to any CB function.

*/