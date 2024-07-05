import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Daily, Friends, Mine, Name, Task } from "../../components/earn";
import logo from "../../assets/images/icon.svg";
import DaysImage from "../../assets/images/daysLogo.png";
import FrensImage from "../../assets/images/frensLogo.png";
import MineImage from "../../assets/images/mine.png";
import NameImage from "../../assets/images/name.webp";
import TaskImage from "../../assets/images/task.png";
import Rank from "../../assets/images/RankLogo.png";
import Store from "../../assets/images/store.png";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../slices/selected-menu/slice";
import { AppDispatch } from "../../store/index";

export const Earn: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState("mine");
  const selectedMenu = useSelector((state: any) => state.selectedMenu.menu);
  const dispatch = useDispatch<AppDispatch>();
  const [isMobile, setIsMobile] = useState(false);

  const handleIconClick = (icon: string) => {
    dispatch(setMenu(icon));
    setSelectedComponent(icon);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "mine":
        return <Mine />;
      case "daily":
        return <Daily />;
      case "frens":
        return <Friends />;
      case "name":
        return <Name />;
      case "task":
        return <Task />;
      default:
        return <Mine />;
    }
  };

  return (
    <section className="section header">
      {isMobile ? (
        <>
          {/* <div className="d-flex justify-content-between align-items-center header-container p-2">
            <h6 className="m-0">Cancel</h6>
            <div className="d-flex flex-column align-items-center">
              <p className="heading">Shopcek</p>
              <h6 className="bot">bot</h6>
            </div>
            <div className="icon-container">
              <i className="bi bi-three-dots custom-icon"></i>
            </div>
          </div> */}

          <Container fluid className="container-custom">
            {renderSelectedComponent()}
          </Container>

          <div className="d-flex align-items-center justify-content-center pt-5">
            <div className="d-flex justify-content-between align-items-center navbar-mobile">
              <div className="flex-fill text-center">
                <span
                  className={`navbar-items-mobile ${selectedMenu === "daily" ? "selected-icon" : ""}`}
                  onClick={() => handleIconClick("daily")}
                >
                  <img src={DaysImage} alt="" className="menu-logo" />
                  Daily
                </span>
              </div>
              <div className="flex-fill text-center">
                <span
                  className={`navbar-items-mobile ${selectedMenu === "frens" ? "selected-icon" : ""}`}
                  onClick={() => handleIconClick("frens")}
                >
                  <img src={FrensImage} alt="" className="menu-logo" />
                  Frens
                </span>
              </div>
              <div className="flex-fill text-center">
                <span
                  className={`navbar-items-mobile ${selectedMenu === "mine" ? "selected-icon" : ""}`}
                  onClick={() => handleIconClick("mine")}
                >
                  <img src={Store} alt="" className="menu-logo" />
                  My Store
                </span>
              </div>
              <div className="flex-fill text-center">
                <span
                  className={`navbar-items-mobile ${selectedMenu === "task" ? "selected-icon" : ""}`}
                  onClick={() => handleIconClick("task")}
                >
                  <img src={TaskImage} alt="" className="menu-logo" />
                  Task
                </span>
              </div>
              <div className="flex-fill text-center">
                <span
                  className={`navbar-items-mobile ${selectedMenu === "name" ? "selected-icon" : ""}`}
                  onClick={() => handleIconClick("name")}
                >
                  <img src={Rank} alt="" className="menu-logo" />
                  Rank
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Container fluid className="container-custom pt-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={logo} alt="" className="logo me-2" />
              <p className="heading">235.15K</p>
            </div>
            <div className="d-flex align-items-center">
              <p className="heading">0x95...889</p>
              <i className="bi bi-caret-down-fill fs-24"></i>
            </div>
          </div>

          {renderSelectedComponent()}

          <div className="d-flex align-items-center justify-content-center py-5">
            <div className="d-flex justify-content-between align-items-center navbar">
              <span
                className={`navbar-items ${
                  selectedMenu === "mine" ? "selected-icon" : ""
                }`}
                onClick={() => handleIconClick("mine")}
              >
                <img src={MineImage} alt="" className="menu-logo" />
                Mine
              </span>
              <span
                className={`navbar-items ${
                  selectedMenu === "daily" ? "selected-icon" : ""
                }`}
                onClick={() => handleIconClick("daily")}
              >
                <img src={DaysImage} alt="" className="menu-logo" />
                Daily
              </span>
              <span
                className={`navbar-items ${
                  selectedMenu === "frens" ? "selected-icon" : ""
                }`}
                onClick={() => handleIconClick("frens")}
              >
                <img src={FrensImage} alt="" className="menu-logo" />
                Frens
              </span>
              <span
                className={`navbar-items ${
                  selectedMenu === "name" ? "selected-icon" : ""
                }`}
                onClick={() => handleIconClick("name")}
              >
                <img src={NameImage} alt="" className="menu-logo" />
                Name
              </span>
              <span
                className={`navbar-items ${
                  selectedMenu === "task" ? "selected-icon" : ""
                }`}
                onClick={() => handleIconClick("task")}
              >
                <img src={TaskImage} alt="" className="menu-logo" />
                Task
              </span>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
};
