import React, { useState, useEffect } from "react";
import logo from "../../assets/images/EarningLogo.png";
import Rank from "../../assets/images/Rank.png";
import Profile from "../../assets/images/Profile.png";
import NameImage from "../../assets/images/name.webp";
import { Image } from "react-bootstrap";
import { ranks } from "../../Data/Ranks";

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
          <section className="rank-section">
            <div className="rank-container mt-4 mb-5">
              <Image src={Rank} alt="rank" className="rank-image" />
            </div>
            <p className="heading my-3">STATS</p>
            <div className="gap-2 my-2 stats-container ">
              <div className="rank">
                <p className="rank-title">Total Players</p>
                <div className="d-flex align-items-center">
                  <p className="heading">250 000 000</p>
                </div>
              </div>
              <div className="rank">
                <p className="rank-title">Daily Users</p>
                <div className="d-flex align-items-center">
                  <p className="heading">250 000 000</p>
                </div>
              </div>
            </div>
            <div className="rank-list-container">
              <p className="heading my-3">RANKING</p>
              {ranks.map((rank) => (
                <div
                  key={rank.rank}
                  className={`rank-list ${rank.myRank ? "my-rank" : ""}`}
                  my-2
                >
                  {!rank.myRank ? (
                    <div className="d-flex  align-items-center">
                      <h4 className="my-0 mx-2 rank-no">{rank.rank}</h4>
                      <img
                        className="profile-img ms-3 me-2"
                        src={Profile}
                        alt=""
                      />
                      <h4 className="m-0 username">username</h4>
                    </div>
                  ) : (
                    <>
                      <h4 className="my-0 mx-2">100k+</h4>
                      <h4 className="m-0 text-center">MY RANK</h4>
                    </>
                  )}
                  <div className="d-flex align-items-center points">
                    <img src={logo} alt="" className="menu-logo me-2" />
                    <p className="m-0">{rank.points}/h</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
