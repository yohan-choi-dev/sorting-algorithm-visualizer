import './main-controller.styles.scss';

import { Button } from '../../../common-components';
import { BackwardIcon, PlayIcon, PauseIcon, ResetIcon, ForwardIcon } from '../../../common-components';

function Controller({ onClick }) {
    return (
        <div className='main-controller'>
            <Button className='btn btn-icon' name='backward' onClick={onClick}>
                <BackwardIcon />
            </Button>
            <Button className='btn btn-icon' name='play' onClick={onClick}>
                <PlayIcon />
            </Button>
            <Button className='btn btn-icon' name='pause' onClick={onClick}>
                <PauseIcon />
            </Button>
            <Button className='btn btn-icon' name='reset' onClick={onClick}>
                <ResetIcon />
            </Button>
            <Button className='btn btn-icon' name='forward' onClick={onClick}>
                <ForwardIcon />
            </Button>
        </div>
    );
}

export default Controller;
