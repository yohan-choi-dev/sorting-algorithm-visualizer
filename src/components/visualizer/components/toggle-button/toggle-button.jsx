import { Button } from '../../../common-components';
import { PlayIcon, PauseIcon } from '../../../common-components';

function ToggleButton({ isPlayingAnimation = false, className, onClick }) {
  const name = isPlayingAnimation ? 'pause' : 'play';

  return (
    <Button className={className} name={name} title={name} onClick={onClick}>
      {isPlayingAnimation ? <PauseIcon /> : <PlayIcon />}
    </Button>
  );
}

export default ToggleButton;
