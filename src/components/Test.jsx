import React, { useState } from 'react';

function Test() {
	const [lang, setLang] = useState('es');

	const handleChange = () => {
		if (lang === 'es') {
			setLang('en');
		} else {
			setLang('es');
		}
		console.log(lang);
	};

	return (
		<div>
			<h2>El idioma es: {lang}</h2>
			<button onClick={handleChange} id="btnLang">
				{lang === 'es' ? 'English' : 'Español'}
			</button>
		</div>
	);
}

export default Test;
