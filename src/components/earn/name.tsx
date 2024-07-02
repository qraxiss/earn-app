import React, { useState, useEffect } from "react";
import logo from "../../assets/images/icon.svg";
import How from "../../assets/images/how.png";
import NameImage from "../../assets/images/name.webp";
import { Image } from "react-bootstrap";

const nameData = [
  { letters: "3-4 Letters", amount: "7.000.000" },
  { letters: "5-7 Letters", amount: "6.000.000" },
  { letters: "8-15 Letters", amount: "2.000.000" },
];

export const Name = () => {
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
    <section className="name-section">
      {isMobile ? (
        <>
          <div className="howto-container my-5">
            <Image src={How} alt="howto" className="howto-image" />
          </div>
          <p className="heading my-3">HOW TO USE</p>
        </>
      ) : (
        <>
          <div className="name-container my-5">
            <Image src={NameImage} alt="Name" className="name-image" />
          </div>
          <p className="heading my-3">CLAIM YOUR NAME</p>

          <div className="input-group mb-3 search-input">
            <input
              type="text"
              className="form-control"
              placeholder="Find What Suits You"
              aria-label="Find What Suits You"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>

          <div>
            <button className="claim-button my-3">Claim</button>
          </div>

          <div className="list-container">
            {nameData.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between my-2"
              >
                <h2 className="m-0 flex-1">{item.letters}</h2>
                <div className="d-flex align-items-center flex-1">
                  <img src={logo} alt="logo" className="logo me-2" />
                  <p className="heading amount">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
