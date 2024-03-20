import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import path from "./image/background.jpg";
import "./App.css";
import Display from "./Components/Display/Display";
import FileModal from "./Components/FileUploadModal/FileUploadModal";
import ShareAccessModal from "./Components/ShareAccessModal/ShareAccessModal";
function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(account => address);
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const Contract = new ethers.Contract(contractAddress, Upload.abi, signer);
      setContract(contract => Contract);

    }
    provider && loadProvider();
  }, [])
  return ( 
    <div style={{ width: "100%", height: "fit-content",minHeight:"100vh", padding: "1px 0px", backgroundImage: `url(${path})`, backgroundRepeat: `no-repeat cover center` }}>
      <nav style = {{margin :"2%", display:"flex", flexDirection:"row", justifyContent:"space-around", width:"20%"}}>
        <FileModal account = {account} contract = {contract}/>
        <ShareAccessModal account = {account} contract = {contract}/>
      </nav>
      <h1 style={{ textAlign: "center", }}>Welcome to DeLocker!!</h1>
      <p style={{ marginTop: "3%", textAlign: "center" }}>
        <span style={{ fontWeight: "bold" }}>Account :</span> {account ? account : "Not connected"}
      </p>
      
      <Display account = {account} contract = {contract}/>
    </div>
  );
}

export default App;
