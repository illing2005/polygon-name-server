import React from "react";

const NotConnected = ({ connectWallet }) => {
    console.log(connectWallet)
  return (
    <div className="connect-wallet-container">
      <button
        onClick={() => connectWallet()}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default NotConnected;
