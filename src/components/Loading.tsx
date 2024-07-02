import React from "react";
import IconImage from "../../src/assets/images/icon.svg";
import ErrorBg from "../../src/assets/images/errorbg.png";
import Shopcek from "../../src/assets/images/Shopcek.png";

const Error = () => {
  return (
    <div className="Loading-container">
      <div
        className="Loading-background"
        style={{ backgroundImage: `url(${ErrorBg})` }}
      ></div>
      <div className="Loading-content-container">
        <div className="Loading-content">
          <img
            src={Shopcek}
            alt="Shopgeek Logo"
            className="Loading-footer-logo"
          />
          <div className="loader-container">
            <div className="loader"></div>
            <div className="logo-container">
              <img
                src={IconImage}
                alt="Shopgeek Logo"
                className="Loading-logo"
              />
            </div>
          </div>
          <div className="sub-text">Loading</div>
        </div>
      </div>
    </div>
  );
};

export default Error;
