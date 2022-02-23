import React from "react";

const MintedDomains = ({ mints, tld, contract }) => {
  if (mints.length > 0) {
    return (
      <div className="mint-container">
        <p className="subtitle">Recently minted domains:</p>
        <div className="mint-list">
          {mints.map((mint, index) => {
            return (
              <div className="mint-item" key={index}>
                <div className="mint-row">
                  <a
                    className="link"
                    href={`https://testnets.opensea.io/assets/mumbai/${contract}/${mint.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="underlined">
                      {" "}
                      {mint.name}
                      {tld}{" "}
                    </p>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
      return <span/>
  }
};

export default MintedDomains;
