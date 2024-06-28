import React, { useState, useEffect } from "react";
import logo from "../../assets/images/EarningLogo.png";
import Days from "../../assets/images/days.png";
import Clock from "../../assets/images/clock.png";
import Question from "../../assets/images/Question.png";
import GreenTick from "../../assets/images/greentick.png";
import Shopcek from "../../assets/images/icon.svg";
import { Image } from "react-bootstrap";
import SlideUpPanel from "../TaskSlider";

const data = [
  {
    title: "Day 1",
    image: logo,
    points: "20K",
  },
  {
    title: "Day 2",
    image: logo,
    points: "25K",
  },
  {
    title: "Day 3",
    image: logo,
    points: "30K",
  },
  {
    title: "Day 4",
    image: logo,
    points: "40K",
  },
  {
    title: "Day 5",
    image: logo,
    points: "100K",
  },
  {
    title: "Day 6",
    image: logo,
    points: "200K",
  },
  {
    title: "Day 7",
    image: logo,
    points: "500K",
  },
  {
    title: "Day 8",
    image: logo,
    points: "1M",
  },
  {
    title: "Day 9",
    image: logo,
    points: "5M",
  },
];

const dailyData = [
  { heading: "Daily Log-in", img: Days, time: "24:00", completed: true },
  { heading: "Lucky Item", img: Clock, time: "12:59", completed: false },
  { heading: "Trivia Quest", img: Question, time: "5:42", completed: false },
];

export const Daily = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleClosePanel = () => {
    setIsPanelOpen(!isPanelOpen);
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
    <section className="days-section">
      <div className="weekdays mt-3 mb-5">
        <Image src={Days} alt="weekdays" className="weekdays-image" />
      </div>
      <p className="heading my-3">DAILY TASKS</p>
      {isMobile ? (
        <>
          <div className="d-flex justify-content-between w-100">
            {dailyData.map((card, index) => (
              <div
                key={index}
                onClick={handleClosePanel}
                className={`daily-card ${
                  card.completed ? "completed" : "not-completed"
                } ${isPanelOpen ? "panel-open" : ""}`}
              >
                <h6 className="m-0">{card.heading}</h6>
                <img src={card.img} alt="" />
                <h6>{card.time}</h6>
                <span className="dot">
                  {card.completed ? (
                    <img className="w-100" src={GreenTick} alt="" />
                  ) : (
                    <span className="white-dot"></span>
                  )}
                </span>
              </div>
            ))}
            <SlideUpPanel show={isPanelOpen} onClose={handleClosePanel}>
              <h5 className="my-2">Daily Log-In</h5>
              <p className="w-75 m-0">
                Complete your daily logins & Boost your earnings!
              </p>
              <div className="days-container my-1">
                <div className="days">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className={`days-item ${
                        index === activeDay - 1 ? "active" : ""
                      } ${index === activeDay ? "next-active" : ""}`}
                      onClick={() => setActiveDay(index + 1)}
                    >
                      <p className="days-title">{item.title}</p>
                      <Image
                        src={item.image}
                        alt={`${item.title} reward`}
                        className="days-logo"
                      />
                      <h4 className="heading">{item.points}</h4>
                      <span onClick={handleClosePanel} className="close">
                        <i className="bi bi-x-circle"></i>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button className="claim-button mt-3">Claim</button>
              </div>
            </SlideUpPanel>
          </div>
        </>
      ) : (
        <>
          <div className="days-container my-3">
            <div className="days">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`days-item ${
                    index === activeDay - 1 ? "active" : "disabled"
                  }`}
                >
                  <p className="days-title">{item.title}</p>
                  <Image
                    src={item.image}
                    alt={`${item.title} reward`}
                    className="days-logo"
                  />
                  <h4 className="heading">{item.points}</h4>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="claim-button mt-3">Claim</button>
          </div>
        </>
      )}
    </section>
  );
};
