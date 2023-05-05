import React, { useEffect, useState } from 'react'
import WeatherApp from './weatherApp'
import './style.css'
const Tempr = () => {

  const [searchValue, setSearchValue] = useState()

  const [TempInfo, setTempInfo] = useState({})

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=47b3a55044864798d120d7854c47f4ae`;
      const res = await fetch(url)
      const Data = await res.json();

      const { temp, humidity, pressure } = Data.main;
      const { main: weatherMood } = Data.weather[0];
      const { name } = Data;
      const { speed } = Data.wind;
      const { country, sunset } = Data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunset
      }
      setTempInfo(myNewWeatherInfo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWeatherInfo()
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search"
            placeholder='search..'
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)} />
          <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
      <WeatherApp {...TempInfo}/>
    </>
  )
}

export default Tempr;