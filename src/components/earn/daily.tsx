import React, { useState } from "react";
import logo from "../../assets/images/EarningLogo.png";
import Days from "../../assets/images/days.png";
import { Image } from "react-bootstrap";

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

export const Daily = () => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section className="days-section">
      <div className="weekdays mt-3 mb-5">
        <Image src={Days} alt="weekdays" className="weekdays-image" />
      </div>
      <p className="heading my-3">DAILY REWARD</p>
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
    </section>
  );
};
