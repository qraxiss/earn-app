import React, { useState, useEffect } from "react";
import logo from "../../assets/images/icon.svg";
import EarningLogo from "../../assets/images/EarningLogo.png";
import Lock from "../../assets/images/lock.png";
import BitcoinImage from "../../assets/images/bitcoin.png";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isSellingStarted, setIsSellingStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14400);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "k";
    } else {
      return num.toString();
    }
  };

  const handleIconClick = (icon: string) => {
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

  const startSelling = () => {
    setIsSellingStarted(true);
    setTimeLeft(14400);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSellingStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsSellingStarted(false);
      document.body.style.backgroundColor = "#FF92FF";
    }

    return () => clearInterval(interval);
  }, [isSellingStarted, timeLeft]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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
      {isMobile ? (
        <>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <h4 className="m-0 d-flex align-items-center">
              <img className="mine-logo me-2" src={EarningLogo} alt="" />{" "}
              235.15K/h
            </h4>
            {isSellingStarted ? (
              <h4 className="m-0">{formatTime(timeLeft)}</h4>
            ) : (
              <h4 className="m-0">04:00</h4>
            )}
          </div>
          <div className="mt-3">
            {!isSellingStarted ? (
              <h4 className="mine-start m-0" onClick={startSelling}>
                Start Selling
              </h4>
            ) : (
              <h4 className="mine-start started m-0">
                <div className="fill-animation"></div>
                Sales Started
              </h4>
            )}
          </div>
          <div className="d-flex align-items-center justify-content-center border-bottom">
            <div className="my-5 d-flex align-items-center">
              <Image src={logo} alt="" className="earn-logo me-2" />
              <p className="earn-amount">9,000,000</p>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column align-items-center mt-5">
          <div className="d-flex align-items-center justify-content-center">
            <div className="my-3 d-flex align-items-center">
              <Image src={logo} alt="" className="earn-logo me-2" />
              <p className="earn-amount">9,000,000</p>
            </div>
          </div>
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

      <div className="products-nav position-sticky top-0 z-3 d-flex align-items-center justify-content-center mt-3">
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
              className={`d-flex justify-content-center align-items-center flex-column product product-hover`}
              key={product.name}
            >
              <div
                className={`d-flex justify-content-center align-items-center flex-column`}
              >
                <p className="product-heading  mt-2">{product.name}</p>
                <div
                  className={`pwr d-flex justify-content-between align-items-center gap-3 mb-2  ${!product.eligible ? "opacity-50" : ""}`}
                >
                  <h6 className="m-0">PWR {product.power}</h6>
                  <h6 className="d-flex justify-content-center align-items-center m-0">
                    <img
                      className="earning-logo me-1"
                      src={EarningLogo}
                      alt=""
                    />
                    {formatNumber(product.power)} /h
                  </h6>
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  className={`product-image ${!product.eligible ? "opacity-50" : ""}`}
                />

                <div className="image-container my-2">
                  <h6 className="hourly-income">Hourly Rental Income</h6>
                  <h6 className="d-flex justify-content-center align-items-center">
                    <img
                      className="earning-logo me-1"
                      src={EarningLogo}
                      alt=""
                    />
                    + {formatNumber(product.earnings)} /h
                  </h6>
                </div>

                <div
                  className={`buy-button d-flex flex-column justify-content-center align-items-center my-2`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <h5 className="buy-heading">BUY</h5>
                    {!product.eligible ? (
                      <Image src={Lock} className="buy-lock" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`m-1 d-flex justify-content-center align-items-center ${!product.eligible ? "price-container" : ""}`}
                  >
                    <img className="dollar me-2" src={logo} alt="" />
                    <h4 className="m-0">{formatNumber(product.price)}</h4>
                  </div>
                </div>
              </div>

              {!product.eligible && (
                <div className="lock my-2">
                  <Image src={Lock} className="my-2" />
                  <h5>Invite +1 more friends</h5>
                </div>
              )}
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
