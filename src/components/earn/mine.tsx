import React, { useState, useEffect } from "react";
import logo from "../../assets/images/icon.svg";
import EarningLogo from "../../assets/images/EarningLogo.png";
import BitcoinImage from "../../assets/images/bitcoin.png";
// import Amazon from "../../assets/images/AmazonEcho.png";
// import Watch from "../../assets/images/Watch.png";
import { useDispatch, useSelector } from "react-redux";
import { setIcon } from "../../slices/selected-icon/slice";
import { AppDispatch } from "../../store/index";
import { Image } from "react-bootstrap";
import {
  vehicles,
  electronics,
  fashion,
  realEstate,
} from "../../Data/Products";

export const Mine = () => {
  const selectedIcon = useSelector((state: any) => state.selectedIcon.icon);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState(electronics);

  const handleIconClick = (icon: string) => {
    console.log(icon);
    switch (icon) {
      case "fashion":
        setSelectedCategory(fashion);
        break;
      case "vehicle":
        setSelectedCategory(vehicles);
        break;
      case "electronics":
        setSelectedCategory(electronics);
        break;
      case "real-estate":
        setSelectedCategory(realEstate);
        break;
      default:
        break;
    }
    dispatch(setIcon(icon));
  };
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
          <div className="mine-container mt-3 mb-5">
            <h4 className="mine-start">Start Selling</h4>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <h4 className="m-0">
              <img className="mine-logo" src={EarningLogo} alt="" /> 235.15K/h
            </h4>
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
          <div
            className={`mine-items text-center ${
              selectedIcon === "electronics" ? "selected-icon" : ""
            }`}
            style={{ width: "25%" }}
            onClick={() => {
              handleIconClick("electronics");
            }}
          >
            Electronics
          </div>
          <div
            className={`mine-items text-center ${
              selectedIcon === "fashion" ? "selected-icon" : ""
            }`}
            style={{ width: "25%" }}
            onClick={() => {
              handleIconClick("fashion");
            }}
          >
            Fashion
          </div>
          <div
            className={`mine-items text-center ${
              selectedIcon === "vehicle" ? "selected-icon" : ""
            }`}
            style={{ width: "25%" }}
            onClick={() => {
              handleIconClick("vehicle");
            }}
          >
            Vehicle
          </div>
          <div
            className={`mine-items text-center ${
              selectedIcon === "real-estate" ? "selected-icon" : ""
            }`}
            style={{ width: "25%" }}
            onClick={() => {
              handleIconClick("real-estate");
            }}
          >
            Real Estate
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="products-container">
          {selectedCategory.map((product) => (
            <div
              className="d-flex justify-content-center align-items-center flex-column product"
              key={product.name}
            >
              <p className="product-heading">{product.name}</p>
              <div className="pwr d-flex justify-content-between align-items-center gap-3">
                <h6 className="">PWR {product.power}</h6>
                <h6 className="d-flex justify-content-center align-items-center">
                  <img className="earning-logo me-1" src={EarningLogo} alt="" />
                  {product.earnings}/h
                </h6>
              </div>
              <Image
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="image-container">
                <h6 className="hourly-income ">Hourly Rental Income</h6>
                <h6 className="d-flex justify-content-center align-items-center">
                  <img className="earning-logo me-1" src={EarningLogo} alt="" />
                   + {product.earnings}/h
                </h6>
              </div>

              <div className="buy-button d-flex  flex-column justify-content-center align-items-center m-2">
                <h5 className="upgrade-heading">Upgrade</h5>
                <h5 className="buy-heading">BUY</h5>
                <div className="d-flex justify-content-center align-items-center">
                  <img className="dollar me-2" src={logo} alt="" />
                  <h6 className="m-0">{product.price}</h6>
                </div>
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
