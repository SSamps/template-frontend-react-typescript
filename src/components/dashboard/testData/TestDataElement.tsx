import { connect } from 'react-redux';
import { Fragment } from 'react';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import { deleteTestDataActionCreator, TdeleteTestDataActionCreator } from '../../../redux/actions/testDataActions';

interface Props {
    user: IUser;
    element: { _id: string; testVar: string };
    deleteTestDataActionCreator: TdeleteTestDataActionCreator;
}

const TestDataElement = ({ user, element, deleteTestDataActionCreator }: Props) => {
    const onClickDelete = () => {
        console.log('hi');
        deleteTestDataActionCreator(user._id, element._id);
    };

    return (
        <Fragment>
            <div>
                <button onClick={onClickDelete}>
                    {' '}
                    <i className='fas fa-times'></i>
                </button>{' '}
                {element.testVar}{' '}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { deleteTestDataActionCreator })(TestDataElement);
