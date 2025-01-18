import React from 'react';
import './Card1.css';

function Card1({ weather }) {
	// const style = {
	// 	width: '150px',
	// 	height: '150px',
	// 	overflow: 'hidden',
	// };
	return (
		<>
			<div className="card card1">
				<p className="description">{weather?.description}</p>
				<img
					className="icon"
					src={weather?.icon}
					alt="Weather Icon"
					// style={style}
				/>
			</div>
		</>
	);
}

export default Card1;
