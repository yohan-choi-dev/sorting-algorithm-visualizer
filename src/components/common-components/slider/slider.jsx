import './slider.styles.scss';

import PropTypes from 'prop-types';

function Slider({ id, name, min = 1, max = 100, value = 0, title, onInput, children }) {
  return (
    <div className='slider'>
      <label htmlFor={id} className='slider__label'>
        <p>{children}</p>
      </label>
      <input
        id={id}
        className='slider__input'
        type='range'
        name={name}
        value={value}
        min={min}
        max={max}
        title={title}
        onInput={onInput}
      />
    </div>
  );
}

Slider.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onInput: PropTypes.func,
};

export default Slider;
