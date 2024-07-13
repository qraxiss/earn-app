import { Image } from "react-bootstrap";
import EarningLogo from "../../../assets/images/EarningLogo.png";
import Lock from "../../../assets/images/lock.png";
import logo from "../../../assets/images/icon.svg";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { buy as buyApi, upgrade as upgradeApi } from "../../../slices/card/api";
import formatNumber from "../../../helpers/format-number";
import { useRef } from "react";

export default function Product({
  product: { info, status, upgrade, buy },
}: any) {
  if (!status.buyed) {
    return <Buy status={status} buy={buy} info={info}></Buy>;
  } else {
    return <Upgrade status={status} upgrade={upgrade} info={info}></Upgrade>;
  }
}

const Buy = ({ info, status, buy }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const ref = useRef(null);
  const onClick = () => {
    const div = ref.current; // corresponding DOM node
    if (div) {
      console.log(div);
      let className = (div as any).className as string;

      if (className.includes("product-hover")) {
        className = className.replace("product-hover", "");
      } else {
        className += className + " product-hover";
      }
      console.log(className);
      (div as any).className = className;
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column product`}
      key={info.name}
      ref={ref}
      onClick={onClick}
    >
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <p className="product-heading">{info.name}</p>
        <div
          className={`pwr d-flex justify-content-between align-items-center gap-3 ${
            status.locked ? "opacity-50" : ""
          }`}
        >
          <h6 className="">PWR {status.level}</h6>
          <h6 className="d-flex justify-content-center align-items-center">
            <img className="earning-logo me-1" src={EarningLogo} alt="" />
            {formatNumber(info.totalProfit)} /h
          </h6>
        </div>
        <Image
          src={info.image}
          alt={info.name}
          className={` product-image ${status.locked ? "opacity-50" : ""}`}
        />

        <div className="image-container">
          <h6 className="hourly-income">Hourly Rental Income</h6>
          <h6 className="d-flex justify-content-center align-items-center">
            <img className="earning-logo me-1" src={EarningLogo} alt="" />+{" "}
            {formatNumber(buy.profit)} /h
          </h6>
        </div>

        <div
          className={`buy-button d-flex flex-column justify-content-center align-items-center`}
          onClick={async (e) => {
            e.stopPropagation();
            await dispatch(buyApi.initiate({ cardId: info.id }));
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <h5 className="buy-heading">BUY</h5>
            {status.locked ? <Image src={Lock} className="buy-lock" /> : ""}
          </div>
          <div
            className={`m-1 d-flex justify-content-center align-items-center ${
              status.locked ? "price-container" : ""
            }`}
          >
            <img className="dollar me-2" src={logo} alt="" />
            <h4 className="m-0">{formatNumber(buy.price)}</h4>
          </div>
        </div>
      </div>

      {status.locked && (
        <div className="lock">
          <Image src={Lock} />
          <h5>Invite +{status.remainInvites} more friends</h5>
        </div>
      )}
    </div>
  );
};

const Upgrade = ({ info, status, upgrade }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const ref = useRef(null);
  const onClick = () => {
    const div = ref.current; // corresponding DOM node
    if (div) {
      console.log(div);
      let className = (div as any).className as string;

      if (className.includes("product-hover")) {
        className = className.replace("product-hover", "");
      } else {
        className += className + " product-hover";
      }
      console.log(className);
      (div as any).className = className;
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column product`}
      key={info.name}
      ref={ref}
      onClick={onClick}
    >
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <p className="product-heading">{info.name}</p>
        <div
          className={`pwr d-flex justify-content-between align-items-center gap-3 ${
            status.locked ? "opacity-50" : ""
          }`}
        >
          <h6 className="">PWR {status.level}</h6>
          <h6 className="d-flex justify-content-center align-items-center">
            <img className="earning-logo me-1" src={EarningLogo} alt="" />
            {formatNumber(info.totalProfit)} /h
          </h6>
        </div>
        <Image src={info.image} alt={info.name} className={`product-image`} />

        <div className="image-container">
          <h6 className="hourly-income">Hourly Rental Income</h6>
          <h6 className="d-flex justify-content-center align-items-center">
            <img className="earning-logo me-1" src={EarningLogo} alt="" />+{" "}
            {formatNumber(upgrade.profit)} /h
          </h6>
        </div>

        <div
          className={`buy-button d-flex flex-column justify-content-center align-items-center`}
          onClick={async (e) => {
            e.stopPropagation();
            await dispatch(upgradeApi.initiate({ cardId: info.id }));
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <h5 className="buy-heading">UPGRADE</h5>
            {status.locked ? <Image src={Lock} className="buy-lock" /> : ""}
          </div>
          <div
            className={`m-1 d-flex justify-content-center align-items-center`}
          >
            <img className="dollar me-2" src={logo} alt="" />
            <h4 className="m-0">{formatNumber(upgrade.price)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
