import React from 'react';
import './Input.css';
import 'boxicons';

function Input({ handleCityInput, handleSubmit, cityInput, lang }) {
	return (
		<form className="search_bar" onSubmit={handleSubmit}>
			<input
				className="input"
				type="text"
				value={cityInput || ''}
				onChange={handleCityInput}
				placeholder={lang === 'es' ? 'Buscar ciudad' : 'Search city'}
			/>
			<button className="btn" type="submit">
				<box-icon className="icon" name="search-alt" size="s"></box-icon>
			</button>
		</form>
	);
}

export default Input;
