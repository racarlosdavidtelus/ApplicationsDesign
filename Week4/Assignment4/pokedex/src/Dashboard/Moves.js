import React, {  useState } from "react";
import Modal from 'react-bootstrap/Modal'

function Moves({pokemon}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
                         
        <button type="button" className="btn btn-outline-primary" onClick={handleShow}>
          Moves
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{pokemon.name} Moves</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="card h-100">
                <table>
                    { pokemon.moves.map((pokemon,index) => (   
                    <tr key={index}>
                        <td>
                            {pokemon.move.name}
                        </td>
                    </tr>
                    ))}
                    
                </table>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-primary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
    
      </>
    );
  }
  
export default Moves;
