import React from "react";
import polygonLogo from "../../assets/polygonlogo.png";

const Header = ({currentAccount}) => {
  return (
    <div className="header-container">
      <header>
        <div className="left">
          <p className="title">Polygon Name Service</p>
          <p className="subtitle">Your domain on the blockchain!</p>
        </div>
        <div className="right">
          <img alt="Network logo" className="logo" src={polygonLogo} />
          {currentAccount ? (
            <p>
              {" "}
              Wallet: {currentAccount.slice(0, 6)}...
              {currentAccount.slice(-4)}{" "}
            </p>
          ) : (
            <p> Not connected </p>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
