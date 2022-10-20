import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const searchLocation = async (e) => {
    if (e.code === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`
      const result = await axios(url)
      setData(result.data)
      setLocation('')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://api.openweathermap.org/data/2.5/weather?q=medellin&appid=${process.env.REACT_APP_API_KEY}`)
      setData(result.data)
    }
    fetchData()
  }, [])

  const kelvinToCelsius = (k) => {
    return Math.round(k - 273.15)
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? <p>{data.name}</p> : <p>Loading...</p>}
          </div>
          <div className="temp">
            {data.main ? <h1>{kelvinToCelsius(data.main.temp)}°C</h1> : <h1>Loading...</h1>}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : <p>Loading...</p>}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{kelvinToCelsius(data.main.feels_like)}°C</p> : <p className='bold'>Loading...</p>}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : <p className='bold'>Loading...</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed} mPh</p> : <p className='bold'>Loading...</p>}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
