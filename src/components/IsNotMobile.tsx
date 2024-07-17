import React from "react";
import IconImage from "../../src/assets/images/icon.svg";
import ErrorBg from "../../src/assets/images/errorbg.png";
import ErrorInner from "../../src/assets/images/errorInner.png";
import Shopcek from "../../src/assets/images/Shopcek.png";
import WebApp from "@twa-dev/sdk";

const IsNotMobile = () => {
  return (
    <div className="container">
      <div
        className="background"
        style={{ backgroundImage: `url(${ErrorBg})` }}
      ></div>
      <div className="content-container">
        <div className="content">
          <img src={ErrorInner} alt="Icon" className="erroricon" />
          <div className="my-5">
            <div className="main-text">PLAY ON YOUR MOBILE</div>
            <div className="sub-text mt-3">platform: {WebApp.platform}</div>
          </div>
          <img src={IconImage} alt="Shopgeek Logo" className="icon" />
          <img src={Shopcek} alt="Shopgeek Logo" className="footer-logo" />
        </div>
      </div>
    </div>
  );
};

export default IsNotMobile;
