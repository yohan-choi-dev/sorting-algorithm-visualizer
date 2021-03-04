import { useState, useEffect, useRef } from 'react';
import { useEventListner } from './hooks';

import { defaultConfig } from '../../config';
import { Keys } from './enums';

import { sortingAlgorithms, Animation } from './utils/';
import { delay, getRandomArray } from '../../utils';

import './visualizer.styles.scss';

import { Configurator, Item, Scene, SubController } from './components/';

const ALGORITHM_EVENTS = Object.freeze([
  'bubbleSort',
  'selectionSort',
  'insertionSort',
  'mergeSort',
  'quickSort',
]);

const ALGORITHM_NAMES = {
  bubbleSort: 'Bubble Sort',
  selectionSort: 'Selection Sort',
  insertionSort: 'Insertion Sort',
  mergeSort: 'Merge Sort',
  quickSort: 'Quick Sort',
};

const CONTROLLER_EVENTS = Object.freeze(['play', 'backward', 'forward', 'pause', 'reset']);

function Visualizer() {
  const [array, setArray] = useState(getRandomArray(25, 1, 300));
  const [isPlayingAnimation, setAnimationPlayingStatus] = useState(false);
  const [config, setConfig] = useState(defaultConfig);
  const animationRef = useRef(null);
  const items = document.getElementsByClassName('item');

  const listItems = array.map((value, index, array) => {
    const numberOfItems = array.length;
    const style = {
      height: (value / 300) * 80 + '%',
      width: 99 / numberOfItems + 'vw',
      fontSize: numberOfItems < 50 ? (100 / numberOfItems) * 0.2 + 'vw' : 0,
    };

    return (
      <Item key={index} style={style}>
        {value}
      </Item>
    );
  });

  useEventListner('keydown', handleKeyDown);

  useEffect(() => {
    animationRef.current = new Animation(items, config);

    return () => (animationRef.current = null);
  }, [config, items]);

  async function initAnimation() {
    if (!animationRef.current.frames.length) {
      const clonedArray = [...array];
      config.sortingAlgorithm(clonedArray, animationRef.current);
    }
  }

  async function resetAnimation() {
    if (animationRef.current) {
      animationRef.current.pause();
      await delay(config.animationSpeed);
    }
    setAnimationPlayingStatus(false);
    setArray([]);
    setArray(getRandomArray(array.length, 1, 300));
  }

  function animationPlayer(name) {
    try {
      if (!config.sortingAlgorithm) {
        throw new Error('Sorting algorithm is not selected! Please select algorithm.');
      }

      initAnimation();
      const playAnimation = () => {
        const isPlaying = animationRef.current.getAnimationStatus();
        animationRef.current?.play();
        setAnimationPlayingStatus(isPlaying);
      };

      const controller = {
        play: playAnimation,
        backward: animationRef.current?.backward,
        forward: animationRef.current?.forward,
        pause: playAnimation,
        reset: resetAnimation,
      };

      if (Object.prototype.hasOwnProperty.call(controller, name)) {
        controller[name]();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function selectAlgorithm(name) {
    await resetAnimation();

    if (sortingAlgorithms[name]) {
      setConfig((previous) => ({
        ...previous,
        sortingAlgorithm: sortingAlgorithms[name],
        sortingAlgorithmName: ALGORITHM_NAMES[name],
      }));
    }
  }

  async function generateArray(value) {
    if (value > array.length + 10 || value < array.length - 10) {
      await resetAnimation();
      setArray(getRandomArray(value, 1, 300));
    }
  }

  function handleInput({ target: { name, value } }) {
    if (name === 'array') {
      return generateArray(value);
    }

    if (name === 'animationSpeed') {
      if (animationRef.current) animationRef.current.pause();
      return setConfig((previous) => ({
        ...previous,
        [name]: 100 - value,
      }));
    }
  }

  function handleClick(event) {
    event.preventDefault();
    const { name } = event.currentTarget;

    if (ALGORITHM_EVENTS.includes(name)) {
      return selectAlgorithm(name);
    }

    if (CONTROLLER_EVENTS.includes(name)) {
      return animationPlayer(name);
    }
  }

  function handleChange(event) {
    event.preventDefault();
    const { name } = event.currentTarget;

    if (ALGORITHM_EVENTS.includes(name)) {
      return selectAlgorithm(name);
    }

    if (CONTROLLER_EVENTS.includes(name)) {
      return animationPlayer(name);
    }
  }

  function handleKeyDown({ keyCode }) {
    switch (keyCode) {
      case Keys.SPACEBAR:
        animationPlayer('play');
        break;
      case Keys.LEFT:
        animationPlayer('backward');
        break;
      case Keys.RIGHT:
        animationPlayer('forward');
        break;
      default:
        break;
    }
  }

  return (
    <div className='visualizer'>
      <Scene>
        <SubController
          isPlayingAnimation={isPlayingAnimation}
          onClick={handleClick}
          onChange={handleChange}
        />
        {listItems}
      </Scene>
      <Configurator
        isPlayingAnimation={isPlayingAnimation}
        arraySize={array.length}
        animationSpeed={100 - config.animationSpeed}
        onClick={handleClick}
        onChange={handleChange}
        onInput={handleInput}
      />
    </div>
  );
}

export default Visualizer;
