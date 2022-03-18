function EntryComponent({ idPokemon, name, moves, types ,url_photo}) {
    return (
        <div style={{ border: 'solid', marginTop: "10px", marginBottom: "10px" }}>
            <h1>{idPokemon}</h1>
            <h2>{name}</h2>
            <div>
                {
                types.map((element,index) => (
                    <p key={index}>{element.type.name}</p>
                ))
                }
            </div>
            <div>
                {
                moves.map((element,index) => (
                    <p key={index}>{element.move.name}</p>
                ))
                }
            </div>
            <img 
                src={url_photo}
                alt="new"
            />
           
        </div>
    )
}

export default EntryComponent;