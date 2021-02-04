import './visualizer.styles.scss';

import { useState, useEffect } from 'react';
import { useEventListner } from './hooks';

import { defaultConfig } from '../../config';
import { Keys } from './enums';

import { sortingAlgorithms, Animation } from './utils/';
import { delay, getRandomArray } from '../../utils';

import { Configurator, MainController, SubController, Display, ItemList } from './components/';

const ALGORITHM_EVENTS = Object.freeze(['bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort', 'quickSort']);

const CONTROLLER_EVENTS = Object.freeze(['play', 'backward', 'forward', 'reset', 'pause']);

function Visualizer() {
    const [array, setArray] = useState([]);
    const [config, setConfig] = useState(defaultConfig);

    let animation = null;

    const initAnimation = () => {
        if (animation) return;
        const bars = document.getElementsByClassName('bar');
        animation = new Animation(bars, config);
        config.sortingAlgorithm(array, animation);
    };

    const reset = async () => {
        if (animation) {
            animation.pause();
            await delay(config.animationSpeed);
        }
        setArray(getRandomArray(array.length, 1, 300));
    };

    const manipulateController = (name) => {
        try {
            if (!config.sortingAlgorithm) {
                throw new Error('Sorting algorithm is not selected! \n Please, select sorting algorithm!');
            }

            if (!animation) {
                initAnimation();
            }

            const controller = {
                play: animation?.play,
                backward: animation?.backward,
                forward: animation?.forward,
                pause: animation?.pause,
                reset: reset,
            };

            if (Object.prototype.hasOwnProperty.call(controller, name)) {
                controller[name]();
            }
        } catch (error) {
            alert(error);
        }
    };

    const selectAlgorithm = async (name) => {
        await reset();
        if (sortingAlgorithms[name]) {
            setConfig((previous) => setConfig({ ...previous, sortingAlgorithm: sortingAlgorithms[name] }));
        }
    };

    useEffect(() => setArray(getRandomArray(25, 1, 300)), []);

    const handleInput = async ({ target: { name, value } }) => {
        delay(300);

        switch (name) {
            case 'array':
                if (value > array.length + 10 || value < array.length - 10) {
                    if (animation) animation.pause();
                    setArray(getRandomArray(value, 1, 300));
                }
                break;
            case 'animationSpeed':
                if (animation) animation.pause();
                setConfig((previous) => ({
                    ...previous,
                    [name]: 100 - value,
                }));
                break;
            default:
                break;
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        const { name } = event.currentTarget;
        if (ALGORITHM_EVENTS.includes(name)) {
            selectAlgorithm(name);
        } else if (CONTROLLER_EVENTS.includes(name)) {
            manipulateController(name);
        }
    };

    const handleKeyDown = ({ keyCode }) => {
        switch (keyCode) {
            case Keys.SPACEBAR:
                manipulateController('play');
                break;
            case Keys.LEFT:
                manipulateController('backward');
                break;
            case Keys.RIGHT:
                manipulateController('forward');
                break;
            default:
                break;
        }
    };

    useEventListner('keydown', handleKeyDown);

    return (
        <div className='visualizer'>
            <Configurator onClick={handleClick} onInput={handleInput} />
            <MainController animation={animation} onClick={handleClick} />
            <Display>
                <SubController onClick={handleClick} />
                <ItemList list={array} />
            </Display>
        </div>
    );
}

export default Visualizer;
