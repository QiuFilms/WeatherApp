export default class WeatherApi{
    static geoApiBaseUrl = "https://geocoding-api.open-meteo.com/"
    static weatherApiBaseUrl = "https://api.open-meteo.com/"

    static async request(url){
        const req = await fetch(url)
        return await req.json()
    }

    static async getCountries(input, code, language){
        const url = new URL("/v1/search", this.geoApiBaseUrl)
        
        

        url.searchParams.set("language", "pl")
        

        if(code){
            url.searchParams.set("countryCode", code)
        }
        url.searchParams.set("name", input)
        
        console.log(url.href);
        
        const response = await this.request(url)
        return "results" in response ? response : 0
    }


    static async getWeather(latitude, longitude){
        const url = new URL("v1/forecast", this.weatherApiBaseUrl)

        url.searchParams.set("latitude", latitude)
        url.searchParams.set("longitude", longitude)

        url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max")
        url.searchParams.set("hourly", "temperature_2m")
        url.searchParams.set("current", "temperature_2m,cloud_cover,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,is_day")

        return await this.request(url)
    }

}