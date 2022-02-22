import React from "react";
import "./styles/App.css";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
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
