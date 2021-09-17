import './App.css';
import { useEffect, useState } from 'react'

const api = {
  key: "",
  // base: "https://api.openweathermap.org/data/2.5/onecall"
  base: "https://api.openweathermap.org/data/2.5/weather"
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [location , setLocation] = useState("");
  const [type, setType] = useState("app");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      // console.log(location)
      fetch(`${api.base}?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${api.key}`)
        .then(response => response.json())
        .then(json => {
          setWeather(json);
          setType("app " + json.weather[0].main);
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [])

  const firstRender = () => {
    window.location.reload();
  }

  useEffect(() => {
    fetch(`${api.base}?q=${city},PK&appid=${api.key}`)
      .then(response => response.json())
      .then(json => {
        setWeather(json);
        setType("app " + json.weather[0].main);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [location])

  const search = evt => {
    if(evt.key == "Enter"){
      setLocation(city);
    }
  }

  const dateBuilder = (d) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  // {
  //   (typeof weather.main != "undefined")
  //     ? ((weather.weather[0].main == "Clouds")
  //      ? "app cloud"
  //       : ((weather.weather[0].main == "Haze")
  //        ? "app haze" : "app")) : "app"}

  return (
    <div className={type}>
      <main>
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-bar" onKeyPress={search} onChange={(e) => setCity(e.target.value)} value={city} />
          <button className="gps" onClick={firstRender}><i className="fa fa-map-marker" aria-hidden="true"></i></button>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp - 273.15)}&#176;C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
}


export default App;
