import React, { useState } from "react";
import logo from "../../assets/images/icon.svg";
import Frens from "../../assets/images/frens.png";
import ton from "../../assets/images/ton.webp";
import gift from "../../assets/images/gift.webp";
import coin from "../../assets/images/coin.webp";
import { Image } from "react-bootstrap";
import WebApp from "@twa-dev/sdk";
import { frensSelector } from "../../slices/frens/slice";
import { useSelector } from "react-redux";
import earning from "../../assets/images/EarningLogo.png";

export const Friends = () => {
  const [copied, setCopied] = useState(false);
  const { referrers } = useSelector(frensSelector);

  const handleCopy = () => {
    const link = `https://t.me/shopcekbot/start?startapp=${WebApp.initDataUnsafe?.user?.id}`; // Replace with your actual link
    navigator.clipboard
      .writeText(
        `${link}

Open your store, become a top shopkeeper, and get an exclusive airdrop! 
🛒 Receive 10k Coins as a welcome gift 
👥 Refer friends and earn bonus coins! 

Airdrop Details: 60% for top earners and referrers, 40% for 500 lucky participants. Everyone who launches the app is eligible for the raffle. Live raffle three days before token listing. Don't miss out! Join now and start winning!`
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
      <p className="heading my-1">INVITE FRIENDS</p>
      <p className="heading my-1">Give away without lottery!</p>
      <div className="prize-pool p-3 m-1">
        <div className="rewards">
          <div className="title">Referral Prize Pool</div>
          <div className="ton">5,000,000 NOT</div>
          <div className="shpc">50,000,000 SHPC</div>
        </div>
        <div className="bigger-ton m-1">
          <Image className="p-1" src={ton}></Image>
        </div>
      </div>

      <div className="p-3 invite-information m-1">
        <Image className="m-2" src={gift}></Image>
        <div className="rewards">
          <div className="title">Invite a Friend</div>
          <div className="tokens">
            <div className="reward">
              <div className="smaller-coin m-1">
                <Image className="p-1" src={ton}></Image>
              </div>
              <div className="ton">+0.5 NOT</div>
            </div>
            <div className="reward">
              <div className="smaller-coin m-1">
                <Image className="p-1" src={logo}></Image>
              </div>
              <div className="ton">+5 SHPC</div>
            </div>
          </div>
          <div className="tokens">
            <div className="reward">
              <div className="smaller-coin m-1">
                <Image className="p-1" src={coin}></Image>
              </div>
              <div className="coin">
                <div>+30,000</div>
                <div className="info">for you and your friend</div>
              </div>
            </div>
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
          <div key={idx} className="friend-list my-1">
            <h4 className="refer-title m-0">
              <div className="count">{idx + 1}</div>
              <div>
                {refer}
                <div className="d-flex align-items-center">
                  <img
                    src={coin}
                    alt=""
                    className="menu-logo me-2"
                    style={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                  <p className="refer-number">
                    {Number(30000).toLocaleString()}
                  </p>
                </div>
              </div>
            </h4>

            <div className="rewards">
              <div className="reward">
                <div className="smaller-coin">
                  <Image className="p-1" src={ton}></Image>
                </div>
                <div className="ton">+0.5 NOT</div>
              </div>
              <div className="reward">
                <div className="smaller-coin">
                  <Image className="p-1" src={logo}></Image>
                </div>
                <div className="ton">+5 SHPC</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
