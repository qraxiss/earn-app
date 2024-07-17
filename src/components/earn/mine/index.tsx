import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";

//redux
import { start, stackClaim } from "../../../slices/api";
import { setIcon } from "../../../slices/selected-icon/slice";
import { cardsSelector } from "../../../slices/card/slice";
import { xpSelector } from "../../../slices/xp/slice";
import { AppDispatch, RootState } from "../../../store";
import {
  open,
  close,
  notificationSelector
} from "../../../slices/notification/slice";

import { setMenu } from "../../../slices/selected-menu/slice";

//images
import logo from "../../../assets/images/icon.svg";
import EarningLogo from "../../../assets/images/EarningLogo.png";
import remainTime from "../../../assets/images/remain-time.png";

//components
import Product from "./product";
import SlideUpPanel from "../../TaskSlider";

import formatNumber from "../../../helpers/format-number";
import { dailyCardSelector } from "../../../slices/daily-card/slice";

// constants
const CATEGORIES = [
  {
    name: "Electronics",
    slug: "electronics"
  },
  {
    name: "Fashion",
    slug: "fashion"
  },
  {
    name: "Vehicle",
    slug: "vehicle"
  },
  {
    name: "Real Estate",
    slug: "real-estate"
  }
];

// functions
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
};

export const Mine = () => {
  const xp = useSelector(xpSelector);
  const cards = useSelector(cardsSelector);
  const selectedIcon = useSelector((state: any) => state.selectedIcon.icon);
  const notification = useSelector(notificationSelector);
  const { status: cardStatus } = useSelector(dailyCardSelector);

  const isXpLoading = useSelector(
    (state: RootState) => state["xp/api"].queries["xp({})"].status
  );
  const isCardsLoading = useSelector(
    (state: RootState) => state["card/api"].queries["cards({})"].status
  );

  //render when cards updated
  useEffect(() => {
    handleIconClick(selectedIcon);
  }, [isCardsLoading, isXpLoading]);

  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState([] as any[]);

  const handleIconClick = (icon: string) => {
    setSelectedCategory(
      cards.filter((item: any) => {
        return item.info.category === icon;
      })
    );
    dispatch(setIcon(icon));
  };

  const { status, earnedXp } = useSelector(
    (state: RootState) => state["stack/app"]
  );

  useEffect(() => {
    if (!status.isWaiting) {
      document.body.style.backgroundColor = "#FF92FF";
    }
  }, [status.isWaiting]);

  const startSelling = async () => {
    dispatch(start.initiate({}));
  };

  const claimSelling = async () => {
    dispatch(stackClaim.initiate({}));
  };

  const getMarginLeft = (xp: number) => {
    const xpString = Math.round(xp).toLocaleString();
    const xpLength = xpString.replace(/\./g, "").length;
    return `${xpLength * 13}px`;
  };

  return (
    <section className="mine-section">
      <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
        <h6 className="cool-background p-2 m-0" style={{ height: "30px" }}>
          <img className="mine-logo me-1" src={EarningLogo} alt="" />{" "}
          {formatNumber(Math.round(xp.earn))}/h
        </h6>

        <h6
          className="cool-background p-2 m-0"
          style={{
            width: "32%",
            height: "30px"
          }}
        >
          <img className="mine-logo me-1" src={remainTime} alt="" />{" "}
          {status.isWaiting ? `0${formatTime(status.remainTime)}` : "04:00:00"}
        </h6>
      </div>
      <div className="mt-3">
        {status.canClaim ? (
          <h4
            className="mine-start started m-0"
            style={{
              background: "black"
            }}
            onClick={claimSelling}
          >
            {/* <div className="fill-animation"></div> */}
            <div
              className="p-1"
              style={{
                zIndex: 2
              }}
            >
              Claim
            </div>
            <div
              className="logo-container"
              style={{ marginRight: getMarginLeft(earnedXp) }}
            >
              <Image src={logo} alt="" className="earn-logo earned-xp" />
            </div>

            <div
              className="d-flex align-items-center position-absolute"
              style={{
                right: 0,
                zIndex: 2
              }}
            >
              <p
                className="earned-amount"
                style={{ marginLeft: getMarginLeft(earnedXp) }}
              >
                {Math.round(earnedXp).toLocaleString()}
              </p>
            </div>
          </h4>
        ) : !status.isWaiting ? (
          <h4 className="mine-start m-0" onClick={startSelling}>
            Start Selling
          </h4>
        ) : (
          <h4 className="mine-start started m-0 d-flex justify-content-between align-items-center position-relative">
            <div className="fill-animation"></div>
            <div
              className="p-1"
              style={{
                zIndex: 2
              }}
            >
              Sales Started
            </div>
            <div
              className="logo-container"
              style={{ marginRight: getMarginLeft(earnedXp) }}
            >
              <Image src={logo} alt="" className="earn-logo earned-xp" />
            </div>

            <div
              className="d-flex align-items-center position-absolute"
              style={{
                right: 0,
                zIndex: 2
              }}
            >
              <p
                className="earned-amount"
                style={{ marginLeft: getMarginLeft(earnedXp) }}
              >
                {Math.round(earnedXp).toLocaleString()}
              </p>
            </div>
          </h4>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center border-bottom">
        <div className="my-5 d-flex align-items-center">
          <Image src={logo} alt="" className="earn-logo me-2" />
          <p className="earn-amount">{Math.round(xp.point).toLocaleString()}</p>
        </div>
      </div>

      <div className="products-nav position-sticky top-0 z-3 d-flex align-items-center justify-content-center mt-3">
        <div className="d-flex justify-content-between align-items-center mine">
          {CATEGORIES.map(({ name, slug }, index) => (
            <div
              className={`mine-items text-center  ${
                selectedIcon === slug ? "selected-icon" : ""
              }`}
              style={{ width: "25%" }}
              onClick={() => {
                handleIconClick(slug);
              }}
              key={index}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="products-container">
        {selectedCategory.map((product, idx) => (
          <Product product={product} key={idx}></Product>
        ))}
      </div>

      <SlideUpPanel show={notification} onClose={() => {}}>
        {
          <>
            <div className="d-flex align-items-center w-100">
              <h5
                className="my-3 flex-grow-1 text-center"
                style={{ marginRight: "-25px" }}
              >
                Lucky Item
              </h5>
              <span
                onClick={() => {
                  dispatch(close());
                }}
                className="close cursor-pointer d-flex align-items-center justify-content-end"
              >
                <i className="bi bi-x-circle"></i>
              </span>
            </div>
            <p className="w-75 m-0">
              Congratulations, you won 2,000,000 Coins by finding the product of
              the day.
            </p>
            <div className="lucky-Item notification my-3">
              <Image
                src={cardStatus.card.image}
                alt={`Lucky Item`}
                className="luckyItem-image"
              />
            </div>
            <div>
              <button
                className="claim-button mt-3"
                onClick={() => {
                  dispatch(close());
                  setTimeout(() => {
                    dispatch(setMenu("daily"));
                  }, 300);
                }}
              >
                Claim
              </button>
            </div>
          </>
        }
      </SlideUpPanel>
    </section>
  );
};
