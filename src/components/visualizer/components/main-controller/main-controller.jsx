import './main-controller.styles.scss';

import { Button } from '../../../common-components';
import {
    BackwardIcon,
    ForwardIcon,
    PauseIcon,
    PlayIcon,
    ResetIcon,
    ConfigIcon,
} from '../../../common-components';

function Controller({ togglePanel, onClick }) {
    return (
        <div className='main-controller'>
            <Button className='main-controller-button' title='backward' name='backward' onClick={onClick}>
                <BackwardIcon />
            </Button>
            <Button className='main-controller-button' title='play' name='play' onClick={onClick}>
                <PlayIcon />
            </Button>
            <Button className='main-controller-button' title='pause' name='pause' onClick={onClick}>
                <PauseIcon />
            </Button>
            <Button
                className='main-controller-button'
                name='fold'
                title={'configuration'}
                onClick={togglePanel}>
                <ConfigIcon />
            </Button>
            <Button className='main-controller-button' title='reset' name='reset' onClick={onClick}>
                <ResetIcon />
            </Button>
            <Button className='main-controller-button' title='forward' name='forward' onClick={onClick}>
                <ForwardIcon />
            </Button>
        </div>
    );
}

export default Controller;
