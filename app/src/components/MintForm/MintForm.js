import React from "react";

const MintForm = ({
  switchNetwork,
  network,
  domain,
  setDomain,
  loading,
  mintDomain,
  tld,
}) => {
  if (network !== "Polygon Mumbai Testnet") {
    return (
      <div className="connect-wallet-container">
        <div className="connect-wallet-container">
          <h2>Please switch to Polygon Mumbai Testnet</h2>
          <button
            className="cta-button connect-wallet-button"
            onClick={switchNetwork}
          >
            Click here to switch
          </button>
        </div>
      </div>
    );
  }

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
      <button
        className="cta-button connect-wallet-button"
        disabled={loading}
        onClick={mintDomain}
      >
        Mint
      </button>
    </div>
  );
};

export default MintForm;
