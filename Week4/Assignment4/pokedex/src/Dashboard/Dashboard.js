import React, {  useState } from "react";
import Card from "./Card";
import { toast } from 'react-toastify'
import config from '../config/config';
import { useUser } from "../context/UserContext"; 
import NavbarDashboard from './NavbarDashboard';

const Dashboard = ({pokemons}) => {
    const [page,setPage] = useState(0);
    const [nickname,setNickname] = useState('');
    const context_user = useUser()
    
    
    const paginationPokes = () => {
        return pokemons.slice(page,page+100)
    }

    const nextPage = () => { 
        //setPage(page+100);
        if (page+100 <= 898) {
            setPage(page+100);
        }
    }

    const previewPage = () => {
        if (page-10 >= 0) {
            setPage(page-100);
        }
    }

    const  handleAddPokemon = (pokemon) => {
        //console.log("hola",pokemon,nickname)
        const data = {
            id_user: context_user.id,
            idPokemon: pokemon.idPokemon,
            name: pokemon.name,
            nickname: nickname,
            moves: pokemon.moves,
            types: pokemon.types,
            url_photo: pokemon.url_photo
        }
        setNickname('');
        console.log(data)
        //aqui hago el fetch POST para guardar el pokemon al usuario
        
        fetch(`${config.BACKEND}/user/addPokemon`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => { console.log("fetxhs")
            if (data.error == null) {
                toast.success('Pokemon add to your collection', {
                    /*
                    onClose: () => {
                        history.replace("/login")
                    }
                    */
                })
            }else{
                toast.error(data.msj)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleInputChange = (event) => {
        setNickname(event.target.value);
    }

    return(
        <div>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="row row-cols-1 row-cols-md-5 g-4">
                { paginationPokes().map((pokemon,index) => (   //{idPokemon, name, moves, types, url_photo}                  
                    <Card key={index} pokemon={pokemon} handleAddPokemon={handleAddPokemon} handleInputChange={handleInputChange}></Card>
                ))}
            </div>
            <br></br>
            <nav aria-label="navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                    <button type="button" className="btn btn-outline-primary" onClick={previewPage}>Previous</button>
                    </li>
                    <li className="page-item">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li className="page-item">
                    <button type="button" className="btn btn-outline-primary" onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
