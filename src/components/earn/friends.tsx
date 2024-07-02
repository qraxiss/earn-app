import React, { useState } from "react";
import logo from "../../assets/images/icon.svg";
import Frens from "../../assets/images/frens.png";
import Copy from "../../assets/images/Copy.png";
import { Image } from "react-bootstrap";

export const Friends = () => {
  const [copied, setCopied] = useState(false);
  const [friends, setFriends] = useState([
    { id: 1, username: "UserName", reward: "30.000" },
    { id: 2, username: "UserName", reward: "30.000" },
    { id: 3, username: "UserName", reward: "30.000" },
  ]);

  const handleCopy = () => {
    const link = "https://yourlink.com"; // Replace with your actual link
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="frens-section">
      <div className="frens-container mt-3 mb-5">
        <Image src={Frens} alt="frens" className="frens-image" />
      </div>
      <p className="heading my-3">INVITE FRIENDS</p>

      <div className="gap-2 my-2 earning-container">
        <div className="earning">
          <p className="earning-title">You EARN</p>
          <div className="d-flex align-items-center">
            <img src={logo} alt="" className="menu-logo me-2" />
            <p className="heading">30.000</p>
          </div>
        </div>
        <div className="earning">
          <p className="earning-title">Your Friend EARN</p>
          <div className="d-flex align-items-center">
            <img src={logo} alt="" className="menu-logo me-2" />
            <p className="heading">10.000</p>
          </div>
        </div>
      </div>

      <div>
        <button className="claim-button mt-3" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Link"} <i className="bi bi-copy mx-2"></i>
        </button>
      </div>

      <div className="friend-list-container">
        <p className="heading my-3">List of Your Friends ({friends.length})</p>
        {friends.map((friend) => (
          <div key={friend.id} className="friend-list my-2">
            <h4 className="m-0">{friend.username}</h4>
            <div className="d-flex align-items-center">
              <img src={logo} alt="" className="menu-logo me-2" />
              <p className="heading">{friend.reward}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
