import React, { useState } from "react";
import logo from "../../assets/images/icon.svg";
import Days from "../../assets/images/days.png";
import { Image } from "react-bootstrap";

const data = [
  {
    title: "Day 1",
    image: logo,
    points: "200K",
  },
  {
    title: "Day 2",
    image: logo,
    points: "300K",
  },
  {
    title: "Day 3",
    image: logo,
    points: "400K",
  },
  {
    title: "Day 4",
    image: logo,
    points: "500K",
  },
  {
    title: "Day 5",
    image: logo,
    points: "750K",
  },
  {
    title: "Day 6",
    image: logo,
    points: "1M",
  },
  {
    title: "Day 7",
    image: logo,
    points: "2M",
  },
];

export const Daily = () => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section className="days-section">
      <div className="weekdays my-5">
        <Image src={Days} alt="weekdays" className="weekdays-image" />
      </div>
      <div className="days-container my-3">
        <div className="days">
          {data.map((item, index) => (
            <div
              key={index}
              className={`days-item ${
                index === activeDay - 1 ? "active" : "disabled"
              }`}
            >
              <h4>{item.title}</h4>
              <Image
                src={item.image}
                alt={`${item.title} reward`}
                className="earn-logo"
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
