import { useEffect } from "react";
import logo from "../../assets/images/EarningLogo.png";
import Rank from "../../assets/images/Rank.png";
import Profile from "../../assets/images/Profile.png";
import { Image } from "react-bootstrap";
import { ranksSelector, statsSelector } from "../../slices/leader-board/api";
import { useSelector } from "react-redux";
import formatNumber from "../../helpers/format-number";

export const Name = () => {
  const ranks = useSelector(ranksSelector);
  const stats = useSelector(statsSelector);

  return (
    <section className="name-section">
      <section className="rank-section">
        <div className="rank-container mt-4 mb-5">
          <Image src={Rank} alt="rank" className="rank-image" />
        </div>
        <p className="heading my-3">STATS</p>
        <div className="gap-2 my-2 stats-container ">
          <div className="rank">
            <p className="rank-title">Total Players</p>
            <div className="d-flex align-items-center">
              <p className="heading">{stats.totalUser}</p>
            </div>
          </div>
          <div className="rank">
            <p className="rank-title">Daily Users</p>
            <div className="d-flex align-items-center">
              <p className="heading">{stats.dailyActiveUser}</p>
            </div>
          </div>
        </div>
        <div className="rank-list-container">
          <p className="heading my-3">RANKING</p>
          {ranks.map((rank: any, idx: number) => (
            <div
              key={idx}
              className={`rank-list `} //${rank.myRank ? "my-rank" : ""}
              my-2
            >
              {!rank.myRank ? (
                <div className="d-flex  align-items-center">
                  <h4 className="my-0 mx-2 rank-no">{idx + 1}</h4>
                  <img className="profile-img ms-3 me-2" src={Profile} alt="" />
                  <h4 className="m-0 username">{rank.name}</h4>
                </div>
              ) : (
                <>
                  <h4 className="my-0 mx-2">100k+</h4>
                  <h4 className="m-0 text-center">MY RANK</h4>
                </>
              )}
              <div className="d-flex align-items-center points">
                <img src={logo} alt="" className="menu-logo me-2" />
                <p className="m-0">{formatNumber(Math.round(rank.earn))}/h</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
