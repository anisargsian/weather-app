import React from 'react';
import PropTypes from 'prop-types';

import styles from'./WeatherContainer.css';

const WeatherContainer = ({ data }) => (
    <div className={styles.WeatherContainer} >
        <div className={styles.Date} >{Date().split(' ').slice(0, 4).join(' ')}</div>
        <table className={styles.WeatherTable} >
            <tbody>
                <tr>
                    <td className={styles.TemperatureCell}>MIN</td>
                    <td className={styles.TemperatureCell}>MAX</td>
                </tr>
                <tr>
                    <td className={styles.TemperatureCell}>{+data.DailyForecasts[0].Temperature.Minimum.Value - 32}<sup>o</sup> C</td>
                    <td className={styles.TemperatureCell}>{+data.DailyForecasts[0].Temperature.Maximum.Value - 32}<sup>o</sup> C</td>
                </tr>
            </tbody>
        </table>
    </div>
);

WeatherContainer.propTypes = {
    data: PropTypes.object.isRequired,
};

export default WeatherContainer;