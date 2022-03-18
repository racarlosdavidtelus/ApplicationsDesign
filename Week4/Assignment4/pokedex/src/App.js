import { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import CartComponent from './CartComponent/CartComponent';
import './App.css';
import Signup from './SignupComponent/SignupComponent';
import Login from './LoginComponent/LoginComponent';
import Navbar from './NavbarComponent/NavbarComponent';
import Dashboard from './Dashboard/DashboardComponent';

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
                moves: data.moves,
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
    <>
    <Navbar></Navbar>
      <Switch>
        {/* OUT */}
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/* IN */}
        <Route exact path="/dashboard" render={() => (<Dashboard pokemons={pokemons} />)} />
      </Switch>
      <ToastContainer autoClose={1500} hideProgressBar />
    </>
  );
}

export default App;
