"use client"
import { ForecastData } from '@/@types/types';
import { useEffect, useState } from 'react';
import LoadingSpinner from './Loading';
import feather from 'feather-icons';

const Weather = () => {
    const [city, setCity] = useState('Nairobi');
    const [weather, setWeather] = useState<ForecastData | null>(null);
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
                    console.log("datafetched", data.data);
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
    }, [unit]);

    useEffect(() => {
        feather.replace(); // Replaces all feather icons with the SVG versions
    }, [weather]);

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(e.target.value);
    };

    const handleSearch = () => {
        fetchWeather();
    };

    // Handle Enter key press to Call handleSearch if pressed
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Function to format Unix timestamp
    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-UK', options);
    };

    // format date without year
    const formatDateWithoutYear = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-UK', options);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex">
            {/* Section for Current Day's Weather */}
            <div className="w-1/4 p-4 border-r border-gray-300">
                {loading && <LoadingSpinner />}
                {error && <p className="text-red-500">{error}</p>}
                {weather && weather.forecast.length > 0 && (
                    <div>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.forecast[0].weather[0].icon}@2x.png`}
                            alt={weather.forecast[0].weather[0].description}
                        />
                        <p className="text-xl font-semibold text-gray-400">{weather.forecast[0].main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
                        <div className="mt-4">
                            <p className="text-lg text-gray-600 mb-2">{weather.forecast[0].weather[0].description}</p>
                        </div>
                        {/* Display Current Date and Time */}
                        <p className="text-gray-600 mt-4">{formatDate(weather.forecast[0].dt)}</p>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{city}</h2> {/* Use the city name directly */}
                    </div>
                )}
            </div>

            {/* Main Section for Search Input and Additional Weather Info */}
            <div className="flex-grow p-4">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search city"
                        className="p-2 border border-gray-300 rounded-md flex-grow"
                    />
                    <button className="btn ml-2" onClick={handleSearch}>Go</button>
                    <div className="btn-group btn-group-scrollable ml-4">
                        <input type="radio" name="unit" value="metric" checked={unit === 'metric'} onChange={handleUnitChange} data-content="°C" className="btn" />
                        <input type="radio" name="unit" value="imperial" checked={unit === 'imperial'} onChange={handleUnitChange} data-content="°F" className="btn" />
                    </div>
                </div>

                {/* Weather Info for Next Days */}
                <div>
                    <div className="flex justify-between">
                        {weather && weather.forecast.length > 0 && weather.forecast.slice(1, 4).map((day, index) => ( // Skip the current day (index 0)
                            <div key={index} className="bg-white p-4 rounded-md shadow mx-2 flex-1">
                                <p className="text-lg font-semibold text-gray-800">{day.main.temp_min}° - {day.main.temp_max}° {unit === 'metric' ? 'C' : 'F'}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                    className="w-12 h-12"
                                />
                                <p className="text-lg font-semibold text-gray-400">{formatDateWithoutYear(day.dt)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Humidity and Wind Information */}
                    <div className="flex justify-between mt-4">
                        {/* Humidity Card */}
                        <div className="bg-white p-4 rounded-md shadow flex-1 mx-2 text-center">
                            <h3 className="text-lg font-bold text-gray-400">Humidity</h3>
                            <i data-feather="droplet" className="w-8 h-8 mx-auto text-blue-500"></i>
                            <p className="text-xl font-semibold text-gray-800 mt-2">
                                {weather && weather.forecast.length > 0 ? weather.forecast[0].main.humidity : 0}%
                            </p>
                        </div>

                        {/* Wind Card */}
                        <div className="bg-white p-4 rounded-md shadow flex-1 mx-2 text-center">
                            <h3 className="text-lg font-bold text-gray-400">Wind</h3>
                            <i data-feather="wind" className="w-8 h-8 mx-auto text-gray-500"></i>
                            <p className="text-xl font-semibold text-gray-800 mt-2">
                                {weather && weather.forecast.length > 0 ? weather.forecast[0].wind.speed : 0} m/s
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;