import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {TailSpin} from "react-loader-spinner";
import axios from "axios";
import "./DeleteFile.css"
const DeleteFile = ({ account, contract, hash }) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            await contract.deleteFile(hash);
            await axios({
                method: "delete",
                url: `https://api.pinata.cloud/pinning/unpin/${hash}`,
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_JWT}`,
                },
            });
            handleClose();
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body >Are you sure you want to delete this file?</Modal.Body>
                <Modal.Footer style = {{display:"flex", flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                {
                    loading ? <TailSpin
                        visible={true}
                        height="60"
                        width="60"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                            wrapperClass=""
                    /> :<>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>   
                        <Button onClick={handleDelete} variant="danger" >
                            Yes
                        </Button></>
                }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteFile;