import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { Bar } from '../bar';

function ItemList({ list }) {
    if (Array.isArray(list)) {
        const numberOfItems = list.length;
        return list.map((value) => {
            const style = {
                height: (value / 300) * 80 + '%',
                width: 99 / numberOfItems + 'vw',
                fontSize: numberOfItems < 50 ? (100 / numberOfItems) * 0.2 + 'vw' : 0,
            };

            return (
                <Bar key={nanoid()} style={style}>
                    {value}
                </Bar>
            );
        });
    }
}

ItemList.propTypes = {
    list: PropTypes.array,
};

export default ItemList;
