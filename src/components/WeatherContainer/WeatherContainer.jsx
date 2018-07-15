import React from 'react';
import PropTypes from 'prop-types';

import './WeatherContainer.css';

const WeatherContainer = ({ data }) => (
    <div className="WeatherContainer" >
        <div className="Date" >{Date().split(' ').slice(0, 4).join(' ')}</div>
        <table className="WeatherTable" >
            <tbody>
                <tr>
                    <td className="TemperatureCell">MIN</td>
                    <td className="TemperatureCell">MAX</td>
                </tr>
                <tr>
                    <td className="TemperatureCell">{+data.DailyForecasts[0].Temperature.Minimum.Value - 32}<sup>o</sup> C</td>
                    <td className="TemperatureCell">{+data.DailyForecasts[0].Temperature.Maximum.Value - 32}<sup>o</sup> C</td>
                </tr>
            </tbody>
        </table>
    </div>
);

WeatherContainer.propTypes = {
    data: PropTypes.object.isRequired,
};

export default WeatherContainer;