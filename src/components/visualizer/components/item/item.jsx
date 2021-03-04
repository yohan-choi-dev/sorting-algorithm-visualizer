import './item.styles.scss';

function Item({ style, children }) {
  return (
    <div style={style} className='item'>
      {children}
    </div>
  );
}

export default Item;
