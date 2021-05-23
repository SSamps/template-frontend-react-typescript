import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../redux/reducers/root/rootReducer';
import { getTestDataActionCreator } from '../../redux/actions/testDataActions';
import { Fragment, useEffect } from 'react';
import { ItestDataState } from '../../redux/reducers/testDataReducer';
import { IUser } from '../../types/models/User';

interface Props extends ItestDataState {
    user: IUser;
    getTestDataActionCreator: any;
}

export const TestData: React.FC<Props> = ({ user, getTestDataActionCreator, testData }: Props) => {
    useEffect(() => {
        getTestDataActionCreator(user?._id);
    }, [user?._id, getTestDataActionCreator]);

    return (
        <Fragment>
            <div>
                {testData ? (
                    testData.map((element) => <div key={element._id}>{element.testVar}</div>)
                ) : (
                    <p>No test data</p>
                )}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    loading: state.testDataReducer.loading,
    testData: state.testDataReducer.testData,
    error: state.testDataReducer.error,
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { getTestDataActionCreator })(TestData);
