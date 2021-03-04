import './configurator.styles.scss';

import { useState } from 'react';

import { Button, Slider } from '../../../common-components/';
import { MainController } from '../main-controller';

function Configurator({
  arraySize,
  animationSpeed,
  isPlayingAnimation,
  onClick,
  onChange,
  onInput,
}) {
  const [isPanelOpen, setPanelStatus] = useState(true);
  const [inputValue, setInputValue] = useState('');

  function togglePanel() {
    setPanelStatus((previous) => !previous);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
    onChange(event);
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
            checked={inputValue === 'bubbleSort'}
            onChange={handleInputChange}
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
            checked={inputValue === 'selectionSort'}
            onChange={handleInputChange}
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
            checked={inputValue === 'insertionSort'}
            onChange={handleInputChange}
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
            checked={inputValue === 'mergeSort'}
            onChange={handleInputChange}
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
            checked={inputValue === 'quickSort'}
            onChange={handleInputChange}
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
              onInput={onInput}>
              Array Size
            </Slider>
            <Slider
              id='animationSpeed'
              name='animationSpeed'
              title='animation speed'
              min={1}
              max={100}
              value={animationSpeed}
              onInput={onInput}>
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
        onClick={onClick}></MainController>
    </div>
  );
}

export default Configurator;
