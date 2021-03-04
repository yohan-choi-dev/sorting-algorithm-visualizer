import './main-controller.styles.scss';

import { Button } from '../../../common-components';
import { ToggleButton } from '../toggle-button';
import { BackwardIcon, ForwardIcon, ResetIcon, ConfigIcon } from '../../../common-components';

function Controller({ togglePanel, isPlayingAnimation, onClick }) {
  return (
    <div className='main-controller'>
      <Button className='main-controller-button' title='backward' name='backward' onClick={onClick}>
        <BackwardIcon />
      </Button>

      <Button
        className='main-controller-button'
        name='fold'
        title={'configuration'}
        onClick={togglePanel}>
        <ConfigIcon />
      </Button>
      <ToggleButton
        className='main-controller-button'
        isPlayingAnimation={isPlayingAnimation}
        onClick={onClick}></ToggleButton>
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
