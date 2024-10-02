"use client"
import { useState, useEffect } from 'react';

const Weather = () => {
    const [city, setCity] = useState('Nairobi');
    const [weather, setWeather] = useState(fakeWeatherData);
    const [unit, setUnit] = useState('metric');

    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/weather?city=${city}&unit=${unit}`)
    //         .then(res => res.json())
    //         .then(data => setWeather(data));
    // }, [city, unit]);

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUnit(e.target.value);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <select
                onChange={handleUnitChange}
                value={unit}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            >
                <option value="metric">Celsius</option>
                <option value="imperial">Fahrenheit</option>
            </select>

            {weather && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{weather.name}</h2>
                    <p className="text-lg text-gray-600 mb-2">{weather.weather[0].description}</p>
                    <p className="text-xl font-semibold">{weather.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
                    <div className="mt-4">
                        <p className="text-gray-600">Wind: {weather.wind.speed} m/s</p>
                        <p className="text-gray-600">Humidity: {weather.main.humidity}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;


const fakeWeatherData = {
    name: "Nairobi",
    weather: [{ description: "clear sky", icon: "01d" }],
    main: {
        temp: 25,
        humidity: 65,
    },
    wind: {
        speed: 3.5,
    },
};
