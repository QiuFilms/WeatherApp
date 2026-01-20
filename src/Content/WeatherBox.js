import Box from '@mui/material/Box';
import '../Styles/WeatherBox.css';

export default function WeatherBox({ weather, weatherIcons, weatherStyles, currentPlace }) {
    if (!weather || !weather.daily) {
        return null;
    }

    return (
        <div className="weather-boxes-container">
            {weather.daily.time.map((date, index) => (
                <Box 
                    key={index}
                    className="weather-box"
                    sx={{
                        background: weatherStyles[weather.daily.weather_code[index]]?.background || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: weatherStyles[weather.daily.weather_code[index]]?.color || "#FFFFFF"
                    }}
                >
                    <div className="weather-box-content">
                        <p className="date">{new Date(date).toLocaleDateString()}</p>
                        <p className="weather-icon">
                            {weatherIcons[weather.daily.weather_code[index]]?.day || "❓"}
                        </p>
                        <div className="temperature-info">
                            <div className="temp-item">
                                <span className="temp-label">Max</span>
                                <span className="temp-value">{weather.daily.temperature_2m_max[index]}°C</span>
                            </div>
                            <div className="temp-item">
                                <span className="temp-label">Min</span>
                                <span className="temp-value">{weather.daily.temperature_2m_min[index]}°C</span>
                            </div>
                            <div className="temp-item">
                                <span className="temp-label">Wind</span>
                                <span className="temp-value">{weather.daily.wind_speed_10m_max[index]} km/h</span>
                            </div>
                        </div>
                    </div>
                </Box>
            ))}
        </div>
    );
}
