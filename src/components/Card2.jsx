import React from 'react';
import './Card2.css';
import './Cards.css';

function Card2({ weather, lang }) {
	return (
		<div>
			<div className="card card2">
				<p className="card_title card2_title">
					{lang === 'es' ? 'NUBES' : 'CLOUDS'}
				</p>
				<span className="card_data card2_data">{weather?.clouds}%</span>
			</div>
		</div>
	);
}

export default Card2;
