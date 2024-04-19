import React from 'react'
import { useState } from 'react'
import './Weather.css'

// Let's create an object called API
const api = {
  key: "49ad81a29b0bd2550a59860af77aaaa6",
  base: "https://api.openweathermap.org/data/2.5/"
}
const Weather = () => {

  const [query, setquery] = useState('');
  const [weather, setWeather] = useState({});

  // an event is been passed on search
  const search = evt => {
    if (evt.key === "Enter") {
      // If event is press Enter, then fetch the data
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          setWeather(result);
          setquery('')
        })

    }
  }

  // New Date() only shows the first three initial
  // SO we pass new Date()  method as an parameter in datebuilder function, which will look for cuurent 
  // days or months in the date() method and return an index, now the index will look in how months and days object

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div>
      <main>
        <div className="search-box">
          <input type="text" className='search-bar' placeholder='Search....' onChange={e => setquery(e.target.value)}
            onKeyPress={search} />
        </div>
        {/* onKeyPress, one function is running called search */}
        {/* Now onclick store the location into the state so that we can use that data to search  */}


        {/* This is because sometime you will encounter some error due to API calls, this will help you to resolve */}
        {(typeof weather.main != "undefined") ? (
          <div>
            {/* Print Name And Country */}
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
                <div className="date">
                  {dateBuilder(new Date())}
                </div>
              </div>
            </div>

            
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} °C
              </div>

              <div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>



            </div>
          </div>

        ) : (' ')}


      </main>
    </div>
  )
}

export default Weather
