import Moves from "./Moves";

function Card({ pokemon,handleAddPokemon,handleInputChange }) {
    return (
        <div key={pokemon.idPokemon} className="col">
            <div className="card h-100">
                <img src={pokemon.url_photo} alt={pokemon.name} style={{height:100, width:100}}/>
                
                <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                    <p className="card-text">This is </p>
<Moves pokemon={pokemon}></Moves>
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

    )
}

export default Card;