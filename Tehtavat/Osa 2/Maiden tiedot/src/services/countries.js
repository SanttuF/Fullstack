import axios from "axios"

const getCountries = () => (
    axios.get("https://restcountries.com/v3.1/all")
        .then(response => response.data)
        .catch(error => console.log(`couldn't fetch countries: ${error}`))
)
    

export default {getCountries}