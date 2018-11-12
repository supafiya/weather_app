import React, { Component } from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

// API key from 'https://openweathermap.org/' - needed for query
const API_KEY = '50c5ec0ee6086a5c7ad2d3cc4ae005d2';

class App extends Component {
	state = {
		temperature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		error: undefined
	};

	// query API for city and country, parse response into json
	getWeather = async event => {
		event.preventDefault();
		const city = event.target.elements.city.value;
		const country = event.target.elements.country.value;
		const api_call = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
		);
		const data = await api_call.json();

		if (city && country) {
			const temperatureFormat = `${Math.floor(data.main.temp * 1.8 + 32)} F°, ${Math.floor(
				data.main.temp
			)} C°`;
			this.setState({
				temperature: temperatureFormat,
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				error: ''
			});
		} else {
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: 'Error'
			});
		}
	};

	render() {
		return (
			<div>
				<div className="wrapper">
					<div className="main">
						<div className="container">
							<div className="row">
								<div className="col-xs-5 title-container">
									<Titles />
								</div>
								<div className="col-xs-7 form-container">
									<Form getWeather={this.getWeather} />
									<Weather
										temperature={this.state.temperature}
										humidity={this.state.humidity}
										city={this.state.city}
										country={this.state.country}
										description={this.state.description}
										error={this.state.error}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
