import './sub-controller.styles.scss';

import { useState } from 'react';
import { delay } from '../../../../utils';

import { ToggleButton } from '../toggle-button';
import { Button, BackwardIcon, ForwardIcon } from '../../../common-components/';

function SubController({ isPlayingAnimation, onEvent }) {
  const [isWorking, setWorkingStatus] = useState(false);
  const modifier = isWorking ? 'activated' : 'deactivated';
  const subConColClassName = 'sub-controller__column';
  const subConBtnClassName = 'sub-controller-button sub-controller__column--' + modifier;

  async function handleMouseOver() {
    if (!isWorking) {
      setWorkingStatus(true);
      await delay(100);
      setWorkingStatus(false);
    }
  }

  return (
    <div className='sub-controller' onMouseOver={handleMouseOver}>
      <div className={subConColClassName}>
        <Button className={subConBtnClassName} name='backward' title='backward' onClick={onEvent}>
          <BackwardIcon />
        </Button>
      </div>
      <div className={subConColClassName}>
        <ToggleButton
          className={subConBtnClassName}
          isPlayingAnimation={isPlayingAnimation}
          onClick={onEvent}></ToggleButton>
      </div>
      <div className={subConColClassName}>
        <Button className={subConBtnClassName} name='forward' title='forward' onClick={onEvent}>
          <ForwardIcon />
        </Button>
      </div>
    </div>
  );
}

export default SubController;
