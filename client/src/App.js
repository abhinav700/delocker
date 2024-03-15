import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import FileUpload from "./Components/FileUpload";
function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(account => address);
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
      setContract(contract => contract);

    }
    provider && loadProvider();
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to DeLocker!!</h1>
      <p style={{ marginTop: "10%", textAlign: "center", fontWeight: "bold" }}>
        Account : {account ? account : "Not connected"};
      </p>
      <FileUpload account = {account} contract = {contract}/>
    </div>
  );
}

export default App;
