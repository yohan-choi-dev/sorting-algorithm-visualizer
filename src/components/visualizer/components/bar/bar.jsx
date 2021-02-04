import './bar.styles.scss';

function Bar({ index, style, children }) {
    return (
        <div id={index} className='bar' style={style}>
            {children}
        </div>
    );
}

export default Bar;
