import { useEffect } from "react";

const groups = [
  100, 117, 109, 101, 105, 110, 103, 218, 214, 102, 120, 120, 108, 107, 116,
  106, 162, 317,
];
const errors = ["Суббота", "Воскресенье"];

export default function Table({ schedule, day, group }) {
  // 1. 🛑 ВСЕ ВЫЧИСЛЕНИЯ СТАВИМ ПЕРЕД УСЛОВНЫМ RETURN

  // Вычисляем текущую группу
  const currentGroup = schedule[group];

  // Проверяем, существует ли группа в списке (или можно проверить по ключам schedule)
  // Мы используем schedule[group], поэтому лучше проверить, найдена ли она.

  // Проверка на ошибку:
  const isWeekend = day === errors[0] || day === errors[1];
  const isGroupMissing = currentGroup === undefined;

  // NOTE: Ваша проверка schedule.length < 0 всегда ложна для массива/объекта.
  // Я ее оставил, но она не нужна, если schedule — объект.
  const isScheduleEmpty = schedule.length < 0;

  // Проверяем, что введенная группа есть в массиве groups (если group - число)
  const isGroupValid = groups.includes(Number(group));

  // 2. 🛑 УСЛОВНЫЙ RETURN
  if (isWeekend || isGroupMissing || isScheduleEmpty || !isGroupValid) {
    return null;
  }

  // 3. РЕНДЕРИНГ (только если все проверки прошли)
  return (
    <div className="table">
      {/* ... ваш JSX, который использует currentGroup */}
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
