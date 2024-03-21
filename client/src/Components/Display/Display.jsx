import React, { useState } from 'react'
import "./Display.css"
import { TailSpin } from 'react-loader-spinner';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import DeleteFile from '../DeleteFile/DeleteFile';

const Display = ({ account, contract }) => {
  const [imageData, setImageData] = useState(null);
  const [otherAccount, setOtherAccount] = useState("")
  const [loading, setLoading] = useState(false)
  const [shouldDisplayTable, setShouldDisplayTable] = useState(false)

  const loadData = async (e) => {
    e.preventDefault();
    const _user = e.target.name === "Your-Data" ? account : otherAccount;
    console.log(); setLoading(true);
    try {

      let data = await contract.display(_user);
      data =(data != null || data[0].hash!="") ? data.map((item, index) => {
        return (
          <tr key={item.hash}>
            <td>{index + 1}</td>
            <td>{item.fileName}</td>
            <td>{item.fileType}</td>
            <td>{item.uploadDate}</td>
            <td><a href={`https://gateway.pinata.cloud/ipfs/${item.hash}`}>{item.hash}</a></td>
            <td style={{ border: "0px" }}><DeleteFile account={account} contract={contract} hash={item.hash} /></td>
          </tr>
        )
      }):[]
      setImageData(imageData => data);;
      setShouldDisplayTable(shouldDisplayTable => true);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }

  }
  return (
    <div style={{ marginTop: "4%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h4 style={{}}>Fetch Data of an account</h4>
      {
        loading ? <TailSpin
          visible={true}
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        /> :

          <div style={{ width: "50%" }}>
            <input
              value={otherAccount}
              name="other_account"
              onChange={(e) => { setOtherAccount(otherAccount => e.target.value) }}
              type="text"
              style={{ width: "305px", padding: "5px", marginRight: "5px" }} />
            <br />
            <Button disabled={otherAccount === "" || otherAccount === null} variant="primary" name="Other-Data" style={{ margin: "4%", padding: "4px" }} onClick={loadData} className='otherData'>Data from specific Account</Button> {/* Additional styling */}
            <Button disabled={account === "" || account === null} variant="primary" name="Your-Data" style={{ margin: "4%", padding: "4px" }} onClick={loadData} className='otherData'>Fetch Your Data</Button> {/* Additional styling */}
          </div>

      }
      {shouldDisplayTable ? <div style={{ margin: "2%", width: "80%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {imageData.length > 0 ? <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>type</th>
              <th>Upload Date</th>
              <th>CID/Url</th>
            </tr>
          </thead>
          <tbody>
            {imageData}

          </tbody>
        </Table>:<h3>No data to display</h3>}
      </div> : null}

    </div>

  )
}

export default Display