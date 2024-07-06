//react
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";

//redux
import { start, claim, status as fetchStatus } from "../../../slices/api";
import { setIcon } from "../../../slices/selected-icon/slice";
import { cardsSelector } from "../../../slices/card/slice";
import { setPoint, xpSelector } from "../../../slices/xp/slice";
import { AppDispatch, RootState, store } from "../../../store";
import { setRemainTime, setPastTime } from "../../../slices/stack/slice";

//images
import logo from "../../../assets/images/icon.svg";
import EarningLogo from "../../../assets/images/EarningLogo.png";

//components
import Product from "./product";

// constants
const CATEGORIES = [
  {
    name: "Electronics",
    slug: "electronics",
  },
  {
    name: "Fashion",
    slug: "fashion",
  },
  {
    name: "Vehicle",
    slug: "vehicle",
  },
  {
    name: "Real Estate",
    slug: "real-estate",
  },
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

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "k";
    } else {
      return num.toString();
    }
  };

  const handleIconClick = (icon: string) => {
    setSelectedCategory(
      cards.filter((item: any) => {
        return item.info.category === icon;
      })
    );
    dispatch(setIcon(icon));
  };

  const status = useSelector((state: RootState) => state["stack/app"].status);

  useEffect(() => {
    if (status.isWaiting) {
      setRemainTime(status.remainTime);
    } else {
      document.body.style.backgroundColor = "#FF92FF";
    }
  }, [status.isWaiting]);

  const startSelling = async () => {
    dispatch(start.initiate({}));
  };

  const claimSelling = async () => {
    dispatch(claim.initiate({}));
  };

  return (
    <section className="mine-section">
      <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
        <h4 className="m-0 d-flex align-items-center">
          <img className="mine-logo me-2" src={EarningLogo} alt="" />{" "}
          {formatNumber(Math.round(xp.earn))}/h
        </h4>
        {status.isWaiting ? (
          <h4 className="m-0">{formatTime(status.remainTime)}</h4>
        ) : (
          <h4 className="m-0">04:00:00</h4>
        )}
      </div>
      <div className="mt-3">
        {status.canClaim ? (
          <h4 className="mine-start started m-0" onClick={claimSelling}>
            <div className="fill-animation"></div>
            Claim
          </h4>
        ) : !status.isWaiting ? (
          <h4 className="mine-start m-0" onClick={startSelling}>
            Start Selling
          </h4>
        ) : (
          <h4 className="mine-start started m-0">
            <div className="fill-animation"></div>
            Sales Started
          </h4>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center border-bottom">
        <div className="my-5 d-flex align-items-center">
          <Image src={logo} alt="" className="earn-logo me-2" />
          <p className="earn-amount">{Math.round(xp.point)}</p>
        </div>
      </div>

      <div className="products-nav position-sticky top-0 z-3 d-flex align-items-center justify-content-center mt-3">
        <div className="d-flex justify-content-between align-items-center mine">
          {CATEGORIES.map(({ name, slug }) => (
            <div
              className={`mine-items text-center ${
                selectedIcon === slug ? "selected-icon" : ""
              }`}
              style={{ width: "25%" }}
              onClick={() => {
                handleIconClick(slug);
              }}
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
    </section>
  );
};
