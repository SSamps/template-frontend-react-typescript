import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { TaddTestDataActionCreator, addTestDataActionCreator } from '../../../redux/actions/testDataActions';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import Spinner from '../../misc/spinner';

interface Props {
    user: IUser;
    addTestDataActionCreator: TaddTestDataActionCreator;
}

const TestDataNew = ({ user, addTestDataActionCreator }: Props) => {
    const [formData, setFormData] = useState({
        testData: '',
    });

    const { testData } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTestDataActionCreator(user._id, testData);
    };

    return (
        <Fragment>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>
                        Add new data:
                        <input
                            type='text'
                            placeholder='new data'
                            name='testData'
                            value={testData}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                <input type='submit' className='btn btn-primary' value='Add' />
            </form>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { addTestDataActionCreator })(TestDataNew);
