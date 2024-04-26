import { useState } from 'react'
import "./Weather.css"
import clouds from "../../assets/cloud.png"
import rain from "../../assets/rain.png"
import clear from "../../assets/clear.png"
import drizzle from "../../assets/drizzle.png"

const Weather = () => {

    const [search, setSearch] = useState("Bhopal")
    const [loading, setLoading] = useState(true);
    const [cityData, setCityData] = useState(null)
    const [forecast,setForecast] = useState(null)

    const weatherImages = {
        'scattered clouds': clouds,
        "broken clouds": drizzle,
        "overcast clouds" : clear,
        "light rain" : rain,
        "default" : clouds,
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d14ff0c3233af2bb2350b344e22aa0e3&units=metric`)
            const data = await response.json();
            // console.log(data);
            setCityData(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleForecast = async () =>{
        try {
           const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=d14ff0c3233af2bb2350b344e22aa0e3&units=metric`) 
           const data = await response.json();
           setForecast(data.list.slice(0, 3))
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(search);
    // console.log(forecast);
    // console.log(cityData);


    return (
        <>
            <div className='main-div'>
                <div className='first-div'>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search city...' />
                    <button onClick={()=>{handleSearch(),handleForecast()}}>Search</button>
                </div>
                {
                    loading ? <h2 className='loading'>loading....</h2> : <>
                        <div className='second-div'>
                            <img src={weatherImages[cityData.weather[0].description] || weatherImages['default']} alt="" />
                            <h1>{cityData.name}: <span style={{ color: "wheat" }}>{cityData.main.temp} °C</span></h1>
                            <p>{cityData.weather[0].description}</p>
                        </div>
                        <div className='third-div'>
                            <p>wind: {cityData.wind.speed}km/h</p>
                            <p>humidity: {cityData.main.humidity}</p>
                        </div>
                    </>

                }
                <br />
                {
                    loading ? "" : <>
                        <div className='last-div'>
                        {
                            forecast?.map(function (ele, index) {
                                    const date = new Date(ele.dt_txt);
                                    const dayOfWeek = date.getDay();
                                    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                    const dayName = daysOfWeek[dayOfWeek];

                                    return <div key={index}>
                                        <img src={weatherImages[ele.weather[0].description] || weatherImages['default']} />
                                        <h2>{dayName}</h2>
                                        <p>{ele.main.temp} °C</p>
                                        <p>{ele.weather[0].description}</p>
                                    </div>
                                })
                        }
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Weather