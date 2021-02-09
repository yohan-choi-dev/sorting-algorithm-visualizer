import './visualizer.styles.scss';

import { useState, useEffect } from 'react';
import { useEventListner } from './hooks';

import { defaultConfig } from '../../config';
import { Keys } from './enums';

import { sortingAlgorithms, Animation } from './utils/';
import { delay, getRandomArray } from '../../utils';

import { Configurator, SubController, Display, ItemList } from './components/';

const ALGORITHM_EVENTS = Object.freeze([
    'bubbleSort',
    'selectionSort',
    'insertionSort',
    'mergeSort',
    'quickSort',
]);
const CONTROLLER_EVENTS = Object.freeze(['play', 'backward', 'forward', 'pause', 'reset']);

function Visualizer() {
    const [array, setArray] = useState([]);
    const [config, setConfig] = useState(defaultConfig);
    let animation = null;

    useEffect(() => {
        setArray(getRandomArray(25, 1, 300));
    }, []);

    useEventListner('keydown', handleKeyDown);

    async function initAnimation() {
        if (animation) return;
        const bars = document.getElementsByClassName('bar');
        animation = new Animation(bars, config);
        const clonedArray = [...array];
        config.sortingAlgorithm(clonedArray, animation);
    }

    async function reset() {
        if (animation) {
            animation.pause();
            await delay(config.animationSpeed);
        }
        setArray(getRandomArray(array.length, 1, 300));
    }

    function manipulateController(name) {
        try {
            if (!config.sortingAlgorithm) {
                throw new Error('Sorting algorithm is not selected!');
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
            alert(`Algorithm is not selected! Please, select algorithm. `);
        }
    }

    async function selectAlgorithm(name) {
        await reset();

        if (sortingAlgorithms[name]) {
            setConfig((previous) => setConfig({ ...previous, sortingAlgorithm: sortingAlgorithms[name] }));
        }
    }

    function handleInput({ target: { name, value } }) {
        switch (name) {
            case 'array':
                if (value > array.length + 10 || value < array.length - 10) {
                    if (animation) animation.pause();
                    if (array.length != value) setArray(getRandomArray(value, 1, 300));
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
    }

    function handleClick(event) {
        event.preventDefault();
        const { name } = event.currentTarget;
        if (ALGORITHM_EVENTS.includes(name)) {
            selectAlgorithm(name);
        } else if (CONTROLLER_EVENTS.includes(name)) {
            manipulateController(name);
        }
    }

    function handleKeyDown({ keyCode }) {
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
    }

    return (
        <div className='visualizer'>
            <Display>
                <SubController onClick={handleClick} />
                <ItemList list={array} />
            </Display>
            <Configurator onClick={handleClick} onInput={handleInput} />
        </div>
    );
}

export default Visualizer;
