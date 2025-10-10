import { useEffect, useState } from "react";
const groups = [
  100, 117, 109, 101, 105, 110, 103, 218, 214, 102, 120, 120, 108, 107, 116,
  106, 162, 317,
];
const errors = ["Суббота", "Воскресенье"];
export default function Table({ schedule, day, group }) {
  let error = false;
  useEffect(() => {
    for (let i = 0; i < groups.length; i++) {
      if (group != groups[i]) {
        error = true;
      }
    }
  }, []);
  const [currentGroup, setCurrentGroup] = useState(schedule[group]);
  console.log(currentGroup, 1);
  if (
    day === errors[0] ||
    day === errors[1] ||
    schedule.length < 0 ||
    error ||
    currentGroup === undefined
  ) {
    return null;
  }
  useEffect(() => {
    setCurrentGroup(schedule[group]);
  }, [group]);
  return (
    <div className="table">
      <div className="timeCode">
        {currentGroup["Время"].map((obj, i) => (
          <div key={i} className="time">
            {obj}
          </div>
        ))}
      </div>
      <div className="rows">
        {currentGroup[`${day}`].map((obj, i) => (
          <div className="row" key={i}>
            {obj}
          </div>
        ))}
      </div>
    </div>
  );
}
