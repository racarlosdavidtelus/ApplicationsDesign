import React, {  useState,useEffect } from "react";
import Card from "./Card2";
import { useUser } from "../context/UserContext"; 
import { toast } from 'react-toastify'
import config from '../config/config';
import NavbarDashboard from './NavbarDashboard';

const UserPokemons = () => {
    const [page,setPage] = useState(0);
    const [pokemons, setPokemons] = useState([])
    const context_user = useUser()

    useEffect(() => {
        const user_id = context_user.id;
        const getAllPokemons = () => {
            fetch(`${config.BACKEND}/user/getPokemons/userid/${user_id}`, {
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                
                if (data.error == null) {
                    
                    setPokemons([...data.msj])
                    
                    
                }else{
                    toast.error(data.msj)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
        getAllPokemons()
        //console.log(pokemons)
    },[]);

    const paginationPokes = () => {
        return pokemons.slice(page,page+100)
    }

    const nextPage = () => { 
        //setPage(page+100);
        if (page+100 <= pokemons.length) {
            setPage(page+100);
        }
    }

    const previewPage = () => {
        if (page-100 >= 0) {
            setPage(page-100);
        }
    }

    return(
        <div>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="card w-75">
            <div className="row row-cols-1 row-cols-md-2 g-2">
                { paginationPokes().map((pokemon,index) => (   //{idPokemon, name, moves, types, url_photo}                  
                    <Card key={index} pokemon={pokemon}></Card>
                ))}
            </div></div>
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

export default UserPokemons;
