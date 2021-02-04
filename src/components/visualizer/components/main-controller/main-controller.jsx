import './main-controller.styles.scss';

import { Button } from '../../../common-components';
import { BackwardIcon, PlayIcon, PauseIcon, ResetIcon, ForwardIcon } from '../../../common-components';

function Controller({ onClick }) {
    return (
        <div className='main-controller'>
            <Button className='button icon' name='backward' onClick={onClick}>
                <BackwardIcon />
            </Button>
            <Button className='button icon' name='play' onClick={onClick}>
                <PlayIcon />
            </Button>
            <Button className='button icon' name='pause' onClick={onClick}>
                <PauseIcon />
            </Button>
            <Button className='button icon' name='reset' onClick={onClick}>
                <ResetIcon />
            </Button>
            <Button className='button icon' name='forward' onClick={onClick}>
                <ForwardIcon />
            </Button>
        </div>
    );
}

export default Controller;
