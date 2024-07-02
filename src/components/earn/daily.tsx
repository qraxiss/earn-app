import React, { useState, useEffect, MouseEvent } from "react";
import Days from "../../assets/images/days.png";
import Clock from "../../assets/images/clock.png";
import Question from "../../assets/images/Question.png";
import GreenTick from "../../assets/images/greentick.png";
import Shopcek from "../../assets/images/icon.svg";
import LuckyItem from "../../assets/images/Luckyitem.png";
import { Image } from "react-bootstrap";
import SlideUpPanel from "../TaskSlider";

interface Task {
  id: string;
  heading: string;
  img: string;
  resetTime: string;
  completed: boolean;
  startTime?: number; // New property to store start time
  questions?: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const data = [
  { title: "Day 1", image: Shopcek, points: "20K" },
  { title: "Day 2", image: Shopcek, points: "25K" },
  { title: "Day 3", image: Shopcek, points: "30K" },
  { title: "Day 4", image: Shopcek, points: "40K" },
  { title: "Day 5", image: Shopcek, points: "100K" },
  { title: "Day 6", image: Shopcek, points: "200K" },
  { title: "Day 7", image: Shopcek, points: "500K" },
  { title: "Day 8", image: Shopcek, points: "1M" },
  { title: "Day 9", image: Shopcek, points: "5M" },
];

const dailyData = [
  {
    id: "login",
    heading: "Daily Log-in",
    img: Days,
    resetTime: "00:00",
    completed: true,
  },
  {
    id: "luckyItem",
    heading: "Lucky Item",
    img: Clock,
    resetTime: "18:00",
    completed: false,
  },
  {
    id: "triviaQuest",
    heading: "Trivia Quest",
    img: Question,
    resetTime: "12:00",
    completed: false,
    questions: [
      {
        question: "What is the name of the smallest unit of Bitcoin?",
        options: ["satoshi", "bit", "hodl", "coin"],
        correctAnswer: "satoshi",
      },
    ],
  },
];

const calculateTimeRemaining = (resetTime: string) => {
  const now = new Date();
  const [hours, minutes] = resetTime.split(":");
  const reset = new Date(now);
  reset.setUTCHours(Number(hours), Number(minutes), 0, 0);

  if (now > reset) {
    reset.setUTCDate(reset.getUTCDate() + 1); // Set for the next day if past reset time
  }

  const diff = reset.getTime() - now.getTime();
  const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hoursRemaining}: ${minutesRemaining}: ${secondsRemaining}`;
};

export const Daily = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tasks, setTasks] = useState<Task[]>(dailyData);
  const [claim, setClaim] = useState(false);

  useEffect(() => {
    const sessionStartTime = new Date().getTime();
    localStorage.setItem("sessionStartTime", sessionStartTime.toString());
  }, []);

  const getSessionStartTime = (): number | null => {
    const storedSessionStartTime = localStorage.getItem("sessionStartTime");
    if (storedSessionStartTime) {
      return parseInt(storedSessionStartTime, 10);
    }
    return null;
  };

  const handleClosePanel = (task: string | null = null) => {
    setIsPanelOpen(!isPanelOpen);
    setActiveTask(task);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const triviaQuest = dailyData.find((task) => task.id === "triviaQuest");
    if (
      triviaQuest?.questions &&
      currentQuestionIndex < triviaQuest.questions.length - 1
    ) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }, 500); // Delay to show the selected answer for a short time
    } else {
      // Handle completion of all questions
    }
  };

  const handleClaim = () => {
    setClaim(true);
    setTimeout(() => {
      setClaim(false);
    }, calculateRemainingTimeUntilReset());
  };

  const calculateRemainingTimeUntilReset = () => {
    const now = new Date();
    const reset = new Date(now);
    reset.setUTCHours(0, 0, 0, 0);

    if (now > reset) {
      reset.setUTCDate(reset.getUTCDate() + 1); // Set for the next day if past reset time
    }

    return reset.getTime() - now.getTime();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionStartTime = getSessionStartTime();
      if (!sessionStartTime) return;

      const now = new Date().getTime();

      const updatedTasks = tasks.map((task) => {
        const startTime = task.startTime || now; // Use current time if startTime is not set
        const taskElapsedTime = now - startTime;

        const resetTime = new Date(now);
        const [hours, minutes] = task.resetTime.split(":");
        resetTime.setUTCHours(Number(hours), Number(minutes), 0, 0);

        const resetTimeTimestamp = resetTime.getTime(); // Convert resetTime to timestamp

        if (
          !task.completed &&
          taskElapsedTime >= 0 &&
          now >= resetTimeTimestamp
        ) {
          return { ...task, completed: true };
        }

        return { ...task, startTime }; // Update startTime to maintain state
      });

      setTasks(updatedTasks);
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

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

  return (
    <section className="days-section">
      <div className="weekdays mt-3 mb-5">
        <Image src={Days} alt="weekdays" className="weekdays-image" />
      </div>
      <p className="heading my-3">DAILY TASKS</p>
      {isMobile ? (
        <>
          <div className="d-flex justify-content-between w-100">
            {tasks.map((card, index) => (
              <div
                key={index}
                onClick={() => handleClosePanel(card.id)}
                className={`daily-card ${
                  card.completed ? "completed" : "not-completed"
                } ${isPanelOpen ? "panel-open" : ""}`}
              >
                <h6 className="m-0">{card.heading}</h6>
                <img src={card.img} alt="" />
                <h6>{calculateTimeRemaining(card.resetTime)}</h6>
                {card.completed ? (
                  <span className="dot">
                    <img className="w-100" src={GreenTick} alt="" />
                  </span>
                ) : (
                  <span className="white-dot"></span>
                )}
              </div>
            ))}
            <SlideUpPanel
              show={isPanelOpen}
              onClose={() => handleClosePanel(null)}
              activeTask={activeTask}
            >
              {activeTask === "login" && (
                <>
                  <div className="d-flex align-items-center w-100">
                    <h5
                      className="my-3 flex-grow-1 text-center"
                      style={{ marginRight: "-25px" }}
                    >
                      Daily Log-In
                    </h5>
                    <span
                      onClick={() => handleClosePanel(null)}
                      className="close cursor-pointer d-flex align-items-center justify-content-end"
                    >
                      <i className="bi bi-x-circle"></i>
                    </span>
                  </div>{" "}
                  <p className="w-75 ">
                    Complete your daily logins & Boost your earnings!
                  </p>
                  <div className="days-container my-2">
                    <div className="days">
                      {data.map((item, index) => (
                        <div
                          key={index}
                          className={`days-item ${
                            index === activeDay - 1 ? "active" : ""
                          } ${index === activeDay ? "next-active" : ""}`}
                        >
                          <div>
                            <p className="days-title">{item.title}</p>
                          </div>
                          <Image
                            src={item.image}
                            alt={`${item.title} reward`}
                            className="days-logo"
                          />
                          <h4 className="heading">{item.points}</h4>
                        </div>
                      ))}
                      <div>
                        <button
                          className="claim-button mt-3"
                          onClick={handleClaim}
                        >
                          {claim ? "Come back tomorrow!" : "Claim"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTask === "luckyItem" && (
                <>
                  <div className="d-flex align-items-center w-100">
                    <h5
                      className="my-3 flex-grow-1 text-center"
                      style={{ marginRight: "-25px" }}
                    >
                      Lucky Item
                    </h5>
                    <span
                      onClick={() => handleClosePanel(null)}
                      className="close cursor-pointer d-flex align-items-center justify-content-end"
                    >
                      <i className="bi bi-x-circle"></i>
                    </span>
                  </div>
                  <p className="w-75 m-0">
                    Find the Lucky Item of the day & Earn extra coins!
                  </p>
                  <div className="lucky-Item my-3">
                    <Image
                      src={LuckyItem}
                      alt={`Lucky Item`}
                      className="luckyItem-image"
                    />
                  </div>
                  <div className="my-3 d-flex align-items-center">
                    <Image src={Shopcek} alt="" className="earn-logo me-2" />
                    <h1 className="m-0">+5.000.000</h1>
                  </div>
                  <div>
                    <button className="claim-button mt-3" onClick={handleClaim}>
                      {claim ? "Come back tomorrow!" : "Claim"}
                    </button>
                  </div>
                </>
              )}
              {activeTask === "triviaQuest" && (
                <>
                  <div className="d-flex align-items-center w-100">
                    <h5
                      className="my-3 flex-grow-1 text-center"
                      style={{ marginRight: "-25px" }}
                    >
                      Trivia Quest
                    </h5>
                    <span
                      onClick={() => handleClosePanel(null)}
                      className="close cursor-pointer d-flex align-items-center justify-content-end"
                    >
                      <i className="bi bi-x-circle"></i>
                    </span>
                  </div>{" "}
                  <p className="w-75 m-0">
                    Take on today's trivia and earn rewards!
                  </p>
                  <div className="trivia-question my-3">
                    {dailyData[2]?.questions?.[currentQuestionIndex] && (
                      <div className="question-container">
                        <h6 className="my-3">
                          {
                            dailyData[2].questions[currentQuestionIndex]
                              .question
                          }
                        </h6>
                        <div className="options my-3">
                          {dailyData[2].questions[
                            currentQuestionIndex
                          ].options.map((option, idx) => (
                            <div
                              key={idx}
                              className={`option-button ${
                                selectedAnswer === option ? "selected" : ""
                              }`}
                              onClick={() => handleAnswerSelect(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="my-2 d-flex align-items-center">
                    <Image src={Shopcek} alt="" className="earn-logo me-2" />
                    <h1 className="m-0">+2.000.000</h1>
                  </div>
                  <div>
                    <button className="claim-button mt-3" onClick={handleClaim}>
                      {claim ? "Come back tomorrow!" : "Claim"}
                    </button>
                  </div>
                </>
              )}
            </SlideUpPanel>
          </div>
        </>
      ) : (
        <>
          <div className="days-container my-3">
            <div className="days">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`days-item ${
                    index === activeDay - 1 ? "active" : "disabled"
                  }`}
                >
                  <p className="days-title">{item.title}</p>
                  <Image
                    src={item.image}
                    alt={`${item.title} reward`}
                    className="days-logo"
                  />
                  <h4 className="heading">{item.points}</h4>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="claim-button mt-3" onClick={handleClaim}>
              {claim ? "Come back tomorrow!" : "Claim"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};
