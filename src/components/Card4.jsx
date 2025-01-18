import React from 'react';
import './Card4.css';
import './Cards.css';

function Card4({ weather, lang }) {
	return (
		<div>
			<div className="card card4">
				<p className="card_title">
					{lang === 'es' ? 'PRESIÓN ADMOSFÉRICA' : 'ATMOSPHERIC PRESSURE'}
				</p>
				<p className="card_data">
					{weather?.atmPressure} <span>hPa</span>
				</p>
			</div>
		</div>
	);
}

export default Card4;
