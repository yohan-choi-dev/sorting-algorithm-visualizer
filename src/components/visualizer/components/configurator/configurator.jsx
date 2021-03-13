/* React */
import { useState } from 'react';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { selection, selectAlgorithm } from '../../../../redux/algorithm-slice';

/* Styles */
import './configurator.styles.scss';

import { Button, Slider } from '../../../common-components/';
import { MainController } from '../main-controller';

function Configurator({ arraySize, animationSpeed, isPlayingAnimation, onEvent }) {
  const [isPanelOpen, setPanelStatus] = useState(true);
  const algorithm = useSelector(selectAlgorithm);
  const dispatch = useDispatch();

  function togglePanel() {
    setPanelStatus((previous) => !previous);
  }

  function handleChange(event) {
    const value = event.target.value;
    dispatch(selection(value));
  }

  return (
    <div className='configurator'>
      {isPanelOpen && (
        <div className='configurator__panel'>
          <h1 className='heading-primary title'>Sorting Algorithm Visualizer</h1>
          <span className='title-space'></span>

          <h2 className='heading-secondary sub-title'>Select Algorithm!</h2>
          <input
            type='radio'
            id='menu-button-1'
            name='bubbleSort'
            value='bubbleSort'
            title='Bubble Sort'
            className='menu__input'
            checked={algorithm === 'bubbleSort'}
            onChange={handleChange}
          />
          <label htmlFor='menu-button-1' className='menu__option'>
            Bubble Sort
          </label>
          <input
            type='radio'
            id='menu-button-2'
            name='selectionSort'
            value='selectionSort'
            title='Selection Sort'
            className='menu__input'
            checked={algorithm === 'selectionSort'}
            onChange={handleChange}
          />
          <label htmlFor='menu-button-2' className='menu__option'>
            Selection Sort
          </label>
          <input
            type='radio'
            id='menu-button-3'
            name='insertionSort'
            value='insertionSort'
            title='Insertion Sort'
            className='menu__input'
            checked={algorithm === 'insertionSort'}
            onChange={handleChange}
          />
          <label htmlFor='menu-button-3' className='menu__option'>
            Insertion Sort
          </label>
          <input
            type='radio'
            id='menu-button-4'
            name='mergeSort'
            value='mergeSort'
            title='Merge Sort'
            className='menu__input'
            checked={algorithm === 'mergeSort'}
            onChange={handleChange}
          />
          <label htmlFor='menu-button-4' className='menu__option'>
            Merge Sort
          </label>
          <input
            type='radio'
            id='menu-button-5'
            name='quickSort'
            value='quickSort'
            title='Quick Sort'
            className='menu__input'
            checked={algorithm === 'quickSort'}
            onChange={handleChange}
          />
          <label htmlFor='menu-button-5' className='menu__option'>
            Quick Sort
          </label>

          <div>
            <Slider
              id='arraySize'
              name='array'
              title='array size'
              min={20}
              max={400}
              value={arraySize}
              onInput={onEvent}>
              Array Size
            </Slider>
            <Slider
              id='animationSpeed'
              name='animationSpeed'
              title='animation speed'
              min={1}
              max={100}
              value={animationSpeed}
              onInput={onEvent}>
              Animation Speed
            </Slider>
          </div>
          <Button className='close-button' name='fold' title='close' onClick={togglePanel}>
            close
          </Button>
        </div>
      )}
      <MainController
        togglePanel={togglePanel}
        isPlayingAnimation={isPlayingAnimation}
        onClick={onEvent}></MainController>
    </div>
  );
}

export default Configurator;
