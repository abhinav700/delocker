import React, { useState, useEffect } from 'react'
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
function AccessList({ account, contract }) {
    const [accessList, setAccessList] = useState(null);
    
    const revokeAccess = async (e, user) => {
        console.log("revoke accesss is called");
        await contract.disallow(user);
    }
    const loadAccessList = async () => {
        let data = await contract.shareAccessList();
        data = data.filter(item => item.access == true);
        data = data.map((item, index) => {
            return (
                <Dropdown.Item key={item.user} eventKey={`item-${item.user}`} style={{ height: "60px", display: "flex", flexDirection: "row", width: "fit-content%", alignItems: "flex-start" }}>
                    <p style={{ marginTop: '2px' }} key={item.user} eventKey={`item-${item.user}`}>{item.user}</p>
                    <Button onClick={(e) => { e.stopPropagation(); revokeAccess(e, item.user) }} style={{ marginLeft: "2%", width: "fit-content", padding: "3px" }} variant='danger'>Revoke access</Button>

                </Dropdown.Item>
            )
        })
        setAccessList(accessList => data);
    }
    useEffect(() => {
        loadAccessList()
    }, [revokeAccess])



    return (
        <div style={{ marginTop: "2%", width: "100%" }}>
            {<Dropdown style={{ width: "100%" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    People With access
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "fit-content" }} >
                    {accessList}
                </Dropdown.Menu>
            </Dropdown>}
        </div>
    )
}

export default AccessList