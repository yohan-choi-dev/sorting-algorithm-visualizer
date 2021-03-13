/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { pause, play, selectPlayer } from '../../../../redux/player-slice.js';

import { Button } from '../../../common-components';
import { PlayIcon, PauseIcon } from '../../../common-components';

function ToggleButton({ className, onClick }) {
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();

  function handleClick(event) {
    const name = event.currentTarget.name;
    if (name === 'pause') {
      dispatch(pause());
    } else if (name === 'play') {
      dispatch(play());
    }
    console.log('toggle', player);
    onClick(event);
  }

  return player ? (
    <Button className={className} name='pause' title='pause' onClick={handleClick}>
      <PauseIcon />
    </Button>
  ) : (
    <Button className={className} name='play' title='play' onClick={handleClick}>
      <PlayIcon />
    </Button>
  );
}

export default ToggleButton;
