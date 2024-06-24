import React, { useState, useEffect } from "react";
import logo from "../../assets/images/icon.svg";
import Iphone from "../../assets/images/Iphone.png";
import BitcoinImage from "../../assets/images/bitcoin.png";
import Airpods from "../../assets/images/Airpods.png";
import Amazon from "../../assets/images/AmazonEcho.png";
import Watch from "../../assets/images/Watch.png";
import { useDispatch, useSelector } from "react-redux";
import { setIcon } from "../../slices/selected-icon/slice";
import { AppDispatch } from "../../store/index";
import { Image } from "react-bootstrap";

const productsData = [
  {
    name: "Apple Iphone",
    power: 0,
    hourlyRate: 300,
    upgradeCost: "1.3K",
    image: Iphone,
  },
  {
    name: "Amazon Echo",
    power: 0,
    hourlyRate: 40,
    upgradeCost: 400,
    image: Amazon,
  },
  {
    name: "Apple Watch Hermes",
    power: 0,
    hourlyRate: 50,
    upgradeCost: 700,
    image: Watch,
  },
  {
    name: "Apple Airpods",
    power: 0,
    hourlyRate: 50,
    upgradeCost: 600,
    image: Airpods,
  },
];

export const Mine = () => {
  const selectedIcon = useSelector((state: any) => state.selectedIcon.icon);
  const dispatch = useDispatch<AppDispatch>();
  const handleIconClick = (icon: string) => dispatch(setIcon(icon));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="mine-section">
      <div className="d-flex align-items-center justify-content-center">
        <div className="my-3 d-flex align-items-center">
          <Image src={logo} alt="" className="earn-logo me-2" />
          <p className="earn-amount">9,000,000</p>
        </div>
      </div>

      {isMobile ? (
        <>
          <div className="mine-container my-5">
            <h4 className="mine-start">Start Selling</h4>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <h4 className="m-0">$ 235.15K/h</h4>
            <h4 className="m-0">04:00</h4>
          </div>
        </>
      ) : (
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
      )}

      <div className="d-flex align-items-center justify-content-center mt-3">
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

      {isMobile ? (
        <div className="products-container">
          {productsData.map((product) => (
            <div
              className="d-flex justify-content-center align-items-center flex-column product"
              key={product.name}
            >
              <p className="product-heading">{product.name}</p>
              <div className="d-flex justify-content-between align-items-center gap-3">
                <h6 className="">PWR {product.power}</h6>
                <h6 className="">$ {product.hourlyRate}/h</h6>
              </div>
              <Image
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h5>Upgrade</h5>
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="me-3">$</h3>
                <h6 className="">{product.upgradeCost}</h6>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="electronics-container mt-5">
          <div className="electronics mx-3">
            <div className="d-flex align-items-center electronics-body">
              <Image src={BitcoinImage} alt="" className="bitcoin-image" />
              <div>
                <h3 className="border-bottom py-2 m-0">New Era Baseball Cap</h3>
                <div className="d-flex align-items-center">
                  <Image src={logo} alt="" className="logo me-2" />
                  <h3 className="m-0 py-2">200 / h</h3>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-content-center px-4 pb-3">
              <p className="heading px-2">PWR 22</p>
              <div className="d-flex align-items-center border-start px-2">
                <Image src={logo} alt="" className="logo me-2" />
                <p className="heading">189.5K</p>
              </div>
            </div>
          </div>
          <div className="electronics mx-3">
            <div className="d-flex align-items-center electronics-body">
              <Image src={BitcoinImage} alt="" className="bitcoin-image" />
              <div>
                <h3 className="border-bottom py-2 m-0">New Era Baseball Cap</h3>
                <div className="d-flex align-items-center">
                  <Image src={logo} alt="" className="logo me-2" />
                  <h3 className="m-0 py-2">200 / h</h3>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-content-center px-4 pb-3">
              <p className="heading px-2">PWR 22</p>
              <div className="d-flex align-items-center border-start px-2">
                <Image src={logo} alt="" className="logo me-2" />
                <p className="heading">189.5K</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
