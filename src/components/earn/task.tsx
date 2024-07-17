import React, { useState } from "react";
import logo from "../../assets/images/ShopcekLogo.png";
import BlueTick from "../../assets/images/bluetick.png";
import { Image } from "react-bootstrap";
import { taskSelector } from "../../slices/task/slice";
import { useSelector, useDispatch } from "react-redux";
import { taskClaim } from "../../slices/task/api";
import { AppDispatch } from "../../store";
import DaysRemoveBg from "../../assets/images/days-r-bg.png";
import Clock from "../../assets/images/clock.png";
import Tasks from "../../assets/images/tasks.png";

import ShopcekLogo from "../../assets/images/ShopcekLogo.png";

import { Daily } from "./daily";

// Define the Task type
interface Task {
  id: string;
  name: string;
  image: string;
  reward: string;
  status: "go" | "claim";
  completed: boolean;
  claimed: boolean;
}

export const Task: React.FC = () => {
  // const [tasks, setTasks] = useState<Task[]>([
  //   {
  //     id: 1,
  //     name: "Subscribe to Shopcek Telegram",
  //     image: Telegram,
  //     reward: "+10,000",
  //     status: "go", // Initially set to "go"
  //     completed: true,
  //     claimed: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Follow Shopcek On X ",
  //     image: Twitter,
  //     reward: "+10,000",
  //     status: "go", // Initially set to "go"
  //     completed: false,
  //     claimed: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Join Shopcek Instagram ",
  //     image: Instagram,
  //     reward: "+10,000",
  //     status: "go", // Initially set to "go"
  //     completed: true,
  //     claimed: false,
  //   },
  //   {
  //     id: 4,
  //     name: "Follow Shopcek on YouTube",
  //     image: Youtube,
  //     reward: "+10,000",
  //     status: "go", // Initially set to "go"
  //     completed: false,
  //     claimed: false,
  //   },
  // ]);

  const tasks = useSelector(taskSelector);
  const dispatch: AppDispatch = useDispatch();

  const [ids, setIds] = useState<any[]>([]);

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleClosePanel = (task: string | null = null) => {
    setIsPanelOpen(!isPanelOpen);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const dailyData = [
    {
      id: "login",
      heading: "Daily Log-in",
      img: DaysRemoveBg,
      resetTime: "00:00",
      completed: true,
    },
    {
      id: "card-claim",
      heading: "Lucky Item",
      img: Clock,
      resetTime: "18:00",
      completed: false,
    },
  ];

  return (
    <section className="task-section">
      <div className="task-container mt-4 mb-5">
        <Image src={Tasks} alt="Task" className="task-image" />
      </div>

      <Daily></Daily>

      {/* TASK CARD COMPONENTİ BURAYA GELECEK */}
      {/* <div className="daily-task-cards">
        {dailyData.map((card) => (
          <TaskCard
            key={card.id}
            card={card}
            status={{
              canClaim: card.completed,
              remainTimeForClaim: 0, // Replace with actual time remaining logic if needed
            }}
            isPanelOpen={isPanelOpen}
            handleClosePanel={handleClosePanel}
            formatTime={formatTime}
          />
        ))}
      </div> */}

      <p className="heading my-3">EARN MORE COINS</p>
      <div className="task d-flex flex-column align-items-center">
        {tasks.map(({ task, isClaimed }: any) => (
          <div
            key={task.id}
            onClick={() => {
              setIds([...ids, task.id]);
              setTimeout(async () => {
                await dispatch(taskClaim.initiate({ taskId: task.id }));
                setIds(ids.filter((id) => task.id !== id));
              }, 15000);
              window.open(task.link, "_blank");
            }}
            className="d-flex justify-content-between align-items-center follow-container my-1 p-2"
          >
            <div className="d-flex align-items-center">
              <div>
                <Image
                  src={task.icon}
                  alt={task.title}
                  style={
                    task.title === "Follow Shopcek On X"
                      ? {
                          width: "70px",
                          height: "100px",
                          marginLeft: "-5px",
                          marginRight: "-4px",
                        }
                      : {}
                  }
                  className={`follow-images ${
                    task.title === "Follow Shopcek On X " ? "x-image" : ""
                  }`}
                />
              </div>
              <div className=" px-1 ">
                <p className="m-0 task-heading">{task.title}</p>
                <div className="d-flex align-items-center">
                  <img
                    src={ShopcekLogo}
                    alt=""
                    className="logo m-0"
                    style={{
                      width: "28px",
                    }}
                  />
                  <h4 className="reward m-0">{task.reward.toLocaleString()}</h4>
                </div>
              </div>
            </div>
            <div className="tick-container">
              {isClaimed ? (
                <Image
                  src={BlueTick}
                  alt="Completed"
                  className="completed-tick"
                />
              ) : (
                <button
                  disabled={ids.find((id) => task.id === id)}
                  className="claim btn"
                >
                  {ids.find((id) => task.id === id) ? (
                    <div
                      className="spinner-border"
                      style={{
                        width: "18px",
                        height: "18px",
                      }}
                      role="status"
                    ></div>
                  ) : (
                    "Go"
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
