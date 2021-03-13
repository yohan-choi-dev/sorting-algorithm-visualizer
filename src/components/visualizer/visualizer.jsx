/* React */
import { useState, useEffect, useRef } from 'react';
import { useEventListner } from './hooks';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { pause, selectPlayer } from '../../redux/player-slice';
import { selectAlgorithm } from '../../redux/algorithm-slice';

/* Utilities */
import { sortingAlgorithms, Animation } from './utils/';
import { delay, getRandomArray } from '../../utils';

/* Styles */
import './visualizer.styles.scss';

/* Components */
import { Configurator, Item, Scene, SubController } from './components/';

/* Global Variables */
import { defaultConfig } from '../../config';
import { Keys } from './enums';

const CONTROLLER_EVENTS = Object.freeze(['play', 'backward', 'forward', 'pause', 'reset']);

const CONFIGURATION_EVENTS = Object.freeze(['array', 'animationSpeed']);

/* Visulizer is the core component of the application */
function Visualizer() {
  const [array, setArray] = useState(getRandomArray(25, 1, 300));
  const [config, setConfig] = useState(defaultConfig);

  const animationRef = useRef(new Animation());

  const algorithm = useSelector(selectAlgorithm);

  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();

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
    const items = document.getElementsByClassName('item');
    animationRef.current.accessorConfig = config;
    animationRef.current.accessorTargets = items;
  }, [config]);

  async function initAnimation() {
    if (!animationRef.current.frames.length) {
      const clonedArray = [...array];
      const sortingAlgorithm = sortingAlgorithms[algorithm];
      sortingAlgorithm(clonedArray, animationRef.current);
    }
  }

  async function resetAnimation() {
    try {
      dispatch(pause());
      if (animationRef.current) {
        animationRef.current.pause();
        await delay(config.animationSpeed);
      }
      animationRef.current.clear();

      setArray(getRandomArray(array.length, 1, 300));
    } catch (error) {
      console.error(error);
    }
  }

  function animationPlayer(name) {
    try {
      initAnimation();
      const playAnimation = () => {
        if (player) {
          animationRef.current.pause();
        } else {
          animationRef.current.play();
        }
      };

      const controller = {
        play: playAnimation,
        backward: animationRef.current.backward,
        forward: animationRef.current.forward,
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

  async function generateArray(value) {
    if (value > array.length + 10 || value < array.length - 10) {
      await resetAnimation();
      setArray(getRandomArray(value, 1, 300));
    }
  }

  function updateConfiguration({ target: { name, value } }) {
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

  function handleEvent(event) {
    event.preventDefault();
    const { name } = event.currentTarget;

    if (CONTROLLER_EVENTS.includes(name)) {
      return animationPlayer(name);
    }

    if (CONFIGURATION_EVENTS.includes(name)) {
      return updateConfiguration(event);
    }
  }

  function handleKeyDown(event) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      case Keys.SPACEBAR:
        animationPlayer('play');
        return;
      case Keys.LEFT:
        animationPlayer('backward');
        return;
      case Keys.RIGHT:
        animationPlayer('forward');
        return;
      default:
        return;
    }
  }

  return (
    <div className='visualizer'>
      <Scene>
        <SubController onEvent={handleEvent} />
        {listItems}
      </Scene>
      <Configurator
        arraySize={array.length}
        animationSpeed={100 - config.animationSpeed}
        onEvent={handleEvent}
      />
    </div>
  );
}

export default Visualizer;
