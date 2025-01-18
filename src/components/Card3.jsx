import React from 'react';
import './Card3.css';
import './Cards.css';

function Card3({ weather, lang, units }) {
	return (
		<div>
			<div className="card card3">
				<p className="card_title">
					{lang === 'es' ? 'VELOCIDAD DEL VIENTO' : 'WIND SPEED'}
				</p>
				<p className="card_data">
					{weather?.windSpeed}
					<span>{units === 'metric' ? ' m/s' : ' mph'}</span>
				</p>
			</div>
		</div>
	);
}

export default Card3;
