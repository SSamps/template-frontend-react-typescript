import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutActionCreator, TlogoutActionCreator } from '../../redux/actions/authAction';
import { Fragment } from 'react';

interface Props {
    logoutActionCreator: TlogoutActionCreator;
    loading: boolean;
    isAuthenticated: boolean | null;
}

const Navbar = ({ logoutActionCreator, loading, isAuthenticated }: Props) => {
    const authedLinks = (
        <ul>
            <li>
                <a onClick={() => logoutActionCreator()} href='#!'>
                    <i></i> <span>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-code'></i> App Name
                </Link>
            </h1>
            {!loading && <Fragment>{isAuthenticated ? authedLinks : guestLinks}</Fragment>}
        </nav>
    );
};

const mapStateToProps = (state: { authReducer: { loading: boolean; isAuthenticated: boolean } }) => ({
    loading: state.authReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { logoutActionCreator })(Navbar);
