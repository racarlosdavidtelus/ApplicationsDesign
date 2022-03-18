//import { useState, useEffect } from 'react'
import React, { Fragment } from "react";
import CartComponent from '../CartComponent/CartComponent'

const Dashboard = ({pokemons}) => {

    

    return (
        <Fragment>
        <div>
            {
            pokemons.map((pokemon, index) => (
                <CartComponent key={index} idPokemon={pokemon.idPokemon} name={pokemon.name} moves={pokemon.moves} types={pokemon.types} url_photo={pokemon.url_photo} />
            ))
            }
        </div>
        </Fragment>
    )
}

export default Dashboard;
