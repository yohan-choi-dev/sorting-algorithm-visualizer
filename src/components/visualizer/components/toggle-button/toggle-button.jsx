import { useState } from 'react';

import { Button } from '../../../common-components';
import { PlayIcon, PauseIcon } from '../../../common-components';

function ToggleButton({ className, name, onClick }) {
    const [isButtonPaused, setButtonStatus] = useState(false);
    async function toggleButton(event) {
        onClick(event);
        setButtonStatus((prev) => setButtonStatus(!prev));
    }

    return (
        <Button className={className} name={name} title={isButtonPaused ? 'pause' : 'play'} onClick={toggleButton}>
            {isButtonPaused ? <PauseIcon /> : <PlayIcon />}
        </Button>
    );
}

export default ToggleButton;
