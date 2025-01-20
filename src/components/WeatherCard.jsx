import { useEffect, useState } from 'react';
import './WeatherCard.css';
import axios from 'axios';
import React from 'react';
import {
	thunderstormSvg,
	drizzleSvg,
	rainSvg,
	snowSvg,
	atmosphereSvg,
	clearSvg,
	cloudSvg,
} from '../assets/images';
import Head from './Head';
import Input from './Input';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import Loading from './loader/Loading';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f4784fbc84ea157b599cca591457ccd3';

const icons = {
	thunderstorm: thunderstormSvg,
	drizzle: drizzleSvg,
	rain: rainSvg,
	snow: snowSvg,
	atmosphere: atmosphereSvg,
	clear: clearSvg,
	clouds: cloudSvg,
};

const conditionCodes = {
	thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
	drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
	rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
	snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
	atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
	clear: [800],
	clouds: [801, 802, 803, 804],
};

function WeatherCard() {
	const [coords, setCoords] = useState(null);
	const [weather, setWeather] = useState(null);
	const [lang, setLang] = useState('es');
	const [units, setUnits] = useState('metric');
	const [cityInput, setCityInput] = useState('');
	const [city, setCity] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);

	const handleChange = () => {
		setLang(lang === 'es' ? 'en' : 'es');
	};

	const handleChangeUnits = () => {
		setUnits(units === 'metric' ? 'imperial' : 'metric');
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(res) => {
				setCoords({
					lat: res.coords.latitude,
					lon: res.coords.longitude,
				});
				setMessage('');
				setLoading(false);
			},
			async (err) => {
				console.log('[Geolocation Error]', err);
				setMessage(
					'No aceptaste compartir tu ubicación. Estimaremos tu posición según tu IP, pero podría ser menos precisa.',
				);
				const location = await getLocationFromIP();
				setCoords(location);
				setLoading(false);
			},
		);
	}, []);

	useEffect(() => {
		if (coords && !city) {
			getWeatherData(coords);
		}
	}, [coords, city, units, lang]);

	const getLocationFromIP = async () => {
		try {
			const res = await axios.get('https://ipapi.co/json/');
			return { lat: res.data.latitude, lon: res.data.longitude };
		} catch (error) {
			console.log('[IP API Error]', error);
			return null;
		}
	};

	const getWeatherData = async ({ lat, lon }) => {
		try {
			const res = await axios.get(
				`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${units}`,
			);
			const codeId = res.data.weather[0].id;
			const codeKeys = Object.keys(conditionCodes);
			setWeather({
				city: res.data.name,
				country: res.data.sys?.country,
				temperature: Math.round(res.data.main?.temp),
				description: res.data.weather?.[0].description,
				windSpeed: res.data.wind?.speed,
				atmPressure: res.data.main?.pressure,
				clouds: res.data.clouds.all,
				temperature_max: Math.round(res.data.main?.temp_max),
				temperature_min: Math.round(res.data.main?.temp_min),
				temperature_feels_like: Math.round(res.data.main?.feels_like),
				icon: icons[codeKeys.find((k) => conditionCodes[k].includes(codeId))],
			});
		} catch (error) {
			console.log('[Weather API Error]', error);
		}
	};

	useEffect(() => {
		if (city) {
			getWeatherDataByCity(city);
		}
	}, [city, units, lang]);

	const getWeatherDataByCity = async (city) => {
		try {
			const res = await axios.get(
				`${baseUrl}q=${city}&appid=${apiKey}&lang=${lang}&units=${units}`,
			);
			const codeId = res.data.weather[0].id;
			const codeKeys = Object.keys(conditionCodes);
			setWeather({
				city: res.data.name,
				country: res.data.sys?.country,
				temperature: Math.round(res.data.main?.temp),
				description: res.data.weather?.[0].description,
				windSpeed: res.data.wind?.speed,
				atmPressure: res.data.main?.pressure,
				clouds: res.data.clouds.all,
				temperature_max: Math.round(res.data.main?.temp_max),
				temperature_min: Math.round(res.data.main?.temp_min),
				temperature_feels_like: Math.round(res.data.main?.feels_like),
				icon: icons[codeKeys.find((k) => conditionCodes[k].includes(codeId))],
			});
		} catch (error) {
			console.log('[Weather API Error]', error);
		}
	};

	const handleCityInput = (e) => {
		setCityInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (cityInput) {
			setCity(cityInput);
			setCityInput('');
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div className="app-container">
				<header className="header">
					<div className="temp_header">
						<Head weather={weather} lang={lang} units={units} />
					</div>
					<div className="input_container">
						<Input
							handleCityInput={handleCityInput}
							lang={lang}
							units={units}
							cityInput={cityInput}
							handleSubmit={handleSubmit}
						/>
					</div>
				</header>

				<div className="btn_container">
					<button className="btn_set" onClick={handleChange} id="btnLang">
						{lang === 'es' ? 'English' : 'Español'}
					</button>
					<button className="btn_set" onClick={handleChangeUnits} id="btnUnits">
						{units === 'metric' ? 'Imperial' : 'Métrico'}
					</button>
				</div>

				<main className="main">
					<Card1 weather={weather} />
					<Card2 weather={weather} lang={lang} />
					<Card3 weather={weather} lang={lang} units={units} />
					<Card4 weather={weather} lang={lang} />
				</main>
			</div>
		</>
	);
}

export default WeatherCard;
