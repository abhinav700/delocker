import React from 'react'

function FileUpload({account, contract}) {
    return (
        <div>
            <form action="post" style={{ marginTop: "3%", textAlign: "center" }}>
               
                <input
                    style = {{cursor:"pointer"}}
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                />
                <button style = {{cursor:"pointer"}}>Upload file</button>
            </form>
        </div>
    )
}

export default FileUpload