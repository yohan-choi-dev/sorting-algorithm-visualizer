import './configurator.styles.scss';

import { useState } from 'react';

import { Button, Slider } from '../../../common-components/';

import { MainController } from '../main-controller';

function Configurator({ onClick, onInput }) {
    let [isPanelOpen, setPanelStatus] = useState(true);

    function handleOnClick(event) {
        event.preventDefault();
        onClick(event);
    }

    function togglePanel() {
        setPanelStatus((previous) => !previous);
    }

    return (
        <div className='configurator'>
            {isPanelOpen && (
                <div className='configurator__panel'>
                    <h1 className='heading-primary title'>Sorting Algorithm Visualizer</h1>
                    <span className='title-space'></span>

                    <h2 className='heading-secondary sub-title'>Select Algorithm!</h2>
                    <Button name='bubbleSort' title='bubble sort' onClick={handleOnClick}>
                        Bubble Sort
                    </Button>
                    <Button name='selectionSort' title='selection sort' onClick={handleOnClick}>
                        Selection Sort
                    </Button>
                    <Button name='insertionSort' title='insertion sort' onClick={handleOnClick}>
                        Insertion Sort
                    </Button>
                    <Button name='mergeSort' title='merge sort' onClick={handleOnClick}>
                        Merge Sort
                    </Button>
                    <Button name='quickSort' title='quick sort' onClick={handleOnClick}>
                        Quick Sort
                    </Button>
                    <div>
                        <Slider
                            id='arraySize'
                            name='array'
                            title='array size'
                            min={20}
                            max={400}
                            onInput={onInput}>
                            Array Size
                        </Slider>
                        <Slider
                            id='animationSpeed'
                            name='animationSpeed'
                            title='animation speed'
                            min={1}
                            max={100}
                            onInput={onInput}>
                            Animation Speed
                        </Slider>
                    </div>
                    <Button className='close-button' name='fold' title='close' onClick={togglePanel}>
                        close
                    </Button>
                </div>
            )}
            <MainController togglePanel={togglePanel} onClick={onClick}></MainController>
        </div>
    );
}

export default Configurator;
