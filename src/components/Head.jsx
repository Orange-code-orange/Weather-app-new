import React from 'react';
import './Head.css';

function Head({ weather, units, lang }) {
	return (
		<div className="card__title__temperature">
			<h2 className="card__title__city">
				{weather?.city}, {weather?.country}
			</h2>
			<p className="card__title__temperature-now">
				{weather?.temperature}
				{units === 'metric' ? '°C' : '°F'}
			</p>
			<p className="card__title__temperature-min">
				<span>Min:</span> {weather?.temperature_min}
				{units === 'metric' ? '°C' : '°F'}
			</p>
			<p className="card__title__temperature-max">
				<span>Max:</span> {weather?.temperature_max}
				{units === 'metric' ? '°C' : '°F'}
			</p>
			<p className="card__title__temperature-feels">
				{lang === 'es' ? 'Sensa:' : 'Feels:'} <br />{' '}
				{weather?.temperature_feels_like}
				{units === 'metric' ? '°C' : '°F'}
			</p>
		</div>
	);
}

export default Head;
