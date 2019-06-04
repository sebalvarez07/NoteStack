import React, { useState } from 'react';
import { connect } from 'react-redux';
import { googleStartLoginIn, facebookStartLoginIn } from '../actions/auth';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app');

export const LoginPage = ({googleStartLoginIn, facebookStartLoginIn }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>
            <header className='l-header'>
                <div className='l-content-container'>
                    <div className='flexer space-between'>
                        <img className='l-logo' src='/images/logo.png' />
                        <div className='lheader-right'>
                            <span 
                                onMouseDown={() => setIsOpen(true)}
                                className='l-register'>
                                Register
                            </span>
                            <span className='l-or'>
                                or
                            </span>
                            <span 
                                className='btn btn--blue'
                                onMouseDown={() => setIsOpen(true)}
                                >
                                Sign-in
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className='l-hero' style={{background: `url('/images/l-hero.png')`}}>
                <div className='l-content-container'>
                    <div className='l-content-row'>
                        <div className='l-content-col-4'>
                            <div className='l-new'>
                                <span className='new-icon'>
                                    <i className="ionicons ion-icecream"></i>
                                </span>
                                <span>
                                    New code syntax highlighter
                                </span>
                            </div>

                            <h1 className='d4 text-white'>
                                The easy way to take notes
                            </h1>

                            <p className='l-hero__description'>
                                NoteStack is a note taking web app that is completely free. No ads 
                                and no distractions. Easy to manage and fun to use.
                            </p>

                            <span 
                                onMouseDown={() => setIsOpen(true)}
                                className='btn btn--green'>
                                Get started!
                            </span>
                        </div>
                        <div className='l-content-col-6'>
                            <img className='l-hero__img l-hero__img-1' src='/images/l-hero__mockup-1.png' />
                            <img className='l-hero__img l-hero__img-2' src='/images/l-hero__mockup-2.png' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='features-section'>
                <div className='l-content-container'>
                    <div className='features-widget__container'>
                        <div className='l-features-widget'>
                            <img className='features__icon' src='/images/l_icon_1.png' />
                            <h3 className='feature__txt'>
                                <span className='text-blue'>Quick</span> & <br/>
                                Smart Search
                            </h3>
                        </div>

                        <div className='l-features-widget'>
                            <img className='features__icon' src='/images/l_icon_2.png' />
                            <h3 className='feature__txt'>
                                <span className='text-green'>Adjustable</span><br/>
                                User Interface
                            </h3>
                        </div>

                        <div className='l-features-widget'>
                            <img className='features__icon' src='/images/l_icon_3.png' />
                            <h3 className='feature__txt'>
                                <span className='text-purple'>Code </span> Syntax<br/>
                                Highlighter
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className='l-footer'>
                <div className='l-content-container'>
                    <div className='l-footer__flexer'>
                        <span>
                            Developed by: 
                            <a className='linked' target='_blank' href='https://www.linkedin.com/in/sebastian-alvarez-a94931163/'>
                                Sebastian Alvarez
                            </a>
                        </span>
                        <span>Germs and Conditions</span>
                    </div>
                </div>
            </div>
            <Modal
                onBlur = {() => setIsOpen(false)}
                className="login_modal"
                isOpen={isOpen}
                >
                <span className='l-modal__title'>
                    Sign In / Register
                </span>

                <span className='single-w'>
                    With
                </span>
                <button 
                    className="btn btn--red"
                    onClick={googleStartLoginIn}
                    >
                    <i className="ionicons ion-social-google"></i>
                    Google
                </button>

                <button 
                    className="btn btn--blue"
                    onClick={facebookStartLoginIn}
                    >
                    <i className="ionicons ion-social-facebook"></i>
                    Facebook
                </button>
                <span 
                    onMouseDown={() => setIsOpen(false)}
                    className='l-modal__close'>
                    close
                </span>
            </Modal>
        </React.Fragment>

    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        googleStartLoginIn: () => dispatch(googleStartLoginIn()),
        facebookStartLoginIn: () => dispatch(facebookStartLoginIn())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage);