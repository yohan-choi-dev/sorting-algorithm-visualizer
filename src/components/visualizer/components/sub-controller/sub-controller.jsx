import './sub-controller.styles.scss';

import { delay } from '../../../../utils';

import { BackwardIcon, PlayIcon, ForwardIcon } from '../../../common-components/icons';

function SubController({ onClick }) {
    const controller = document.getElementById('controller');
    const subControllerButtons = [...document.getElementsByClassName('sub-controller-button')];
    let isWorking = false;
    const handleMouseOver = async () => {
        if (!isWorking) {
            controller.style.color = 'rgba(255,255,255,1)';
            subControllerButtons.forEach((content) => {
                content.style.backgroundColor = 'rgba(255,255,255,0.2)';
                content.style.border = '1px rgba(255, 255, 255, 0.2) solid';
            });
            isWorking = true;
            await delay(3000);
            controller.style.color = 'rgba(255,255,255,0)';
            subControllerButtons.forEach((content) => {
                content.style.backgroundColor = 'rgba(255,255,255,0)';
                content.style.border = '1px rgba(255, 255, 255, 0) solid';
            });
            isWorking = false;
        }
    };
    return (
        <div className='sub-controller' id='controller' onMouseOver={handleMouseOver}>
            <a className='sub-controller-button' name='backward' onClick={onClick} href='#'>
                <BackwardIcon />
            </a>
            <a className='sub-controller-button' name='play' onClick={onClick} href='#'>
                <PlayIcon />
            </a>
            <a className='sub-controller-button' name='forward' onClick={onClick} href='#'>
                <ForwardIcon />
            </a>
        </div>
    );
}

export default SubController;
