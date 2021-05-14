import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginActionCreator, TloginActionCreator } from '../../redux/actions/authAction';

interface Props {
    loginActionCreator: TloginActionCreator;
    isAuthenticated: boolean | null;
}

const Login = ({ loginActionCreator, isAuthenticated }: Props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        loginError: '',
    });

    const { email, password, loginError } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var error = await loginActionCreator(email, password);
        if (error) {
            setFormData({ ...formData, loginError: error });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign in to your account
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength={8}
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                {<p className='form-error-message'>{loginError}</p>}
                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: { authReducer: { isAuthenticated: boolean } }) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginActionCreator })(Login);
