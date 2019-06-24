import React, { Component } from "react";
import Spinner from "./Spinner";

class WeatherDay extends Component {
  componentDidMount() {
    this.props.getLocalWeather();
  }

  render() {
    if (this.props.weatherData === null) {
      return (
        <div className="spinner">
          <Spinner />
        </div>
      );
    }

    const weather = this.props.weatherData;
    const dayWeather = weather.filter(e => {
      return e.isDaytime === true;
    });

    return dayWeather.map(e => {
      return (
        <div
          className="ui segment papaya"
          key={e.startTime}
          onClick={() => this.props.onDaySelect(e.number, e.number + 1)}
        >
          <div className="ui center  aligned header">{e.name}</div>
          <div className="ui center  aligned header">
            <div className="ui center  aligned  header">
              <img src={e.icon} alt="icon" />
            </div>
            <div className="ui center aligned  header">{e.temperature}</div>
          </div>
        </div>
      );
    });
  }
}

export default WeatherDay;
