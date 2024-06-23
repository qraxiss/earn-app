import React from "react";
import logo from "../../assets/images/icon.svg";
import BitcoinImage from "../../assets/images/bitcoin.png";
import { useDispatch, useSelector } from "react-redux";
import { setIcon } from "../../slices/selected-icon/slice";
import { AppDispatch } from "../../store/index";
import { MainButton } from "@twa-dev/sdk/react";

export const Mine = () => {
  const selectedIcon = useSelector((state: any) => state.selectedIcon.icon);
  const dispatch = useDispatch<AppDispatch>();
  const handleIconClick = (icon: string) => dispatch(setIcon(icon));

  return (
    <section className="">
      <MainButton
        text="TestButton"
        onClick={() => alert(JSON.stringify((window as any).Telegram.WebApp))}
      ></MainButton>

      {/* <div className="d-flex align-items-center justify-content-center">
        <div className="mt-2 d-flex align-items-center">
          <img src={logo} alt="" className="earn-logo me-2" />
          <p className="earn-amount">9,000,000</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="farming">
          <div className="d-flex align-items-center">
            <img src={logo} alt="" className="logo me-2" />
            <h3 className="m-0">940.60K</h3>
          </div>
          <p className="heading">Farming</p>
          <h4>4h 00m</h4>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="d-flex justify-content-between align-items-center mine">
          <span
            className={`mine-items ${
              selectedIcon === "electronics" ? "selected-icon" : ""
            }`}
            onClick={() => {
              handleIconClick("electronics");
            }}
          >
            Electronics
          </span>
          <span
            className={`mine-items ${
              selectedIcon === "fashion" ? "selected-icon" : ""
            }`}
            onClick={() => {
              handleIconClick("fashion");
            }}
          >
            Fashion
          </span>
          <span
            className={`mine-items ${
              selectedIcon === "digital" ? "selected-icon" : ""
            }`}
            onClick={() => {
              handleIconClick("digital");
            }}
          >
            Digital
          </span>
          <span
            className={`mine-items ${
              selectedIcon === "vehicle" ? "selected-icon" : ""
            }`}
            onClick={() => {
              handleIconClick("vehicle");
            }}
          >
            Vehicle
          </span>
          <span
            className={`mine-items ${
              selectedIcon === "real-estate" ? "selected-icon" : ""
            }`}
            onClick={() => {
              handleIconClick("real-estate");
            }}
          >
            Real Estate
          </span>
        </div>
      </div>
      <div className="electronics-container mt-5">
        <div className="electronics mx-3">
          <div className="d-flex align-items-center electronics-body">
            <img src={BitcoinImage} alt="" className="bitcoin-image" />
            <div>
              <h3 className="border-bottom py-2 m-0">New Era Baseball Cap</h3>
              <div className="d-flex align-items-center">
                <img src={logo} alt="" className="logo me-2" />
                <h3 className="m-0 py-2">200 / h</h3>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-content-center px-4 pb-3">
            <p className="heading px-2">PWR 22</p>
            <div className="d-flex align-items-center border-start px-2">
              <img src={logo} alt="" className="logo me-2" />
              <p className="heading">189.5K</p>
            </div>
          </div>
        </div>
        <div className="electronics mx-3">
          <div className="d-flex align-items-center electronics-body">
            <img src={BitcoinImage} alt="" className="bitcoin-image" />
            <div>
              <h3 className="border-bottom py-2 m-0">New Era Baseball Cap</h3>
              <div className="d-flex align-items-center">
                <img src={logo} alt="" className="logo me-2" />
                <h3 className="m-0 py-2">200 / h</h3>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-content-center px-4 pb-3">
            <p className="heading px-2">PWR 22</p>
            <div className="d-flex align-items-center border-start px-2">
              <img src={logo} alt="" className="logo me-2" />
              <p className="heading">189.5K</p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};
