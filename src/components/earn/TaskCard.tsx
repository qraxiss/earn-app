import React from "react";
import GreenTick from "../../assets/images/greentick.png";
import DaysRemoveBg from "../../assets/images/days-r-bg.png";

interface TaskCardProps {
  card: {
    id: string;
    heading: string;
    img: string;
    resetTime: string;
    completed: boolean;
  };
  status: {
    canClaim: boolean;
    remainTimeForClaim?: number;
  };
  isPanelOpen: boolean;
  handleClosePanel: (task: string | null) => void;
  formatTime: (seconds: number) => string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  card,
  status,
  isPanelOpen,
  handleClosePanel,
  formatTime
}) => {
  return (
    <div
      onClick={() => handleClosePanel(card.id)}
      className={`daily-card ${
        status.canClaim ? "completed" : "not-completed"
      } ${isPanelOpen ? "panel-open" : ""}`}
    >
      <h6 className="m-0">{card.heading}</h6>
      <img
        src={card.img}
        style={
          card.img === DaysRemoveBg
            ? { width: "90px", height: "90px", marginTop: "-14px" }
            : {}
        }
        alt=""
      />
      <h6>
        {status.canClaim
          ? "Claim"
          : card.id == "card-claim"
          ? status.remainTimeForClaim
            ? formatTime(status.remainTimeForClaim)
            : "You have to find!"
          : formatTime(status.remainTimeForClaim ?? 0)}
      </h6>
      {!status.canClaim ? (
        <span className="dot">
          <img className="w-100" src={GreenTick} alt="" />
        </span>
      ) : (
        <span className="white-dot"></span>
      )}
    </div>
  );
};

export default TaskCard;
