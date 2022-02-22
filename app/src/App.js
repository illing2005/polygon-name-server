import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./utils/contractABI.json";
import "./styles/App.css";

const tld = ".alpaca";
const CONTRACT_ADDRESS = "0x9fc604b0e41bBa411578D73C1028510b8493f255";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    // First make sure we have access to window.ethereum
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log(ethereum, "Wallet connected");
    }

    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // Users can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const mintDomain = async () => {
    // Don't run if the domain is empty
    if (!domain) {
      return;
    }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long");
      return;
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log("Minting domain", domain, "with price", price);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });
        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log(
            "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          // Set the record for the domain
          tx = await contract.setRecord(domain, record);
          await tx.wait();

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          setRecord("");
          setDomain("");
        } else {
          alert("Transaction failed! Please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create a function to render if wallet is not connected yet
  const renderNotConnectedContainer = () => (
    <div className="connect-wallet-container">
      <button
        onClick={connectWallet}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    </div>
  );

  // Form to enter domain name and data
  const renderInputForm = () => {
    return (
      <div className="form-container">
        <div className="first-row">
          <input
            type="text"
            value={domain}
            placeholder="domain"
            onChange={(e) => setDomain(e.target.value)}
          />
          <p className="tld"> {tld} </p>
        </div>

        <input
          type="text"
          value={record}
          placeholder="Value to store"
          onChange={(e) => setRecord(e.target.value)}
        />

        <div className="button-container">
          <button
            className="cta-button connect-wallet-button"
            style={{ marginRight: 10 }}
            disabled={null}
            onClick={mintDomain}
          >
            Mint
          </button>
          <button
            className="cta-button connect-wallet-button"
            disabled={null}
            onClick={null}
          >
            Set data
          </button>
        </div>
      </div>
    );
  };

  // This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">Polygon Name Service</p>
              <p className="subtitle">Your immortal API on the blockchain!</p>
            </div>
          </header>
        </div>

        {!currentAccount && renderNotConnectedContainer()}
        {currentAccount && renderInputForm()}

        <div className="footer-container">
          See on{" "}
          <a
            href="https://github.com/illing2005/alpaca-nft"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          , by{" "}
          <a
            href="https://www.linkedin.com/in/sebastian-illing-62320249/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sebastian Illing
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default App;
