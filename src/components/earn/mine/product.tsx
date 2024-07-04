import { Image } from "react-bootstrap";
import EarningLogo from "../../../assets/images/EarningLogo.png";
import Lock from "../../../assets/images/lock.png";
import logo from "../../../assets/images/icon.svg";

import { buyCardAsync, upgradeCardAsync } from "../../../slices/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "k";
  } else {
    return num.toString();
  }
};

export default function Product({
  product: { info, status, upgrade, buy },
}: any) {
  const dispatch: AppDispatch = useDispatch();

  if (!status.buyed) {
    return (
      <div
        className={`d-flex justify-content-center align-items-center flex-column product product-hover`}
        key={info.name}
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
            className={`product-image ${status.locked ? "opacity-50" : ""}`}
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
            onClick={() => {
              dispatch(buyCardAsync({ cardId: info.id }));
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
  } else {
    return (
      <div
        className={`d-flex justify-content-center align-items-center flex-column product product-hover`}
        key={info.name}
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
            onClick={() => {
              dispatch(upgradeCardAsync({ cardId: info.id }));
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
  }
}
