import { useState, useEffect } from "react"
import axios from "axios"

const Contents = ( {countriesToShow, setFilter} ) => {

    const [weather, setWeather] = useState([])
    const [theCountry, setTheCountry] = useState("")


    useEffect(() => {
        if (theCountry === "") {return}
        
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${theCountry}&limit=1&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            const lat = response.data[0].lat
            const lon = response.data[0].lon
    
            console.log(`coordinates: ${lat} : ${lon}`)
    
            return (axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`))
        })
        .then(response2 => {
            console.log(response2.data)
            setWeather(response2.data)
        })
      }, [theCountry])


    // return correct element list


    if (countriesToShow.length > 10) { return (
        <p>Too many matches, specify another filter</p>
    )}  

    else if (countriesToShow.length > 1) { return (
        <ul>
            {/* List of countries after filter */}
            {countriesToShow.map((country, index) => (
                <li 
                    key={index}>{country.name.common}
                    <button onClick={() => setFilter(country.name.common)}>show</button>
                </li>
            ))}
        </ul>
    )}

    else if (countriesToShow.length == 1) {
        const country = countriesToShow[0]

        if (country !== theCountry) {
            setTheCountry(country)
        }

        return (
        <>
            {/* Country info */}
            <h2>{country.name.common}</h2>
            <p>
                {country.capital}
                <br/>
                area {country.area}
            </p>

            {/* List languages */}
            <h4>Languages:</h4>
            <ul>
                {Object.values(country.languages).map((l, i) => (
                    <li key={i}>{l}</li>
                ))}
            </ul>
            <img src={country.flags.png} width='300'/>

            {/* Show weather */}
            <h3>Weather in {country.capital[0]}</h3>
            {/* Only show if already fetched */}
            {JSON.stringify(weather)==="[]" ? "loading" :
            <>
                <p>Temperature: {weather.main.temp} celcius <br/>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img> <br/>
                Wind: {weather.wind.speed} m/s</p>
            </>
            }
        </>)}

    else { return 
        <p>No countries found</p>
    }
}

export default Contents