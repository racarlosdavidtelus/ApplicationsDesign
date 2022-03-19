import React, {  useState } from "react";

const Dashboard = ({pokemons}) => {
    const [page,setPage] = useState(0);
    const [nickname,setNickname] = useState('');
    
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
        console.log("hola",pokemon,nickname)
        //aqui hago el fetch POST para guardar el pokemon al usuario
        
    }

    const handleInputChange = (event) => {
        setNickname( event.target.value);
    }

    return(
        <div>
            <div className="row row-cols-1 row-cols-md-5 g-4">
                { paginationPokes().map((pokemon) => (   //{idPokemon, name, moves, types, url_photo}                  
                    <div key={pokemon.idPokemon} className="col">
                        <div className="card h-100">
                            <img src={pokemon.url_photo} alt={pokemon.name} style={{height:100, width:100}}/>
                            <div className="card-body">
                                <h5 className="card-title">{pokemon.name}</h5>
                                <p className="card-text">This is </p>
                            </div>
                            <div className="card-footer">
                                <div className="row g-3 align-items-center">
                                    <div className="col-auto">
                                        <label htmlFor="nickname" className="col-form-label">Nickname</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" name="nickname" id="nickname"  onChange={handleInputChange} className="form-control"></input>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-outline-success" onClick={() => handleAddPokemon(pokemon)}>
                                            <i className="bi bi-plus-square"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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
