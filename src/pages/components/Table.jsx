const errors = ["Суббота", "Воскресенье"];

export default function Table({ schedule, day, group }) {
  const keys = Object.keys(schedule);
  const groups = keys.map((obj) => {
    return Number(obj);
  });
  const currentGroup = schedule[group];
  console.log(currentGroup);

  const isWeekend = day === errors[0] || day === errors[1];
  const isGroupMissing = currentGroup === undefined;

  const isScheduleEmpty = schedule.length < 0;

  const isGroupValid = groups.includes(Number(group));
	
  if (isWeekend) {
    return (
      <div className="holiday">
        <h2>Выходной!</h2>
      </div>
    );
  }
  if (isWeekend || isGroupMissing || isScheduleEmpty || !isGroupValid) {
    return null;
  }
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
