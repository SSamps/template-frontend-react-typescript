import { Fragment } from 'react';
import spinner from '../../resources/img/Spinner.svg';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} className='spinner-button' alt='Loading...' />
        </Fragment>
    );
};

export default Spinner;
