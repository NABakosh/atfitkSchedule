import "./scss/firstCourse.scss";
import schedule1 from "../schedule1.json";
import React, { useState, useEffect, Suspense, lazy } from "react";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
function FirstCourse() {
  const LazyTable = lazy(() => import("./Table"));
  const [chosenGroup, setChosenGroup] = useState(107);
  const schedule = schedule1[0];
  const date = new Date();
  const today = date.getDay();
  const [day, setDay] = useState(today);
  const [weekendDay, setWeekendDay] = useState("");
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const keys = Object.keys(schedule1);
  const handleInputChange = (e) => {
    setChosenGroup(e.target.value);
  };
  const handleChangeDay = (state) => {
    let newDay = state + day;
    if (newDay > 6) {
      newDay = 0;
    } else if (newDay < 0) {
      newDay = 6;
    }
    setDay(newDay);
    setWeekendDay(days[newDay]);
  };

  useEffect(() => {
    setWeekendDay(days[today]);
  }, []);
  return (
    <div className="firstCourse">
      <h2>Расписание студентов </h2>
      <main className="schedule">
        <div>
          <div className="groupBar">
            <h2>{chosenGroup}</h2>
            <input
              id="group-input"
              type="text"
              onChange={handleInputChange}
              value={chosenGroup}
            />
          </div>
          <div className="day">
            <button onClick={() => handleChangeDay(-1)}>
              <img src={left} width={25} />
            </button>
            <p>{weekendDay}</p>
            <button onClick={() => handleChangeDay(1)}>
              <img src={right} width={25} />
            </button>
          </div>
        </div>
        <Suspense fallback={<div>Загрузка...</div>}>
          <LazyTable group={chosenGroup} schedule={schedule} day={weekendDay} />
        </Suspense>
      </main>
    </div>
  );
}
export default FirstCourse;
