import React from 'react';
import PropTypes from 'prop-types';

import styles from './DropDownMenu.css';

const DropDownMenu = ({ changed, citiesList }) => (
    <select onChange={changed} className={styles.Dropdown}>
        <option>Add City</option>
        {
            citiesList.map(city => 
                <option 
                    key={city.Key} 
                    value={city.EnglishName}
                >
                    {city.EnglishName}
                </option>
            )
        }  
    </select>   
);

DropDownMenu.propTypes = {
    changed: PropTypes.func.isRequired,
    citiesList: PropTypes.arrayOf(
        PropTypes.shape({
            Key: PropTypes.string.isRequired,
            EnglishName: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

export default DropDownMenu;