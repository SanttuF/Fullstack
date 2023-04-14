const Filter = ( {filter, filterCountries} ) => (
    <div>
      <p>find countries</p>
      <input value={filter} onChange={filterCountries}></input> 
    </div>
)

export default Filter