import React, {useState} from 'react';
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ShareAccess from './ShareAccess';
function ShareAccessModal({ account, contract }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  
    return (
      <>
        <Button style = {{padding:"3px"}} variant="primary" onClick={handleShow}>
         Share Access
        </Button>
  
        <Modal style = {{width:"100%"}} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sharing access with another user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <ShareAccess account = {account} contract = {contract}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ShareAccessModal