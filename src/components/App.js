import React from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import City from "./City";
import WeatherDay from "./WeatherDay";
import WeatherDetail from "./WeatherDetail";
import weatherData from "../apis/openWeather";
import addressData from "../apis/openCage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      locationData: [],
      selectedDay: null,
      City: "",
      Country: "",
      Lat: "",
      Long: ""
    };
    this.fetchWeather = this.fetchWeather.bind(this);
    this.getLocalWeather = this.getLocalWeather.bind(this);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.fetchCurrentCity = this.fetchLocation.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getLatLong = this.getLatLong.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div id="wrapper">
        <div className="ui container">
          <h1 className="ui center white aligned header"> Weather App </h1>
          <City />
          <div className="search">
            <Search
              name="City"
              handleCityChange={this.handleCityChange}
              handleCountryChange={this.handleCountryChange}
              handleClick={this.handleClick}
            />
          </div>
          <div className="ui container horizontal segments">
            <WeatherDay
              getLocalWeather={this.getLocalWeather}
              weatherData={this.state.weatherData}
              onDaySelect={this.onDaySelect}
            />
          </div>
          <WeatherDetail
            weatherData={this.state.weatherData}
            selectedDay={this.state.selectedDay}
          />
        </div>
        <div id="footer">
          {" "}
          <p className="love">Made with ❤️ in Chicago</p>
        </div>
      </div>
    );
  }

  handleClick = async () => {
    let searchLocation = await this.getLatLong(
      this.state.City,
      this.state.Country
    );
    this.setState({ Lat: searchLocation.lat, Long: searchLocation.lng });
  };
  handleCityChange = event => {
    this.setState({ City: event.target.value });
  };
  handleCountryChange = event => {
    this.setState({ Country: event.target.value });
  };
  getLocalWeather = async () => {
    let newLocation = await this.fetchLocation();
    let newWeather = await this.fetchWeather(newLocation);
    let currentCity = await this.fetchCurrentCity(newLocation);

    this.setState({ weatherData: newWeather, locationData: currentCity });
  };

  fetchLocation = () => {
    return new Promise(async (success, error) => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          const positionResponse = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          };

          success(positionResponse);
        },
        err => {
          error(err);
        }
      );
    });
  };

  fetchWeather = ({ lat, long }) => {
    return new Promise(async (success, error) => {
      try {
        const response = await weatherData.get(`/points/${lat},${long}`);
        const gridURL = response.data.properties.forecast;
        const forecast = await axios.get(gridURL);

        success(forecast.data.properties.periods);
      } catch (err) {
        error(err);
      }
    });
  };

  getLatLong = (City, Country) => {
    return new Promise(async (success, error) => {
      try {
        const response = await addressData.get(
          `?q=${City},${Country}&key=bf6078b1e5eb41e38e78ea3209e0817c`
        );

        success(response.data.results[0].geometry);
      } catch (err) {
        error(err);
      }
    });
  };
  fetchCurrentCity = ({ lat, long }) => {
    return new Promise(async (success, error) => {
      try {
        const response = await addressData.get(
          `?q=${lat}+${long}&key=bf6078b1e5eb41e38e78ea3209e0817c`
        );

        success(response);
        console.log(response);
      } catch (err) {
        error(err);
      }
    });
  };

  onDaySelect = async (day, night) => {
    let selectedDay = await [day, night];
    this.setState({ selectedDay: selectedDay });
  };
}

export default App;
