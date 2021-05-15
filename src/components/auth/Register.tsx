import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerActionCreator, TregisterActionCreator } from '../../redux/actions/authAction';
import { IrootState } from '../../redux/reducers/root/rootReducer';

interface Props {
    registerActionCreator: TregisterActionCreator;
    isAuthenticated: boolean | null;
}

const Register: React.FC<Props> = ({ registerActionCreator, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        password2: '',
    });

    const { displayName, email, password, password2 } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            registerActionCreator(displayName, email, password);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Display Name'
                        name='displayName'
                        value={displayName}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
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
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        minLength={8}
                        value={password2}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { registerActionCreator })(Register);
