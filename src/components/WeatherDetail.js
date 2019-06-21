import React, { Component } from "react";

class WeatherDetail extends Component {
  componentDidUpdate() {}

  render() {
    const renderDays = this.props.selectedDay;
    const weather = this.props.weatherData;
    if (!this.props.selectedDay) {
      return (
        <div className="ui container segment papaya">
          To seedetailed forcast please click on a day...
        </div>
      );
    }
    const dayWeather = weather.filter(e => {
      return e.number === renderDays[0];
    });
    const nightWeather = weather.filter(e => {
      return e.number === renderDays[1];
    });
    return (
      <div className="details">
        <div className="ui segments ">
          <div className="ui segment papaya">
            <h2>{dayWeather[0].name}</h2>
            <img
              className="ui centered rounded small image"
              src={dayWeather[0].icon}
              alt="icon"
            />

            <h5>{dayWeather[0].detailedForecast}</h5>
          </div>
          <div className="ui secondary segment ">
            <h2>{nightWeather[0].name}</h2>
            <img
              className="ui centered rounded small image"
              src={nightWeather[0].icon}
              alt="icon"
            />

            <h5>{nightWeather[0].detailedForecast}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherDetail;
