import './slider.styles.scss';

import PropTypes from 'prop-types';

function Slider({ id, name, min, max, onInput, children }) {
    return (
        <div className='slider'>
            <label htmlFor={id} className='slider__label'>
                {children}
            </label>
            <input id={id} className='slider__input' type='range' name={name} min={min} max={max} onInput={onInput} />
        </div>
    );
}

Slider.defaultProps = {
    min: 1,
    max: 100,
};

Slider.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    onInput: PropTypes.func,
};

export default Slider;
