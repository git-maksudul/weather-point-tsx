import axios from "axios";
import { useState } from "react";

type weatherData = {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        feelslike_c: number;
        humidity: number;
    }
}

const WeatherDashboard: React.FC = () => {
    const [weather, setWeather] = useState<weatherData | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [city, setCity] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!city) {
            return ('City not found')
        }
        try {
            setError(null);

            const apiKey = 'ea6cfc4148b447b0b6b15552252108';
            const response = await axios.get<weatherData>(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
            );
            setWeather(response.data)
            setCity('');
        }
        catch {
            setError('CITY NOT FOUND !');
            setWeather(null);
        }
    };

    return (
        <div className="lg:mt-10">
            <h1 className="lg:text-2xl font-semibold">Find Your City & Get Weather Update</h1>
            <form onSubmit={handleSearch} className="mx-auto max-w-md flex flex-col gap-2 mb-6 mt-5">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city name"
                    className="flex-1 px-4 py-2 rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 lg:w-[150px] lg:mx-auto text-white px-6 py-2 rounded hover:bg-blue-600 shadow-sm"
                >
                    Search
                </button>
            </form>

            {error && <p className="text-4xl font-bold text-red-500">{error}</p>}

            {
                weather && (
                    <div className="lg:p-5 py-2 bg-amber-50 lg:w-2xl rounded-lg shadow-lg border border-amber-400 mx-auto">
                        <h3 className="text-xl font-semibold">{weather.location.name}</h3>
                        <p className="text-gray-500 font-medium">{weather.location.country}</p>
                        <h2 className="font-bold text-4xl">{weather.current.temp_c} C</h2>
                        <p className="text-gray-500 text-sm">Feels like {weather.current.feelslike_c} C</p>
                        <p className="text-gray-500 text-sm">Humidity {weather.current.humidity}</p>
                        <img className="mx-auto" src={weather.current.condition.icon} alt="" />
                        <p className="font-semibold text-gray-600">{weather.current.condition.text}</p>
                    </div>
                )
            }
        </div>
    )
}

export default WeatherDashboard;