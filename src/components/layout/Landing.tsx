import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IauthState } from '../../redux/reducers/authReducer';

const landing = ({ isAuthenticated }: { isAuthenticated: boolean | null }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Header</h1>
                    <p className='lead'>Headline goes here</p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link to='/login' className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: { authReducer: IauthState }) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(landing);
