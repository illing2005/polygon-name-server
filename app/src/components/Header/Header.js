import React from "react";
import polygonLogo from "../../assets/polygonlogo.png";

const Header = ({ currentAccount, userDomains, tld }) => {
  let name = "Not connected";
  if (currentAccount) {
    if (userDomains.length > 0) {
      name = `${userDomains[0]}${tld}`;
    } else {
      name = `Wallet: ${currentAccount.slice(0, 6)}...${currentAccount.slice(
        -4
      )}`;
    }
  }

  return (
    <div className="header-container">
      <header>
        <div className="left">
          <p className="title">Polygon Name Service</p>
          <p className="subtitle">Your domain on the blockchain!</p>
        </div>
        <div className="right">
          <img alt="Network logo" className="logo" src={polygonLogo} />
          <p>{name}</p>
        </div>
      </header>
    </div>
  );
};

export default Header;
