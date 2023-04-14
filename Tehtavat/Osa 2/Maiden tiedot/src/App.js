import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import Filter from './components/Filter'
import Contents from './components/Contents'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    countryServices.getCountries().then(rCountries => {setCountries(rCountries)})
  }, [])


  const countriesToShow = countries.filter(c =>
    c.name.common.toLowerCase().includes(
      filter.toLowerCase()
    ))

  const filterCountries = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter = {filter} filterCountries = {filterCountries} />
      <Contents countriesToShow={countriesToShow} setFilter={setFilter} />
    </div>
  )
}



export default App