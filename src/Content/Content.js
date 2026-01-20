import { useEffect, useState } from "react";
import "../Styles/Content.css"
import { PlaceContext } from "./PlaceContext";
import Search from "./Search"
import WeatherApi from "../WeatherApi";
import Box from '@mui/material/Box';
import Chart from "./Chart";
import Button from 'react-bootstrap/Button';
import WeatherBox from "./WeatherBox";

export default function Content(){
    const [currentPlace, setCurrentPlace] = useState(0);
    const [weather, setWeather] = useState(null)
    const [chartsData, setChartData] = useState(null)
    const [chartType, setChartType] = useState("primary")
    const [buttonState, setButtonState] = useState(["primary", "light"])


    const prepareDate = () => {
        setChartData({
            daily:{
                valuesMax:weather.daily.temperature_2m_max,
                valuesMin:weather.daily.temperature_2m_min,
                labels: weather.daily.time
            },
            hourly:{
                values: weather.hourly.temperature_2m,
                labels: weather.hourly.time
            }
        })
    }

    
    useEffect(()=>{
        if(currentPlace){
            (async()=>{
                try {
                    setWeather(await WeatherApi.getWeather(currentPlace.latitude, currentPlace.longitude))  
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    },[currentPlace])

    useEffect(()=>{
        if(weather){
            prepareDate()
        }
    },[weather])

    return(
        <div className="content">

            <div className="mid">
                
                <PlaceContext.Provider value={{currentPlace, setCurrentPlace}}>
                    <Search/>

                    {chartsData ? 
                        <>
                            <h2 className="forcast7">Current weather</h2>

                            <div className="cityInfo" style={{
                                background:weatherStyles[weather.current.weather_code].background,
                                color: weatherStyles[weather.current.weather_code].color
                                }}>

                                <p className="name">{currentPlace.name}</p>

                                {<span className={`fi fi-${currentPlace?.country_code?.toLowerCase() ? currentPlace?.country_code?.toLowerCase() : "un"} country`}></span>}
                                
                                <p className="stats">
                                    <p className="weatherIcon">
                                        {weatherIcons[weather.current.weather_code][weather.current.is_day ? "day": "night"]}
                                    </p>

                                    <table>
                                        <tr>
                                            <td>
                                                Temperature  
                                            </td>
                                            <td>
                                                {weather.current.temperature_2m}°C
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Humidity  
                                            </td>
                                            <td>
                                                {weather.current.relative_humidity_2m}%
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Wind
                                            </td>
                                            <td>
                                                {weather.current.wind_speed_10m} km/h
                                            </td>
                                        </tr>
                                    </table>
                                </p>

                            </div>

                            <h2 className="forcast7">7 Day Forecast</h2>
                            <WeatherBox 
                                weather={weather} 
                                weatherIcons={weatherIcons}
                                weatherStyles={weatherStyles}
                                currentPlace={currentPlace}
                            />
                        </>
                        :
                        <></>
                    }
                </PlaceContext.Provider>
            </div>
            

        </div>
    )
}

const weatherIcons = {
    0: { day: "☀️", night: "🌙" },
    1: { day: "🌤️", night: "🌙" }, 
    2: { day: "⛅", night: "☁️" },
    3: { day: "☁️", night: "☁️" }, 

    45: { day: "🌫️", night: "🌫️" },
    48: { day: "🌫️", night: "🌫️" },

    51: { day: "🌧️", night: "🌧️" },
    53: { day: "🌧️", night: "🌧️" },
    55: { day: "🌧️", night: "🌧️" },

    56: { day: "🌨️", night: "🌨️" },
    57: { day: "🌨️", night: "🌨️" },

    61: { day: "🌧️", night: "🌧️" },
    63: { day: "🌧️", night: "🌧️" },
    65: { day: "🌧️", night: "🌧️" },

    66: { day: "🌨️", night: "🌨️" },
    67: { day: "🌨️", night: "🌨️" },

    71: { day: "❄️", night: "❄️" },
    73: { day: "❄️", night: "❄️" },
    75: { day: "❄️", night: "❄️" },
    77: { day: "❄️", night: "❄️" },

    80: { day: "🌦️", night: "🌧️" },
    81: { day: "🌦️", night: "🌧️" },
    82: { day: "🌦️", night: "🌧️" },

    85: { day: "🌨️", night: "🌨️" },
    86: { day: "🌨️", night: "🌨️" },

    95: { day: "⛈️", night: "⛈️" },
    96: { day: "⛈️", night: "⛈️" },
    99: { day: "⛈️", night: "⛈️" }
};

const weatherStyles = {
    0: { 
        background: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)", 
        color: "#FFFFFF" 
    },
    1: { 
        background: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)", 
        color: "#FFFFFF" 
    },
    2: { 
        background: "linear-gradient(135deg, #c1c1c1ff 0%, #d0bf74ff 100%)", 
        color: "#333333"
    },
    3: { 
        background: "linear-gradient(135deg, #909fa8 0%, #5d6d7e 100%)", 
        color: "#FFFFFF" 
    },
    45: { 
        background: "linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)", 
        color: "#FFFFFF" 
    },
    48: { 
        background: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)", 
        color: "#E0E0E0" 
    },
    51: { 
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
        color: "#1e3c72"
    },
    53: { 
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
        color: "#1e3c72" 
    },
    55: { 
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
        color: "#1e3c72" 
    },
    56: { 
        background: "linear-gradient(135deg, #E6DADA 0%, #274046 100%)", 
        color: "#FFFFFF" 
    },
    57: { 
        background: "linear-gradient(135deg, #E6DADA 0%, #274046 100%)", 
        color: "#FFFFFF" 
    },
    61: { 
        background: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)", 
        color: "#FFFFFF" 
    },
    63: { 
        background: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)", 
        color: "#FFFFFF" 
    },
    65: { 
        background: "linear-gradient(135deg, #3a6073 0%, #16222a 100%)", 
        color: "#FFFFFF" 
    },
    66: { 
        background: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)", 
        color: "#FFFFFF" 
    },
    67: { 
        background: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)", 
        color: "#FFFFFF" 
    },
    71: { 
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)", 
        color: "#333333"
    },
    73: { 
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)", 
        color: "#333333" 
    },
    75: { 
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)", 
        color: "#333333" 
    },
    77: { 
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)", 
        color: "#333333" 
    },
    80: { 
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)", 
        color: "#2c3e50" 
    },
    81: { 
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)", 
        color: "#2c3e50" 
    },
    82: { 
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)", 
        color: "#2c3e50" 
    },
    85: { 
        background: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)", 
        color: "#1e3c72" 
    },
    86: { 
        background: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)", 
        color: "#1e3c72" 
    },
    95: { 
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)", 
        color: "#FFD700"
    },
    96: { 
        background: "linear-gradient(135deg, #141E30 0%, #243B55 100%)", 
        color: "#FFFFFF" 
    },
    99: { 
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", 
        color: "#FFFFFF" 
    }
};