import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';

import styles from './SelectedCities.css';

const SelectedCities = ({ selected, close, clicked }) => (
    <ul>
        {
            selected.map(city => 
                <li key={city.Key}>
                    <div 
                        onClick={clicked} 
                        className={styles.selectedCities}
                    >
                        {city.EnglishName}
                    </div>
                    <CloseButton 
                        close={close} 
                        id={city.Key}
                    />
                </li>
            )
        } 
    </ul>
);

SelectedCities.propTypes = {
    selected: PropTypes.arrayOf(
        PropTypes.shape({
            Key: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    close: PropTypes.func.isRequired,
    clicked: PropTypes.func.isRequired,
};

export default SelectedCities;