import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1/name';

const getCountry = async (country) => {
	try {
		const response = await axios.get(`${baseUrl}/${country}?fullText=true`);
		return response.data;
	} catch (error) {
		console.log(error.response.status);
		return error.response.status;
	}
};

const useField = (type) => {
	const [value, setValue] = useState('');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
};

const useCountry = (name) => {
	const [country, setCountry] = useState(null);
	useEffect(() => {
		getCountry(name).then((response) => {
			setCountry(response);
		});
	}, [name]);
	// console.log('testing country', country);
	if (!name) return null;
	return country;
};

const Country = ({ country }) => {
	if (country === null) {
		return null;
	} else if (country === 404) {
		return <div>not found...</div>;
	} else country = country[0];

	return (
		<div>
			<h3>{country.name.common} </h3>
			<div>capital {country.capital} </div>
			<div>population {country.population}</div>
			<img
				src={country.flags.png}
				height='100'
				alt={`flag of ${country.name.common}`}
			/>
		</div>
	);
};

const App = () => {
	const nameInput = useField('text');
	const [name, setName] = useState(null);
	const country = useCountry(name);
	// console.log(country);

	const fetch = (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	);
};

export default App;
