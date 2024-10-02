"use client"
import { WeatherData } from '@/@types/types';
import { useEffect, useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('Nairobi');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [unit, setUnit] = useState('metric');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = () => {
        setLoading(true);
        setError(null);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/weather?city=${city}&unit=${unit}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message === 'success') {
                    setWeather(data.data);
                } else {
                    setError(data.error);
                    setWeather(null);
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred while fetching weather data.');
            })
            .finally(() => setLoading(false));
    };

    // useEffect to fetch weather data on component mount
    useEffect(() => {
        fetchWeather();
    }, []);

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(e.target.value);
    };

    const handleSearch = () => {
        fetchWeather();
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city"
                className="p-2 mb-4 border border-gray-300 rounded-md"
            />
            <button className="btn" onClick={handleSearch}>Go</button>
            <div className="btn-group btn-group-scrollable">
                <input type="radio" name="unit" value="metric" checked={unit === 'metric'} onChange={handleUnitChange} data-content="°C" className="btn" />
                <input type="radio" name="unit" value="imperial" checked={unit === 'imperial'} onChange={handleUnitChange} data-content="°F" className="btn" />
            </div>

            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}

            {/* Weather Info */}
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
