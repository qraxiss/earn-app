import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Daily, Friends, Mine, Name, Task } from "../../components/earn";
import logo from "../../assets/images/icon.svg";
import DaysImage from "../../assets/images/days.png";
import FrensImage from "../../assets/images/frens.png";
import MineImage from "../../assets/images/mine.png";
import NameImage from "../../assets/images/name.webp";
import TaskImage from "../../assets/images/task.png";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../slices/selected-menu/slice";
import { AppDispatch } from "../../store/index";

export const Earn: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState("mine");
  const selectedMenu = useSelector((state: any) => state.selectedMenu.menu);
  const dispatch = useDispatch<AppDispatch>();

  const handleIconClick = (icon: string) => {
    dispatch(setMenu(icon));
    setSelectedComponent(icon);
  };

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
    <section className="section pt-5 header">
      <Container fluid className="container-custom">
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
    </section>
  );
};
