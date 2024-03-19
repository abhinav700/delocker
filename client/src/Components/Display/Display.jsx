import React, { useState } from 'react'
import "./Display.css"
import { TailSpin } from 'react-loader-spinner';
import Button from "react-bootstrap/Button";
const Display = ({ account, contract }) => {
  const [imageData, setImageData] = useState(null);
  const [otherAccount, setOtherAccount] = useState("")
  const [loading, setLoading] = useState(false)
  const loadData = async (e) => {
    e.preventDefault();
    const _user = e.target.name === "Your-Data" ? account : otherAccount;
    console.log(_user);
    setLoading(true);
    try {

      let data = await contract.display(_user);
      data = data.map(item => {
        console.log(item)
        return (

          <img key={item} src={`${item}`} style={{ margin: "2%", width: "20%", height: "20%" }} />
        )
      })
      setImageData(imageData => data);;
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }

  }
  return (
    <div style={{marginTop:"4%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
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
            <Button disabled={otherAccount === "" || otherAccount === null} variant="primary" name="Other-Data" style={{ margin: "4%", padding :"4px" }} onClick={loadData} className='otherData'>Data from specific Account</Button> {/* Additional styling */}
            <Button disabled={account === "" || account === null} variant="primary" name="Your-Data" style={{ margin: "4%", padding :"4px" }} onClick={loadData} className='otherData'>Fetch Your Data</Button> {/* Additional styling */}
          </div>

      }
      <div style={{ margin: "2%", width: "80%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>

        {imageData}
      </div>

    </div>

  )
}

export default Display