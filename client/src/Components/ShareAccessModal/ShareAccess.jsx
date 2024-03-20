import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { TailSpin } from 'react-loader-spinner';
import AccessList from './AccessList';

function ShareAccess({ account, contract }) {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false);

    const handleShareAccess = async (e) => {
        setLoading(loading=>true);
        try {
            e.preventDefault();
            await contract.shareAccess(user);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width:"100%" }}>
            {loading ? <TailSpin
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            /> :
                <form className="share_access_form">
                    <input
                        name="user"
                        type="text"
                        onChange={(e) => { setUser(user => e.target.value) }}
                        value={user}
                        style={{ width: "305px", padding: "5px", marginRight: "5px" }}
                    />
                    <Button onClick={handleShareAccess} variant="primary">Share access</Button>
                </form>}
            <AccessList account={account} contract = {contract}/>
        </div>
    )
}

export default ShareAccess