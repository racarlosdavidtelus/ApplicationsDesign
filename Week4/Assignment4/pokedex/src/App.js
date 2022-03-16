import { useState, useEffect } from 'react'
import CartComponent from './CartComponent/CartComponent';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const getAllPokemons = () => {
      const database_pokemons = [];
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`, {
          method: "GET"
      })
      .then(response => {
          return response.json()
      })
      .then(data => {
        data.results.map((pokemon,index) => (
          //console.log(`El pokemon ${index+1} se llama ${pokemon.name} y su data esta en ${pokemon.url}`)
          fetch(`${pokemon.url}`, {
            method: "GET"
          })
          .then(response => {
              return response.json()
          })
          .then(data => {
              //console.log(data)
              const poke = {
                idPokemon: index+1,
                name: pokemon.name,
                types: data.types,
                url_photo: data.sprites.other.home.front_default
              }
              database_pokemons.push(poke);
              //setPokemons([...pokemons,...database_pokemons])
              setPokemons([...database_pokemons])

              //setPokemons(pokemons => [...pokemons,...database_pokemons])
              //console.log(poke)
          })
          .catch(error => {
            console.log(error)
          })
        ))
      })
      .catch(error => {
        console.log(error)
      })
    }
    getAllPokemons()
    //console.log(pokemons)
  },[]);

  return (
      <div>
        {
          pokemons.map((pokemon, index) => (
            <CartComponent key={index} idPokemon={pokemon.idPokemon} name={pokemon.name} types={pokemon.types} url_photo={pokemon.url_photo} />
          ))
        }
      </div>
  )
}

export default App;
