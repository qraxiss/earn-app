import React, { useState } from "react";
import logo from "../../assets/images/icon.svg";
import Frens from "../../assets/images/frens.png";
import Copy from "../../assets/images/Copy.png";
import { Image } from "react-bootstrap";
import WebApp from "@twa-dev/sdk";
import { frensSelector } from "../../slices/frens/slice";
import { useSelector } from "react-redux";
export const Friends = () => {
  const [copied, setCopied] = useState(false);
  const { referrers } = useSelector(frensSelector);

  const handleCopy = () => {
    const link = `https://t.me/shopcekbot/app?startapp=${WebApp.initDataUnsafe?.user?.id}`; // Replace with your actual link
    navigator.clipboard
      .writeText(
        `${link}

Open your store, become a top shopkeeper, and receive exclusive airdrop!
🛒 10k Coins as a welcome gift
👥 Refer friends and earn bonus coins for each referral!`
      )
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <section className="frens-section">
      <div className="frens-container mt-4 mb-5">
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
        <p className="heading my-3">
          List of Your Friends ({referrers.length})
        </p>
        {referrers.map((refer: any, idx: number) => (
          <div key={idx} className="friend-list my-2">
            <h4 className="refer-title m-0">{refer}</h4>
            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt=""
                className="menu-logo me-2"
                style={{
                  width: "15px",
                }}
              />
              <p className="refer-number">{Number(30000).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
