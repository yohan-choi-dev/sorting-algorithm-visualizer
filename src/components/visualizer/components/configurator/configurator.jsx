import './configurator.styles.scss';

import { Button, Slider, FoldIcon } from '../../../common-components/';

function Configurator({ onClick, onInput }) {
    let isDisplay = true;
    const fold = () => {
        const configuratorPanel = document.getElementById('configurator-panel');
        isDisplay = !isDisplay;
        configuratorPanel.style.display = isDisplay ? 'block' : 'none';
    };

    const handleOnClick = (event) => {
        event.preventDefault();
        const name = event.currentTarget.name;
        if (name === 'fold') {
            fold();
        } else {
            onClick(event);
        }
    };

    return (
        <div className='configurator'>
            <div id='configurator-panel' className='configurator-panel'>
                <div>
                    <h3>Select Algorithm!</h3>
                    <Button name='bubbleSort' onClick={handleOnClick}>
                        Bubble Sort
                    </Button>
                    <Button name='selectionSort' onClick={handleOnClick}>
                        Selection Sort
                    </Button>
                    <Button name='insertionSort' onClick={handleOnClick}>
                        Insertion Sort
                    </Button>
                    <Button name='mergeSort' onClick={handleOnClick}>
                        Merge Sort
                    </Button>
                    <Button name='quickSort' onClick={handleOnClick}>
                        Quick Sort
                    </Button>
                </div>
                <div>
                    <Slider id='arraySize' name='array' min={20} max={400} onInput={onInput}>
                        Array Size
                    </Slider>
                    <Slider id='animationSpeed' name='animationSpeed' min={1} max={100} onInput={onInput}>
                        Animation Speed
                    </Slider>
                </div>
            </div>
            <Button className='button icon' name='fold' onClick={handleOnClick}>
                <FoldIcon />
            </Button>
        </div>
    );
}

export default Configurator;
