import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Characters from './assets/components/Characters.jsx'
import image from './assets/images/rick-morty-collection-banner_1944x.jpg'

function App() {

const [rickMorty, setRickMorty] = useState({})

const [locations, setLocations] =useState([])

const [residents, setResidents] = useState([])

const [search, setSearch] = useState("")

const [locationToID, setLocationToID] = useState("")

useEffect(() => {
  const randNum = Math.floor(Math.random() * 126) + 1
  axios.get(`https://rickandmortyapi.com/api/location/${randNum}`)
  .then(res => {setRickMorty(res.data)
    setResidents(res.data.residents)})
} ,[])

const searchButton = () => {
  axios.get(`https://rickandmortyapi.com/api/location/${locationToID}`)
  .then(res => {setRickMorty(res.data)
    setResidents(res.data.residents)})
}

useEffect(() => {
  axios.get(`https://rickandmortyapi.com/api/location`)
  .then(res => setLocations(res.data.results))
} ,[])

useEffect(() => {
setLocationToID({search} === `${locations.map( location => {location.name})}` ? `${location.id}` : '0')
} ,[])

console.log(locations)
  return (
    <div className='bodyy'>
      <div className='banner'><img src={image} alt="" /></div>
      <div className='subbody'>
        <h1>Rick and Morty Wiki</h1>
        <input type="text" placeholder='type a location' value={search} onChange={e => setSearch(e.target.value)}/>
        <button onClick={searchButton}>Change location</button>
        <h2>{rickMorty.name}</h2>
        <ul className='location-description'>
          <li>
            <b>Type:</b> {rickMorty.type}
          </li>
          <li>
            <b>Dimension:</b> {rickMorty.dimension}
          </li>
          <li>
            <b>Population:</b> {rickMorty.residents?.length}
          </li>
        </ul>
        <h2>Residents</h2>
        <div>
        {residents.map( character => (
          <Characters key={character}
          charac={character}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default App
