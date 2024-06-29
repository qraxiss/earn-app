import React from "react";
import { Button } from "react-bootstrap";

interface SlideUpPanelProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  activeTask?: string | null; // Add activeTask prop
}

const SlideUpPanel: React.FC<SlideUpPanelProps> = ({
  show,
  onClose,
  children,
  activeTask,
}) => {
  let panelClass = "slide-up-panel";

  if (activeTask === "login") {
    panelClass += " daily-login";
  } else if (activeTask === "luckyItem") {
    panelClass += " lucky-item";
  } else if (activeTask === "triviaQuest") {
    panelClass += " trivia-quest";
  }

  return (
    <div className={`${panelClass} ${show ? "show" : ""}`}>
      <div className="panel-body text-center d-flex flex-column align-items-center">
        {children}
      </div>
    </div>
  );
};

export default SlideUpPanel;
