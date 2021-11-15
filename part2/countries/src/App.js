import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const Countries = (props) => {
  let countrie
  if (props.countrieToShow.length === 1) {
    for (var i in props.countries) {
      if (props.countrieToShow[0] === props.countries[i].name.common) {
        countrie = new Countrie(props.countries[i].name.common, props.countries[i].capital, props.countries[i].population, props.countries[i].languages, props.countries[i].flags.svg);

      }
    }
    let languages = [];
    for (var z in countrie.languages) languages.push(countrie.languages[z])
    return (
      <div>
        <h2>{countrie.name}</h2>

        <p>capital : {countrie.capital}</p>
        <p>population : {countrie.population}</p>

        <p>languages : <ul>{languages.map(language => <li>{language}</li>)}</ul></p>
        <p><img src={countrie.flag} /></p>

      </div>
    )
  }
  else if (props.countrieToShow.length > 10 && props.countrieToShow.length !== 250) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if (props.countrieToShow.length <= 10) {
    return (
      <div>
        {props.countrieToShow.map(countrie =>
          <div>
            <p>{countrie} <button onClick={() => props.setCountriedetail(countrie)}>show</button></p>
          </div>
        )}
      </div>
    )
  }
  else if (props.countrieToShow.length === 250) {
    return (
      <div>

      </div>
    )
  }

}
const Filter = (props) => {
  return (
    <form>
      <input value={props.search} onChange={props.onChange}></input>
    </form>
  )
}
class Countrie {
  constructor(name, capital, population, languages, flag) {
    this.name = name;
    this.capital = capital;
    this.population = population;
    this.languages = languages;
    this.flag = flag;
  }
}
function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState('')
  const [weather, setWeather] = useState('')
  const [countriedetail, setCountriedetail] = useState('')
  let array = []
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    if (event.target.value === "") {
      setCountriedetail("")
    }
  }
  const Countridetails = (props) => {
  
    let countrie
    for (var i in props.countries) {
      if (props.countriedetail === props.countries[i].name.common) {
        countrie = new Countrie(props.countries[i].name.common, props.countries[i].capital, props.countries[i].population, props.countries[i].languages, props.countries[i].flags.svg);
      }
    }
    let languages = [];
    for (var z in countrie.languages) languages.push(countrie.languages[z])
    return (
      <div >
        <h2>{countrie.name}</h2>
        <p>capital : {countrie.capital}</p>
        <p>population : {countrie.population}</p>
        <p>languages : <ul>{languages.map(language => <li>{language}</li>)}</ul></p>
        <p><img src={countrie.flag} /></p>
      </div>
    )
  }
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)

      })
  }, [])
  for (var i in countries)
    array.push(countries[i].name.common);
  const countrieToShow = (search === "") ? array : array.filter(i => i.toLowerCase().includes(search.toLowerCase()) === true)

  if (countriedetail === "") {
    return (
      <div className="App">
        <h1>Find countries</h1>
        <Filter search={search} onChange={(e) => { handleSearchChange(e) }} />
        <h2>Countries</h2>
        <Countries countrieToShow={countrieToShow} countries={countries} setCountriedetail={(e) => setCountriedetail(e)} />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h1>Find countries</h1>
        <Filter search={search} onChange={(e) => { handleSearchChange(e) }} />
        <h2>Countries</h2>
        <Countridetails countriedetail={countriedetail} countries={countries}></Countridetails>
      </div>
    );
  }
}

export default App;
