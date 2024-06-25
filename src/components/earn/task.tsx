import React, { useState } from "react";
import logo from "../../assets/images/icon.svg";
import Instagram from "../../assets/images/Instagram.png";
import Telegram from "../../assets/images/telegram.png";
import Twitter from "../../assets/images/twitter.png";
import Youtube from "../../assets/images/youtube.png";
import BlueTick from "../../assets/images/bluetick.png";
import { Image } from "react-bootstrap";

export const Task = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Subscribe to Shopcek Telegram",
      image: Telegram,
      reward: "+10,000",
      completed: true,
    },
    {
      id: 2,
      name: "Follow Shopcek On X ",
      image: Twitter,
      reward: "+10,000",
      completed: false,
    },
    {
      id: 3,
      name: "Join Shopcek Instagram ",
      image: Instagram,
      reward: "+10,000",
      completed: true,
    },
    {
      id: 4,
      name: "Follow Shopcek on YouTube",
      image: Youtube,
      reward: "+10,000",
      completed: false,
    },
  ]);

  const handleTaskCompletion = (id: any) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <section className="task-section">
      <div className="task-container mt-3 mb-5">
        <Image src={logo} alt="Task" className="task-image" />
      </div>
      <p className="heading my-3">Earn More Coins</p>
      <div className="task d-flex flex-column align-items-center">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="d-flex justify-content-between align-items-center follow-container my-1 p-2"
            onClick={() => handleTaskCompletion(task.id)}
          >
            <div className="d-flex align-items-center">
              <div>
                <Image
                  src={task.image}
                  alt={task.name}
                  className={`follow-images ${
                    task.name === "Follow Shopcek On X " ? "x-image" : ""
                  }`}
                />
              </div>
              <div className=" px-1 ">
                <p className="m-0 task-heading">{task.name}</p>
                <div className="d-flex align-items-center">
                  <img src={logo} alt="" className="logo me-2" />
                  <h4 className="reward m-0">{task.reward}</h4>
                </div>
              </div>
            </div>
            <div>
              {task.completed && (
                <Image
                  src={BlueTick}
                  alt="Completed"
                  className="completed-tick"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
