import { useState } from 'react';
import axios from 'axios';
import {TailSpin}  from 'react-loader-spinner'
function FileUpload({ account, contract }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendFileToIPFS = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_JWT}`,
                },
            });
            const ImgUrl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            console.log("File upload component", account);
            await contract.add(account, ImgUrl);
            alert("File Uploaded successfuly")

        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
                loading? <TailSpin
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />:
            <form  id = "upload_form" action="post" style={{ marginBottom: "3%", textAlign: "center" }}>


                <input
                    style={{ cursor: "pointer" }}
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={(e) => { setFile(e.target.files[0]) }}
                />
                <button name = "upload_button" onClick={sendFileToIPFS} disabled={!file} style={{ cursor: "pointer" }}>Upload file</button>
            </form>}
        </div>

    )
}

export default FileUpload