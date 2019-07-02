window.addEventListener('load', () => {

    const data = {
                "coord": {"lon": 14.87, "lat": 48.12},
                "weather": [
                    {"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}
                ],
                "base": "stations",
                "main": { "temp": 18.3,"pressure": 1019,"humidity": 88, "temp_min": 15, "temp_max": 21.11},
                "visibility": 10000,
                "wind": {"speed": 1.5, "deg": 280},
                "clouds": {"all": 75}, "dt": 1562042137,
                "sys": {"type": 1, "id": 6874, "message": 0.0069, "country": "AT", "sunrise": 1562036685, "sunset": 1562094234},
                "timezone": 7200, "id": 2782555, "name": "Amstetten", "cod": 200
            }
 
    const temp = data.main.temp;
    const maxTemp = data.main.temp_max;
    const minTemp = data.main.temp_min;
    const windspeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise);
    const sunset = new Date(data.sys.sunset);

    console.log(sunrise.getHours());
    console.log(sunset.getHours());
    
    
});