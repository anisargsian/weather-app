import React, { Component } from 'react';
import DropDownMenu from './components/DropDownMenu';
import SelectedCities from './components/SelectedCities';
import WeatherContainer from './components/WeatherContainer';

import './App.css';

class App extends Component {
  state = {
    cities: [],
    selectedCities: [],
    currentCity: '',
  };

  componentDidMount () {
    const url = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=vfwQdW1EXEsBQ5qwouds5MwrQSgVFWl2';
    fetch(url)
      .then(resp => resp.json())
      .then(cities => !cities ? this.setState({ cities }) : null);

    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );    
  }

  hydrateStateWithLocalStorage = () => {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage = () => {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  selectCityHandler = (event) => {
    const currentCity = event.target.value;
    let cities = [...this.state.cities];
    let remainedCities = cities.filter(city => (city.EnglishName !== currentCity));

    let selectedCities = [...this.state.selectedCities];
    let selectedCity = cities.find(el => el.EnglishName === currentCity);
    selectedCities.push(selectedCity);

    this.setState({ cities: remainedCities, selectedCities});
  };

  closeSelectedCityHandler = (event) => {
    let selectedCities = [...this.state.selectedCities];
    let remainedCities = selectedCities.filter(city => city.Key !== event.target.id);

    let cities = [...this.state.cities];
    let removedCity = selectedCities.find(city => city.Key === event.target.id);
    cities.push(removedCity);

    let {currentCity} = this.state;
    if (currentCity) {
      let currentCityKey = currentCity.DailyForecasts[0].Link.split('/').slice(6, 7).join();
      if (currentCity && (event.target.id === currentCityKey)) {
      currentCity = '';
      }
    }
    this.setState({ cities, selectedCities: remainedCities, currentCity});
  }

  displayWeatherHandler = (event) => {
    const selectedCities = [...this.state.selectedCities];
    const selectedCity = selectedCities.find(city => city.EnglishName === event.target.innerHTML);
    
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${selectedCity.Key}?apikey=vfwQdW1EXEsBQ5qwouds5MwrQSgVFWl2`;
    fetch(url)
      .then(resp => resp.json())
      .then(city => this.setState({ currentCity: city }));
  }

  render() {
    const {currentCity} = this.state;
    return (
      <div className="App">
        <div className="leftContainer">
          <DropDownMenu 
            changed={(event) => this.selectCityHandler(event)} 
            citiesList={this.state.cities} 
          />
          <SelectedCities
            clicked = {(event) => this.displayWeatherHandler(event)}
            close={(event) => this.closeSelectedCityHandler(event)} 
            selected={this.state.selectedCities}
          />          
        </div>
        <div className="rightContainer" > 
          {
            currentCity ? <WeatherContainer data={currentCity} /> : null
          }
        </div>
       
      </div>
    );
  }
}

export default App;
